<template>
  <button
    v-bind="$attrs"
    class="group relative w-auto cursor-pointer overflow-hidden rounded-full border transition-all duration-300 p-2 px-6 text-center font-semibold z-10"
    :class="[
      variant === 'outline' 
        ? 'border-slate-200 dark:border-slate-800 bg-transparent text-slate-600 dark:text-slate-300' 
        : 'border-slate-200/20 dark:border-slate-800/10 bg-slate-900 dark:bg-slate-900/90 text-white shadow-xl'
    ]"
  >
    <!-- Normal State -->
    <div
      class="flex items-center justify-center gap-2 transition-all duration-300 group-hover:translate-x-32 group-hover:opacity-0"
    >
      <slot />
    </div>

    <!-- Hover State Content -->
    <div
      class="absolute inset-0 z-10 flex -translate-x-32 items-center justify-center gap-2 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 text-white"
    >
      <span class="text-white text-sm">
        {{ hoverText }}
      </span>
      <Icon v-if="hoverIcon" :name="hoverIcon" class="w-4 h-4" />
    </div>

    <!-- Background Expansion Circle: Animates from a small point to fill the entire button on hover -->
    <div
      class="absolute left-[15%] top-[40%] h-2 w-2 scale-0 opacity-0 rounded-full bg-accent transition-all duration-300 group-hover:left-0 group-hover:top-0 group-hover:h-full group-hover:w-full group-hover:scale-[1.8] group-hover:opacity-100 group-hover:bg-accent -z-10"
    />
  </button>
</template>

<script setup lang="ts">
// A button component with interactive hover effects and background expansion
interface Props {
  hoverText?: string;
  hoverIcon?: string;
  variant?: 'filled' | 'outline';
}

withDefaults(defineProps<Props>(), {
  hoverText: 'Click Here',
  hoverIcon: '',
  variant: 'filled'
});
</script>

<style scoped>
button {
  min-width: 170px;
  height: 42px;
}
</style>
