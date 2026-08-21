<!-- 
  default.vue
  The primary layout for the application, providing a consistent structure
  with an announcement banner, navbar, main content slot, and footer.
-->
<template>
  <div class="min-h-screen flex flex-col bg-[#080B14]">
    <AnnouncementBanner />
    <Navbar />
    <main class="flex-1">
      <slot />
    </main>
    <Footer />
  </div>
</template>
