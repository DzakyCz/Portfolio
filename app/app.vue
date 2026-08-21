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
  /* Critical CSS to prevent FOUC and layout shifts on refresh */
  [data-loading="true"] .main-content-gate { 
    opacity: 0 !important; 
    visibility: hidden !important; 
  }
  .main-content-gate {
    transition: opacity 0.3s ease;
  }
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
