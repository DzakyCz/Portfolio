import Lenis from 'lenis';

export default defineNuxtPlugin((nuxtApp) => {
  const lenis = new Lenis({
    duration: 1.1,
    lerp: 0.4,
    wheelMultiplier: 0.8,
    touchMultiplier: 1.9,
    infinite: false,
  });


  function raf(time: number) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Provide to app context if needed elsewhere (e.g., to pause on modals)
  nuxtApp.provide('lenis', lenis);
});
