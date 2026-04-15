export default defineNuxtPlugin((NuxtApp) => {
  const { $config } = NuxtApp
  const test = () => {
    console.log('test')
  }

  return {
    provide: {
      test
    }
  }
})
