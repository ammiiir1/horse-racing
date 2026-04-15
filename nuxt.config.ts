// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: false },
  modules: ['@nuxt/eslint', '@pinia/nuxt', '@element-plus/nuxt'],
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
  ]
})
