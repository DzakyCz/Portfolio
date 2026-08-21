<template>
  <div v-if="settings?.announcementActive && settings?.announcementText" 
       class="w-full py-2.5 overflow-hidden flex items-center shadow-lg relative z-[100] banner-container"
       :style="{ 
         backgroundColor: settings.bannerColor || '#4f46e5', 
         color: settings.textColor || '#ffffff', 
         '--speed': (settings.animationSpeed || 25) + 's' 
       }">
    <!-- 
      The marquee-track contains two identical content blocks.
      This is a common trick to create a seamless infinite scrolling effect.
      When the first block finishes, the second one is right behind it.
    -->
    <div class="marquee-track">
      <!-- Primary content block -->
      <div class="marquee-content font-medium text-sm tracking-wide">
        <span class="mx-8" v-html="settings.announcementText"></span>
        <span class="mx-8" v-html="settings.announcementText"></span>
        <span class="mx-8" v-html="settings.announcementText"></span>
        <span class="mx-8" v-html="settings.announcementText"></span>
      </div>
      <!-- Duplicate content block for seamless looping (hidden from screen readers) -->
      <div class="marquee-content font-medium text-sm tracking-wide" aria-hidden="true">
        <span class="mx-8" v-html="settings.announcementText"></span>
        <span class="mx-8" v-html="settings.announcementText"></span>
        <span class="mx-8" v-html="settings.announcementText"></span>
        <span class="mx-8" v-html="settings.announcementText"></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// Banner component for displaying scrolling announcements and notifications
// It fetches its configuration (text, color, active status) from a custom composable
// Fetch settings from the central announcement composable on component mount
const { settings, fetchSettings } = useAnnouncement();

onMounted(() => {
  // Load settings when the component is added to the page
  fetchSettings();
});
</script>

<style scoped>
.banner-container {
  min-height: 40px;
  display: flex;
  align-items: center;
  white-space: nowrap;
  transition: all 0.3s ease;
}

.marquee-track {
  display: flex;
  width: max-content;
  animation: marquee var(--speed, 25s) linear infinite;
}

.marquee-content {
  display: flex;
  flex-shrink: 0;
}

/* The marquee animation shifts the track horizontally. 
   Starting at -50% (halfway) and moving to 0% creates the illusion of infinite flow 
   when combined with the duplicated content blocks. */
@keyframes marquee {
  0% { transform: translateX(-50%); }
  100% { transform: translateX(0); }
}
</style>
