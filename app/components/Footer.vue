<template>
  <footer class="border-t border-dark-border/50 bg-dark-card/30 mt-auto">
    <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-6 items-center">
        
        <!-- LEFT: Location & Time -->
        <div class="flex flex-col items-center md:items-start text-center md:text-left gap-1 order-2 md:order-1">
          <div class="flex items-center gap-1.5 text-[11px] text-gray-400 dark:text-gray-500 font-medium tracking-wide">
            Banda Aceh, Indonesia
          </div>
          <div class="flex items-center gap-1.5 text-[11px] text-gray-400 dark:text-gray-500 font-mono tracking-wide">
            UTC+7 - {{ currentTime }}
          </div>
        </div>

        <!-- CENTER: Social Icons -->
        <div class="flex justify-center items-center order-1 md:order-2">
          <div class="flex items-center gap-4">
            <a
              v-for="social in socials"
              :key="social.label"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="w-10 h-10 flex items-center justify-center rounded-full bg-gray-100 dark:bg-white/5 border border-transparent dark:border-white/10 text-gray-500 dark:text-gray-400 hover:bg-white dark:hover:bg-white/10 hover:text-accent hover:border-accent/30 dark:hover:border-accent/40 transition-all duration-300 shadow-sm"
              :aria-label="social.label"
            >
              <Icon :name="social.icon" class="w-5 h-5" />
            </a>
          </div>
        </div>

        <!-- RIGHT: Tech Stack & Copyright -->
        <div class="flex flex-col items-center md:items-end text-center md:text-right gap-1.5 order-3">
          <p class="text-[11px] text-gray-400 dark:text-gray-500 font-medium max-w-[280px]">
            Built with Nuxt 3, Tailwind CSS, Shadcn UI, NestJS
          </p>
          <p class="text-[11px] text-gray-400 dark:text-gray-600">
            &copy; 2026 Dzaky Dhiya Ul-Haq
          </p>
        </div>

      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
// Footer component containing social links, tech stack info, and a real-time clock
import { ref, onMounted, onUnmounted } from 'vue';

// Social media links displayed in the footer center section
const socials = [
  { label: "GitHub", icon: "mdi:github", url: "https://github.com/DzakyCz" },
  { label: "LinkedIn", icon: "mdi:linkedin", url: "https://www.linkedin.com/in/dzaky-ul-haq/" },
  {
    label: "Email",
    icon: "mdi:email-outline",
    url: "mailto:dzakydhiyaulhaq88@gmail.com",
  },
];

const currentTime = ref('00:00:00');
let timer: ReturnType<typeof setInterval>;

/**
 * Updates the clock every second using the Asia/Jakarta timezone.
 * This ensures the portfolio displays the creator's local time (UTC+7) accurately.
 */
const updateClock = () => {
  try {
    const d = new Date();
    // Use Asia/Jakarta explicitly to always show UTC+7
    const options: Intl.DateTimeFormatOptions = { 
      timeZone: 'Asia/Jakarta',
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit',
      hour12: false 
    };
    currentTime.value = new Intl.DateTimeFormat('en-GB', options).format(d);
  } catch (e) {
    // Fallback if formatting fails
    const d = new Date();
    const localTime = new Date(d.getTime() + (d.getTimezoneOffset() * 60000) + (7 * 3600000));
    const hh = String(localTime.getHours()).padStart(2, '0');
    const mm = String(localTime.getMinutes()).padStart(2, '0');
    const ss = String(localTime.getSeconds()).padStart(2, '0');
    currentTime.value = `${hh}:${mm}:${ss}`;
  }
};

onMounted(() => {
  updateClock();
  timer = setInterval(updateClock, 1000);
});

onUnmounted(() => {
  if (timer) clearInterval(timer);
});
</script>
