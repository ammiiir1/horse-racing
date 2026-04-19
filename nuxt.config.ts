import type { ID } from './app/typescript/types/app'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxt/eslint', '@pinia/nuxt', '@element-plus/nuxt', '@nuxt/test-utils/module'],
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],
  devtools: { enabled: false },
  app: {
    head: {
      title: 'Horse Racing',
      link: [
        { rel: 'stylesheet', type: 'text/css', href: '/css/bootstrap-grid.css' },
        { rel: 'icon', type: 'image/png', href: '/favicon.png' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      gameSpeedMultiplier: 1,
      testMode: false
    }
  },
  compatibilityDate: '2025-07-15',
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/sass/configs/index.scss" as *;`,
          loadPaths: ['sass']
        }
      },
      devSourcemap: true
    }
  },
  typescript: {
    tsConfig: {
      include: ['../test/**/*', '../test/**/*.ts', '../test/**/**/*.ts']
    }
  },
  eslint: {
    checker: true,
    config: {
      stylistic: {
        commaDangle: 'never',
        indent: 2,
        semi: false,
        quotes: 'single',
        braceStyle: '1tbs'
      }
    }
  }
})
