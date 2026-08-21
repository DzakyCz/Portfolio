<template>
  <div class="visitor-counter group flex items-center justify-center py-1.5 px-3.5 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md transition-all duration-500 hover:border-accent/30 hover:bg-white/[0.05] shadow-sm">
    <div class="flex items-center gap-2">
      <!-- Icon with pulse animation -->
      <div class="relative flex items-center justify-center">
        <Icon name="mdi:account-group-outline" class="w-4 h-4 text-gray-500 group-hover:text-accent transition-colors duration-300" />
        <div class="absolute inset-0 w-full h-full rounded-full bg-accent/20 animate-ping opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
      
      <!-- Label and Count in one line -->
      <div class="flex items-center gap-1.5 leading-none">
        <span class="text-[9px] font-bold uppercase tracking-wider text-gray-500 group-hover:text-gray-400 transition-colors">
          Total Visitors
        </span>
        <span class="text-[11px] font-mono font-bold text-gray-400 group-hover:text-white transition-colors">
          {{ formattedCount }}
        </span>
        <div class="w-1 h-1 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.6)] animate-pulse" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { visitorCount } = usePortfolioData();
const config = useRuntimeConfig();

const formattedCount = computed(() => {
  return visitorCount.value.toLocaleString();
});

onMounted(async () => {
  // Simple session-based check to avoid multiple increments in one sitting
  if (!sessionStorage.getItem('visitor_counted')) {
    try {
      const API_BASE = config.public.apiBase;
      const res = await $fetch<any>(`${API_BASE}/settings/increment-visitor`, {
        method: 'POST'
      });
      if (res && res.visitorCount !== undefined) {
        visitorCount.value = res.visitorCount;
        sessionStorage.setItem('visitor_counted', 'true');
      }
    } catch (error) {
      console.error('Failed to increment visitor count:', error);
    }
  }
});
</script>

<style scoped>
.visitor-counter {
  max-width: max-content;
}

/* Subtle fade in */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

.visitor-counter {
  animation: fadeIn 0.8s ease-out forwards;
}
</style>
