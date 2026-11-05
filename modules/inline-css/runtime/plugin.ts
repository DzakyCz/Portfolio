/**
 * Replaces render-blocking <link rel="stylesheet" href="/_nuxt/*.css"> tags in
 * the SSR'd <head> with the stylesheet's contents inside a <style> tag.
 *
 * Relative url() references inside the CSS (font files, background images) are
 * rewritten to absolute paths first. A stylesheet at /_nuxt/entry.css resolves
 * `url(./font.woff2)` against /_nuxt/, but once the CSS is inlined in a document
 * served from /, the same reference would resolve against / and 404.
 *
 * If a stylesheet cannot be read the original <link> is left untouched, so the
 * worst case is simply the previous behaviour.
 */
export default defineNitroPlugin((nitroApp) => {
  const LINK = /<link\b[^>]*\brel="stylesheet"[^>]*>/gi;
  const HREF = /\bhref="([^"]+\.css)"/i;
  const URL_REF = /url\(\s*(['"]?)([^'")]+)\1\s*\)/gi;

  const cache = new Map<string, string | null>();

  /** Resolve a CSS-relative reference against the stylesheet's own directory. */
  const absolutize = (ref: string, baseDir: string): string => {
    // Leave absolute paths, protocols (data:, http:) and fragment references
    // alone. %23 is an encoded #, used by inline SVG gradient refs — rewriting
    // those would break the gradients.
    if (
      ref.startsWith('/') ||
      ref.startsWith('#') ||
      ref.startsWith('%23') ||
      /^[a-z][a-z0-9+.-]*:/i.test(ref)
    ) {
      return ref;
    }
    const segments = baseDir.split('/').filter(Boolean);
    for (const part of ref.split('/')) {
      if (part === '.' || part === '') continue;
      if (part === '..') segments.pop();
      else segments.push(part);
    }
    return '/' + segments.join('/');
  };

  nitroApp.hooks.hook('render:html', async (html) => {
    const storage = useStorage('assets:inlinecss');

    const inlineOne = async (href: string): Promise<string | null> => {
      if (cache.has(href)) return cache.get(href)!;

      const key = href.split('/').pop();
      const baseDir = href.slice(0, href.lastIndexOf('/') + 1); // "/_nuxt/"
      let css: string | null = null;
      try {
        if (key && (await storage.hasItem(key))) {
          const raw = await storage.getItem(key);
          css = typeof raw === 'string' ? raw : raw ? String(raw) : null;
        }
      } catch {
        css = null;
      }

      if (css) {
        css = css.replace(URL_REF, (match, quote: string, ref: string) => {
          const resolved = absolutize(ref.trim(), baseDir);
          return resolved === ref ? match : `url(${quote}${resolved}${quote})`;
        });
      }

      cache.set(href, css);
      return css;
    };

    for (let i = 0; i < html.head.length; i++) {
      const chunk = html.head[i];
      if (!chunk || !chunk.includes('rel="stylesheet"')) continue;

      const tags = chunk.match(LINK);
      if (!tags) continue;

      let next = chunk;
      for (const tag of tags) {
        const href = tag.match(HREF)?.[1];
        if (!href || !href.endsWith('.css')) continue;
        const css = await inlineOne(href);
        if (!css) continue; // leave the <link> in place
        next = next.replace(tag, `<style>${css}</style>`);
      }
      html.head[i] = next;
    }
  });
});
