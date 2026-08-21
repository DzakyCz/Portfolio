<template>
  <div class="fixed top-20 right-4 sm:top-24 sm:right-6 z-[9999] flex flex-col gap-3 w-full max-w-[340px] pointer-events-none">
    <TransitionGroup 
      name="toast-list"
      tag="div"
      class="flex flex-col gap-3"
    >
      <div
        v-for="toast in toasts"
        :key="toast.id"
        class="pointer-events-auto cursor-pointer group relative overflow-hidden rounded-xl border border-white/[0.08] bg-[#020617]/95 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] p-4 transition-all duration-300 hover:border-white/20 active:scale-[0.98]"
        @click="removeToast(toast.id)"
      >
        <!-- Progress Bar (Success/Error/Info) - Depleting -->
        <div 
          v-if="toast.type !== 'loading'"
          class="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r transition-all duration-linear"
          :class="{
            'from-emerald-500/80 to-teal-400/80': toast.type === 'success',
            'from-red-500/80 to-orange-400/80': toast.type === 'error',
            'from-blue-500/80 to-indigo-400/80': toast.type === 'info'
          }"
          :style="{ width: '100%', animation: `shrink ${toast.duration || 4000}ms linear forwards` }"
        ></div>

        <div class="flex items-start gap-3.5">
          <!-- Icon Section -->
          <div class="shrink-0 mt-0.5">
            <div 
              class="w-9 h-9 rounded-lg flex items-center justify-center transition-transform duration-500 group-hover:rotate-12 group-hover:scale-110 shadow-inner"
              :class="{
                'bg-emerald-500/15 text-emerald-400 shadow-emerald-500/10': toast.type === 'success',
                'bg-red-500/15 text-red-400 shadow-red-500/10': toast.type === 'error',
                'bg-blue-500/15 text-blue-400 shadow-blue-500/10': toast.type === 'info',
                'bg-white/5 text-gray-400': toast.type === 'loading'
              }"
            >
              <Icon 
                v-if="toast.type === 'success'" 
                name="mdi:check-circle" 
                class="w-5 h-5 drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]" 
              />
              <Icon 
                v-else-if="toast.type === 'error'" 
                name="mdi:alert-circle" 
                class="w-5 h-5 drop-shadow-[0_0_8px_rgba(248,113,113,0.5)]" 
              />
              <Icon 
                v-else-if="toast.type === 'info'" 
                name="mdi:information" 
                class="w-5 h-5 drop-shadow-[0_0_8px_rgba(96,165,250,0.5)]" 
              />
              <Icon 
                v-else 
                name="mdi:loading" 
                class="w-5 h-5 animate-spin" 
              />
            </div>
          </div>

          <!-- Content Section -->
          <div class="flex-1 min-w-0 pr-4">
            <h3 class="text-[14px] font-bold text-white tracking-tight leading-tight">
              {{ toast.title }}
            </h3>
            <p class="text-[12.5px] text-gray-400 leading-relaxed mt-1 line-clamp-2">
              {{ toast.message }}
            </p>
          </div>

          <!-- Close Button -->
          <button 
            class="absolute top-3 right-3 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-white/10 rounded-lg"
            @click.stop="removeToast(toast.id)"
          >
            <Icon name="mdi:close" class="w-3.5 h-3.5 text-gray-500" />
          </button>
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
const { toasts, removeToast } = useToast();
</script>

<style scoped>
.toast-list-enter-active {
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
.toast-list-leave-active {
  transition: all 0.3s cubic-bezier(0.55, 0.085, 0.68, 0.53);
  position: absolute;
}

.toast-list-enter-from {
  opacity: 0;
  transform: translateX(40px) scale(0.9);
}
.toast-list-leave-to {
  opacity: 0;
  transform: translateX(20px) scale(0.95);
}

.toast-list-move {
  transition: transform 0.4s ease;
}

@keyframes shrink {
  from { width: 100%; }
  to { width: 0%; }
}
</style>
