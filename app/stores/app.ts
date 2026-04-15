import { defineStore } from 'pinia'
import { genHorses } from '~/lib/horse'
import type { IHorse, IRaceProgram } from '~/typescript/interfaces/app'

export const useAppStore = defineStore('app', {
  state: () => ({
    horses: [] as IHorse[],
    racePrograms: [] as IRaceProgram[]
  }),

  actions: {
    generateHorses() {
      this.horses = genHorses(20)
    },

    setRacePrograms(racePrograms: IRaceProgram[]) {
      this.racePrograms = racePrograms
    }
  }
})
