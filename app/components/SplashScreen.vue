<template>
  <Transition leave-active-class="splash-leave" leave-to-class="splash-leave-to">
    <div v-if="isLoading" class="splash-overlay" aria-live="polite" aria-label="Loading">
      <!-- Lottie exactly in the center -->
      <div ref="lottieContainer" class="lottie-wrap" />

      <!-- Loading Message pinned to the bottom -->
      <p class="loading-message text-gray-400 tracking-widest">
        {{ currentMessage }}
      </p>
    </div>
  </Transition>
</template>

<script setup lang="ts">
// Initial splash screen component
import { ref, onMounted, onUnmounted, watch } from 'vue';
import { useLoading } from '~/composables/useLoading';
import { usePortfolioData } from '~/composables/usePortfolioData';

const { isLoading, finishLoading } = useLoading();
// Fetch data from the central portfolio composable on component mount
const { fetchAll, isDataReady }    = usePortfolioData();
const lottieContainer = ref<HTMLElement | null>(null);

const messages = [
  "Initializing system...",
  "Powering up modules...",
  "Fetching portfolio data...",
  "Synchronizing assets...",
  "Loading premium experience...",
  "Almost there...",
  "Finalizing things..."
];
const currentMessage = ref(messages[0]);
let messageInterval: any = null;

/**
 * Cycles through the loading messages to keep the user engaged.
 * It changes the message every 1.2 seconds.
 */
const startMessageCycle = () => {
  let index = 0;
  messageInterval = setInterval(() => {
    if (index < messages.length - 1) {
      index++;
      currentMessage.value = messages[index];
    }
  }, 1200);
};

/**
 * Cleans up and hides the splash screen.
 * Triggers the finishLoading action from the global loading store.
 */
const finish = () => {
  if (messageInterval) clearInterval(messageInterval);
  currentMessage.value = "Welcome!";
  // Slight delay before hiding to show the "Welcome!" message
  setTimeout(() => finishLoading(), 400);
};

onMounted(async () => {
  startMessageCycle();
  
  // Load the Lottie animation dynamically to reduce initial bundle size
  if (lottieContainer.value) {
    const lottie = (await import('lottie-web')).default;
    lottie.loadAnimation({
      container : lottieContainer.value,
      renderer  : 'svg',
      loop      : true,
      autoplay  : true,
      path      : '/lottie/mana-loading.json',
    });
  }

  // Fetch all portfolio data (projects, experiences, etc.)
  const dataPromise    = fetchAll();
  
  // Set a maximum timeout (6 seconds) to ensure the splash screen doesn't get stuck forever
  const timeoutPromise = new Promise<void>(res => setTimeout(res, 6000));
  
  // Race the data fetch against the timeout
  await Promise.race([dataPromise, timeoutPromise]);
  
  // Proceed to finish the loading sequence
  finish();
});

watch(isDataReady, (ready) => { if (ready) finish(); });
onUnmounted(() => {
  if (messageInterval) clearInterval(messageInterval);
});
</script>

<style scoped>
.splash-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #000000; /* sama dengan dark:bg-black di halaman utama */
}

.splash-leave    { transition: opacity 0.5s ease; }
.splash-leave-to { opacity: 0; }

.lottie-wrap {
  width: 300px;
  height: 300px;
  filter: invert(56%) sepia(30%) saturate(1200%) hue-rotate(210deg) brightness(105%);
}

.loading-message {
  position: absolute;
  bottom: 2.5rem;
  font-size: 0.75rem;
  font-family: 'Inter', sans-serif;
  font-weight: 400;
  text-align: center;
}
</style>
