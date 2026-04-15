export default defineNuxtRouteMiddleware((to, from) => {
  if (import.meta.server && to.name !== 'index') return navigateTo('/')
})
