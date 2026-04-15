import gsap from 'gsap'
import scrollToPlugin from 'gsap/ScrollToPlugin'
import scrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(scrollToPlugin, scrollTrigger)

export default defineNuxtPlugin(() => {
  return {
    provide: {
      gsap
    }
  }
})
