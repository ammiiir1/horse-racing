import { defineStore } from 'pinia'
import { genHorses } from '~/lib/horse'
import type { IHorse, IRaceProgram, IRaceStatus } from '~/typescript/interfaces/app'

export const useAppStore = defineStore('app', {
  state: () => ({
    horses: [] as IHorse[],
    racePrograms: [] as IRaceProgram[],
    raceStatus: {
      horsesData: [],
      roundData: undefined,
      totalTime: 0,
      spentTime: 0,
      isStarted: false
    } as IRaceStatus
  }),

  actions: {
    generateHorses() {
      this.horses = genHorses(20)
    },

    setRacePrograms(racePrograms: IRaceProgram[]) {
      this.racePrograms = racePrograms
    },

    setRaceStatus(payload: IRaceStatus){
      this.raceStatus = payload
    },
  }
})
