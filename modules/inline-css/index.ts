/**
 * inline-css
 *
 * Nuxt already inlines component-level styles into the SSR HTML, but the global
 * entry stylesheet (Tailwind + main.css) and any CSS chunk shared between routes
 * are still emitted as <link rel="stylesheet"> tags in <head>. Those are
 * render-blocking: the browser cannot paint until each one is fetched, which
 * PageSpeed Insights reports as "render blocking requests".
 *
 * This module copies the built CSS into a Nitro *server asset* (so the bytes are
 * baked into the server bundle and are available on serverless hosts such as
 * Vercel, where the static output is served by the CDN and is NOT readable from
 * the function's filesystem). A Nitro plugin then swaps each <link> for an
 * inline <style> at render time.
 */
import { defineNuxtModule, addServerPlugin, createResolver } from '@nuxt/kit';
import { existsSync } from 'node:fs';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { join } from 'node:path';

export default defineNuxtModule({
  meta: { name: 'inline-css', configKey: 'inlineCss' },

  async setup(_options, nuxt) {
    // Dev serves CSS over HMR; inlining there would break style updates.
    if (nuxt.options.dev) return;

    const resolver = createResolver(import.meta.url);
    const stageDir = join(nuxt.options.buildDir, 'inline-css-assets');
    await mkdir(stageDir, { recursive: true });

    nuxt.hook('nitro:config', (nitro) => {
      nitro.serverAssets = nitro.serverAssets || [];
      nitro.serverAssets.push({ baseName: 'inlinecss', dir: stageDir });
    });

    // Copy the compiled client CSS into the staging dir before Nitro bundles it.
    const stage = async () => {
      // buildDir is wiped during the build, so re-create the staging dir each time.
      await mkdir(stageDir, { recursive: true });
      const clientDir = join(nuxt.options.buildDir, 'dist/client/_nuxt');
      if (!existsSync(clientDir)) return;
      const files = (await readdir(clientDir)).filter((f) => f.endsWith('.css'));
      for (const f of files) {
        await writeFile(join(stageDir, f), await readFile(join(clientDir, f)));
      }
      console.log(`[inline-css] staged ${files.length} stylesheet(s) for inlining`);
    };

    nuxt.hook('build:done', stage);
    nuxt.hook('nitro:build:before', stage);

    addServerPlugin(resolver.resolve('./runtime/plugin'));
  },
});
