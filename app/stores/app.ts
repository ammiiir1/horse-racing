import { defineStore } from 'pinia'
import { genHorses } from '~/lib/horse'
import { genRaceProgram } from '~/lib/raceProgram'
import type { IHorse, IRaceProgram, IRaceRound, IRaceStatus } from '~/typescript/interfaces/app'

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
    } as IRaceStatus,
    activeRaceProgram: undefined as IRaceProgram | undefined
  }),

  actions: {
    generateHorses() {
      this.horses = genHorses(20)
    },

    addNewRaceProgram() {
      const newProgram = genRaceProgram(this.horses)
      this.racePrograms.push(newProgram)
    },

    updateProgramsWithActiveProgram(payload?: { activeProgramRounds?: IRaceRound[]; activeProgramIsDone?: boolean }) {
      const allPrograms = this.racePrograms.map((item) => {
        if (item.id === this.activeRaceProgram?.id) {
          const tmpData = {
            ...item,
            isDone: payload?.activeProgramIsDone || false
          } as IRaceProgram
          if (payload?.activeProgramRounds) tmpData.rounds = payload.activeProgramRounds
          return tmpData
        } else return item
      })
      this.racePrograms = allPrograms
    },

    setRaceStatus(payload?: Partial<IRaceStatus>) {
      this.raceStatus = {
        horsesData: [],
        roundData: payload?.roundData,
        isStarted: payload?.isStarted || false,
        totalTime: payload?.totalTime || 0,
        spentTime: payload?.totalTime || 0
      }

      // update raceStatus horses data according to activeRaceProgram horses list
      for (const item of this.activeRaceProgram?.horses || []) {
        this.raceStatus.horsesData.push({ ...item, xPos: 0, todaysCondition: (Math.random() - Math.random()) * 10 })
      }
    },

    setActiveRaceProgram(payload: IRaceProgram) {
      this.activeRaceProgram = payload
    }
  }
})
