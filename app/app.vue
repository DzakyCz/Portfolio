<!-- Ensures consistent rendering of core UI components -->
<template>
  <div :data-loading="isLoading" class="app-root">
    <SplashScreen />
    <!-- Main content is gated and hidden until the global loading state (isLoading) is false -->
    <div class="main-content-gate">
      <ParticlesBackground />
      <ClientOnly>
        <ToastContainer />
      </ClientOnly>
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </div>
  </div>
</template>

<script setup lang="ts">
// Main application component
// Global loading state managed by the useLoading composable
const { isLoading } = useLoading();
const colorMode = useColorMode();

// Force dark mode always — light mode is disabled
onMounted(() => {
  colorMode.preference = 'dark';
});
</script>


<style>
  /* The splash overlay below is opaque and covers the viewport, so the main
     content does not need to be hidden as well. Keeping it visible lets the
     browser lay out and paint the hero while the splash is still showing,
     instead of only after it leaves. */
  /* Ensure splash-overlay is always fixed and covers screen even before main CSS */
  .splash-overlay { 
    position: fixed !important; 
    inset: 0 !important; 
    z-index: 99999 !important; 
    background: #000000 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
  }
</style>

<style scoped>
.app-root {
  min-height: 100vh;
}
</style>
