// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  app: {
    head: {
      title: 'Horse Racing',
      link: [{ rel: 'stylesheet', type: 'text/css', href: '/css/bootstrap-grid.css' }]
    }
  },
  modules: ['@nuxt/eslint', '@pinia/nuxt', '@element-plus/nuxt', '@nuxt/test-utils/module'],
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
  runtimeConfig: {
    public: {
      gameSpeedMultiplier: 1
    }
  },
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],
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
  },
  typescript: {
    tsConfig: {
      include: ['../test/**/*', '../test/**/*.ts', '../test/**/**/*.ts']
    }
  }
})
