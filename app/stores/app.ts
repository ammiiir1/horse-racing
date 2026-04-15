import { defineStore } from 'pinia'
import type { IHorse } from '~/typescript/interfaces/app'

export const useAppStore = defineStore('app', {
  state: () => ({
    horses: [] as IHorse[]
  }),

  actions: {
    setHorses(horses: IHorse[]) {
      this.horses = horses
    }
  }
})
