<template>
  <div class="min-h-screen bg-[#0f172a] text-white flex flex-col">
    <!-- Header -->
    <header class="h-16 border-b border-white/5 bg-[#1e293b]/50 backdrop-blur-md flex items-center justify-between px-4 sm:px-8 sticky top-0 z-50">
      <div class="flex items-center gap-4">
        <NuxtLink to="/" class="p-2 hover:bg-white/5 rounded-full transition-colors group">
          <Icon name="mdi:arrow-left" class="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
        </NuxtLink>
        <div>
          <h1 class="text-sm font-semibold tracking-wide uppercase text-gray-400">Curriculum Vitae</h1>
          <p class="text-xs text-gray-500 truncate max-w-[150px] sm:max-w-xs">{{ fileName }}</p>
        </div>
      </div>

      <div class="flex items-center gap-3">
        <a v-if="cvFullUrl" 
           :href="cvFullUrl" 
           download
           class="flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-lg active:scale-95">
          <Icon name="mdi:download" class="w-4 h-4" />
          <span class="hidden sm:inline">Download</span>
        </a>
      </div>
    </header>

    <!-- Content -->
    <main class="flex-1 relative bg-slate-900 overflow-hidden flex items-center justify-center">
      <div v-if="isLoading" class="flex flex-col items-center gap-4">
        <Icon name="mdi:loading" class="w-12 h-12 text-indigo-500 animate-spin" />
        <p class="text-sm text-gray-400">Loading document preview...</p>
      </div>

      <div v-else-if="error" class="max-w-md w-full p-8 text-center">
        <div class="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
          <Icon name="mdi:file-alert-outline" class="w-10 h-10 text-red-400" />
        </div>
        <h2 class="text-xl font-bold mb-2">Oops! Preview Unavailable</h2>
        <p class="text-gray-400 mb-8 text-sm">
          We couldn't find the requested CV file. Please ensure you have uploaded it in the admin panel.
        </p>
        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <NuxtLink to="/admin" class="inline-flex items-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-6 py-2.5 rounded-xl text-sm font-medium transition-colors">
            <Icon name="mdi:shield-account-outline" class="w-4 h-4" />
            Go to Admin Panel
          </NuxtLink>
          <NuxtLink to="/" class="inline-flex items-center gap-2 text-gray-400 hover:text-white font-medium text-sm">
            <Icon name="mdi:arrow-left" class="w-4 h-4" />
            Back to Home
          </NuxtLink>
        </div>
      </div>

      <template v-else>
        <!-- 
          The CV is displayed using an iframe pointing to the PDF URL.
          This relies on the browser's built-in PDF viewer. 
        -->
        <iframe 
          v-if="cvFullUrl"
          :src="cvFullUrl" 
          class="w-full h-full border-none bg-white"
          title="CV Preview"
        />
      </template>
    </main>

    <!-- Footer / Hint -->
    <footer class="p-3 bg-[#0f172a] border-t border-white/5 text-center">
      <p class="text-[10px] text-gray-500 tracking-wider uppercase">
        <Icon name="mdi:information-outline" class="w-3 h-3 mr-1 inline" />
        Use your browser's native controls for zooming or printing.
      </p>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';

const config = useRuntimeConfig();
const API_BASE = config.public.apiBase;

const cvFullUrl = ref("");
const isLoading = ref(true);
const error = ref(false);

const fileName = computed(() => {
  if (!cvFullUrl.value) return "CV.pdf";
  return cvFullUrl.value.split('/').pop() || "CV.pdf";
});

onMounted(async () => {
  try {
    // Attempt to fetch the CV URL from the backend settings
    const settings = await $fetch<any>(`${API_BASE}/settings`);
    if (settings.cvUrl) {
      // Construct the full URL for the CV file
      cvFullUrl.value = `${API_BASE}${settings.cvUrl}`;
    } else {
      // Fallback: Use a local public file if no URL is set in the backend
      cvFullUrl.value = "/cv.pdf";
      
      // Perform a HEAD request to check if the fallback file actually exists
      try {
        await $fetch("/cv.pdf", { method: 'HEAD' });
      } catch (e) {
        // If neither backend nor local fallback exists, trigger the error UI
        error.value = true;
      }
    }
  } catch (err) {
    console.error('Failed to load CV for preview:', err);
    // If API fetch fails, show the error state
    error.value = true;
  } finally {
    // End the loading state regardless of outcome
    isLoading.value = false;
  }
});

// Configure layout
definePageMeta({
  layout: false // Custom full-page layout
});

useHead({
  title: "Dika | Personal Portfolio Website - CV",
});
</script>

<style scoped>
/* Ensure the page takes full height */
:global(html, body, #__nuxt) {
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
