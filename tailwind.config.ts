// Tailwind CSS configuration
import type { Config } from 'tailwindcss'
// Triggering cache invalidation after fixing CSS syntax

export default {
  content: [
    './app/components/**/*.{vue,js,ts}',
    './app/layouts/**/*.vue',
    './app/pages/**/*.vue',
    './app/app.vue',
  ],
  darkMode: 'class',
  theme: {
    // Custom theme extensions for the portfolio
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Manrope', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        dark: {
          DEFAULT: 'rgb(var(--color-bg-base) / <alpha-value>)',
          card: 'rgb(var(--color-bg-card) / <alpha-value>)',
          lighter: 'rgb(var(--color-bg-lighter) / <alpha-value>)',
          border: 'rgb(var(--color-border) / <alpha-value>)',
        },
        accent: {
          DEFAULT: '#8DEB67',
          light: '#B8FF8A',
          dark: '#73D65A',
          glow: 'rgba(141, 235, 103, 0.18)',
        },
        violet: {
          DEFAULT: '#8DEB67',
          light: '#B8FF8A',
        },
      },
      // Custom animations for smooth UI transitions and interactive effects
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'slide-in-right': 'slideInRight 0.5s ease-out forwards',
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'floatSlow 8s ease-in-out infinite',
        glow: 'glow 2s ease-in-out infinite alternate',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'marquee-ltr': 'marqueeLtr 20s linear infinite',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(115,214,90,0.2)' },
          '100%': { boxShadow: '0 0 20px rgba(115,214,90,0.4)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(115,214,90,0.4), 0 0 60px rgba(115,214,90,0.2)' },
          '50%': { boxShadow: '0 0 30px rgba(115,214,90,0.6), 0 0 80px rgba(115,214,90,0.3)' },
        },
        marqueeLtr: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100vw)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },
    },
  },
  plugins: [],
} satisfies Config
