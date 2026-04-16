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
  components: [
    {
      path: '~/components',
      pathPrefix: false
    }
  ],
  typescript: {
    tsConfig: {
      include: ['../test/**/*', '../test/**/*.ts', '../test/**/**/*.ts']
    }
  }
})
