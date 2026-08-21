<template>
  <ClientOnly>
    <button
      @click="toggleTheme"
      class="text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white transition-colors duration-200 focus:outline-none relative flex items-center justify-center overflow-hidden"
      :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
        class="transition-transform duration-500 ease-in-out"
        :class="isDark ? 'rotate-90 text-indigo-400' : 'rotate-0 text-amber-500'"
      >
        <mask id="theme-mask">
          <rect x="0" y="0" width="100%" height="100%" fill="white" />
          <circle
            cx="12"
            cy="4"
            r="9"
            fill="black"
            class="transition-transform duration-500 ease-in-out origin-center"
            :class="isDark ? 'translate-x-0 translate-y-0' : 'translate-x-[12px] -translate-y-[2px]'"
          />
        </mask>
        <circle
          cx="12"
          cy="12"
          fill="currentColor"
          mask="url(#theme-mask)"
          class="transition-all duration-500 ease-in-out origin-center"
          :r="isDark ? '9' : '5'"
        />
        <g
          stroke="currentColor"
          class="transition-all duration-500 ease-in-out origin-center"
          :class="isDark ? 'opacity-0 scale-50' : 'opacity-100 scale-100'"
        >
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </g>
      </svg>
    </button>
    <template #fallback>
      <div class="w-9 h-9" />
    </template>
  </ClientOnly>
</template>

<script setup lang="ts">
// Component for toggling between light and dark themes with smooth SVG animations.
// Includes proper aria-labels for accessibility.
const colorMode = useColorMode();
const isDark = computed(() => colorMode.value === 'dark');

const toggleTheme = () => {
  colorMode.preference = isDark.value ? 'light' : 'dark';
};
</script>
