// Nuxt configuration file
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // Defined compatibility date for Nuxt 3 core engine
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  
  // Configuration for runtime variables, with fallback to localhost
  runtimeConfig: {
    public: {
      apiBase: process.env.NUXT_PUBLIC_API_BASE || 'http://localhost:3001'
    }
  },

  // List of Nuxt modules to enhance the application with styling, fonts, icons, and animations
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxt/icon',
    '@vueuse/motion/nuxt',
    '@nuxtjs/color-mode'
  ],

  // Dark mode configuration using @nuxtjs/color-mode
  colorMode: {
    classSuffix: '',
    preference: 'dark',
    fallback: 'dark',
    storageKey: 'color-mode',
  },


  googleFonts: {
    // Curated font families for a premium look & feel
    families: {
      Inter: [300, 400, 500, 600, 700],
      Manrope: [400, 500, 600, 700, 800],
      'JetBrains Mono': [400, 500],
      Caveat: [400, 500, 600, 700],
    },
    display: 'swap',
  },

  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: "Adith | Personal Portfolio Website",
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'Official Portfolio of Muhammad Aditya Yufnanda — Software Developer & Machine Learning Engineer specializing in AI, Mobile Apps, and IoT Systems.',
        },
        { name: 'author', content: 'Muhammad Aditya Yufnanda' },
        { property: 'og:title', content: 'Adith | Personal Portfolio Website' },
        {
          property: 'og:description',
          content:
            'Building intelligent systems with AI, Mobile, and IoT technologies.',
        },
        { property: 'og:type', content: 'website' },
      ],
      // Custom circular photo favicon
      link: [{ rel: 'icon', type: 'image/png', href: '/fav-icon-pic.png' }],
    },
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  css: ['~/assets/css/main.css'],
})
