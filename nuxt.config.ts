// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: {
    head: {
      htmlAttrs: {
        lang: 'ru',
      },
      meta: [
        {
          name: 'format-detection',
          content: 'telephone=no, address=no, email=no, date=no',
        },
      ],
      link:[
        {
          rel: 'icon',
          type: 'image/png',
          href: '/favicon-16x16.png'
        },
        {
          rel: 'preload',
          href: '/fonts/Roboto-Regular.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous'
        },
        {
          rel: 'preload',
          href: '/fonts/Roboto-Medium.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous'
        },
        {
          rel: 'preload',
          href: '/fonts/Montserrat-ExtraBold.woff2',
          as: 'font',
          type: 'font/woff2',
          crossorigin: 'anonymous'
        },
      ],
    },
  },
  css: [
    '~/assets/styles/app.scss',
  ],
  features: {
    inlineStyles: true 
  },
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: (content, filepath) => {
            // Если Vite обрабатывает файлы из папки со стилями, отдаем их как есть
            if (filepath.includes('assets/styles')) {
              return content;
            }
            // Для всех остальных файлов (.vue компонентов) автоматически добавляем миксины
            return `@use "~/assets/styles/function.scss" as *; ${content}`;
          }
        },
      },
    },
  },
  devServer: {
    host: '127.0.0.1',
  },
  runtimeConfig: {
    'public': {}
  },
  modules: [
    '@vueuse/nuxt',
    'nuxt-svg-sprite-icon',
    '@nuxt/eslint',
    '@pinia/nuxt',
    'nuxt-swiper',
    '@nuxt/content',
  ],
  content: {
    experimental: { 
      sqliteConnector: 'native',
     },
    renderer: {
      anchorLinks: false,
    },
  },
  svgSprite: {
    input: './app/assets/sprite/svg',
    output: './app/assets/sprite/gen',
  },  
  $production: {
    routeRules: {
      '/fonts/**': { 
        headers: { 
          'Cache-Control': 'public, max-age=31536000, immutable' 
        } 
      },
      '/images/**': { 
        headers: { 
          'Cache-Control': 'public, max-age=31536000, immutable' 
        } 
      },
    },
    nitro: {
      // Включает сжатие Brotli и Gzip для всех текстовых ресурсов и шрифтов
      compressPublicAssets: true 
    },
  },

  $development: {
    modules: ['@nuxtjs/html-validator'],
    htmlValidator: {
      usePrettier: true, 
      logLevel: 'verbose', 
      failOnError: false, 
      
      options: {
        extends: [
          'html-validate:recommended', 
          'html-validate:document',  
        ],
        rules: {
          'no-trailing-spaces': 'off',
          'void-style': 'off',
          'prefer-button': 'warn',
          "valid-id": [
            "error",
            {
              "relaxed": true
            }
          ]
        }
      }
    }
  },
})