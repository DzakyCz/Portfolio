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
    // Curated font families for a premium look & feel.
    // Caveat was dropped — it had no usage anywhere in the app.
    families: {
      Inter: [300, 400, 500, 600, 700],
      Manrope: [400, 500, 600, 700, 800],
      'JetBrains Mono': [400, 500],
    },
    display: 'swap',
    // Only latin ranges are needed; the default pulls cyrillic/greek/vietnamese
    // too, which added ~70 unused @font-face blocks to the render-blocking CSS.
    subsets: ['latin', 'latin-ext'],
    // Self-host the files, but keep them OUT of the CSS. Base64-embedding fonts
    // inflates the render-blocking stylesheet; separate files load in parallel
    // and are cached independently.
    download: true,
    base64: false,
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
