export default defineNuxtConfig({
  compatibilityDate: '2025-01-01',
  devtools: { enabled: false },
  css: ['~/assets/css/main.css'],
  runtimeConfig: {
    public: {
      // Override with NUXT_PUBLIC_API_BASE in .env
      apiBase: 'http://localhost:8000/api'
    }
  },
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'Sean Kenneth Axalan — UI/UX Designer & Frontend Developer',
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Portfolio of Sean Kenneth Axalan, a UI/UX designer and frontend developer in Davao City designing beautiful, easy-to-use interfaces and building fast, responsive websites.' },
        { name: 'theme-color', content: '#0a0a0b' },
        { property: 'og:title', content: 'Sean Kenneth Axalan — UI/UX Designer & Frontend Developer' },
        { property: 'og:description', content: 'Beautiful, easy-to-use interfaces and fast, responsive websites. Based in Davao City.' },
        { property: 'og:type', content: 'website' },
        { name: 'twitter:card', content: 'summary' }
      ],
      link: [
        { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&family=Space+Grotesk:wght@400;500;600;700&display=swap'
        }
      ]
    }
  }
})
