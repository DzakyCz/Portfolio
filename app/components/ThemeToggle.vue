<template>
  <button
    @click="toggleTheme"
    class="p-2 rounded-lg text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-lighter transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent/50"
    :aria-label="`Switch to ${isDark ? 'light' : 'dark'} mode`"
  >
    <Icon 
      v-if="isDark" 
      name="mdi:white-balance-sun" 
      class="w-5 h-5 text-amber-300" 
    />
    <Icon 
      v-else 
      name="mdi:moon-waning-crescent" 
      class="w-5 h-5 text-indigo-600" 
    />
  </button>
</template>

<script setup lang="ts">
const colorMode = useColorMode();

const isDark = computed(() => colorMode.value === 'dark');

const toggleTheme = () => {
  // Toggle between 'light' and 'dark' preferences; @nuxtjs/color-mode handles the rest.
  colorMode.preference = isDark.value ? 'light' : 'dark';
};
</script>
