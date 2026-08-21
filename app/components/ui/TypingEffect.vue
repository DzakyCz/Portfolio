<template>
  <span class="typing-container">
    {{ displayText }}<span v-if="showCursor" class="cursor">|</span>
  </span>
</template>

<script setup lang="ts">
// Component to create a typing animation effect for text strings
import { ref, onMounted, watch } from 'vue';

const props = defineProps<{
  text: string;
  speed?: number;
  delay?: number;
  loop?: boolean;
}>();

const displayText = ref('');
const showCursor = ref(true);
let currentIndex = 0;

const type = () => {
  if (currentIndex < props.text.length) {
    displayText.value += props.text[currentIndex];
    currentIndex++;
    setTimeout(type, props.speed || 50);
  } else if (props.loop) {
    setTimeout(reset, 2000);
  }
};

const reset = () => {
  displayText.value = '';
  currentIndex = 0;
  type();
};

onMounted(() => {
  setTimeout(type, props.delay || 0);
  
  // Blink cursor
  setInterval(() => {
    showCursor.value = !showCursor.value;
  }, 500);
});

// Watch for text changes
watch(() => props.text, () => {
  reset();
});
</script>

<style scoped>
.typing-container {
  display: inline-block;
  min-height: 1.2em;
}
.cursor {
  font-weight: 100;
  color: var(--color-accent, #6366f1);
  margin-left: 2px;
  animation: none; /* Handled by JS for more control if needed, but CSS is fine too */
}
</style>
