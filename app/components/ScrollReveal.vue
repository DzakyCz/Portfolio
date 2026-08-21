<template>
  <div v-motion :initial="initialState" :visible-once="visibleState">
    <slot />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = withDefaults(
  defineProps<{
    animation?: "fade-up" | "fade-in" | "fade-left" | "fade-right" | "scale";
    delay?: number;
    duration?: number;
  }>(),
  {
    animation: "fade-up",
    delay: 0,
    duration: 600,
  },
);

const initialState = computed(() => {
  switch (props.animation) {
    case 'fade-up': return { opacity: 0, y: 40 };
    case 'fade-in': return { opacity: 0 };
    case 'fade-left': return { opacity: 0, x: -40 };
    case 'fade-right': return { opacity: 0, x: 40 };
    case 'scale': return { opacity: 0, scale: 0.85 };
    default: return { opacity: 0, y: 40 };
  }
});

const visibleState = computed(() => {
  return {
    opacity: 1,
    y: 0,
    x: 0,
    scale: 1,
    transition: {
      type: 'spring',
      stiffness: 260,
      damping: 25,
      mass: 0.5,
      delay: props.delay,
    }
  };
});
</script>
