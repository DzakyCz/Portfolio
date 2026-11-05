import Lenis from 'lenis';

export default defineNuxtPlugin((nuxtApp) => {
  // Touch devices already have excellent native scrolling that runs on the
  // compositor thread. Replacing it with JS-driven scrolling is the main reason
  // a page feels heavy on a phone, so smooth scroll is desktop-only here.
  const coarsePointer = window.matchMedia('(pointer: coarse)').matches;
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (coarsePointer || reducedMotion) {
    // Consumers (modals) already guard with `if (lenis)`.
    nuxtApp.provide('lenis', null);
    return;
  }

  const lenis = new Lenis({
    // `duration` and `lerp` are alternative easing modes and Lenis uses `lerp`
    // for user-driven scrolling, so the `duration` that used to be set here had
    // no effect. Only `lerp` is specified now.
    lerp: 0.4,
    // Was 0.8, which moved LESS than a native wheel notch and made scrolling
    // feel sluggish by design. 1 keeps the smoothing without the drag.
    wheelMultiplier: 1,
    infinite: false,
  });

  let rafId = 0;
  function raf(time: number) {
    lenis.raf(time);
    rafId = requestAnimationFrame(raf);
  }
  rafId = requestAnimationFrame(raf);

  // Stop driving the loop when the tab is in the background.
  const onVisibility = () => {
    cancelAnimationFrame(rafId);
    if (!document.hidden) rafId = requestAnimationFrame(raf);
  };
  document.addEventListener('visibilitychange', onVisibility);

  nuxtApp.hook('app:unmounted', () => {
    cancelAnimationFrame(rafId);
    document.removeEventListener('visibilitychange', onVisibility);
    lenis.destroy();
  });

  // Provide to app context if needed elsewhere (e.g., to pause on modals)
  nuxtApp.provide('lenis', lenis);
});
