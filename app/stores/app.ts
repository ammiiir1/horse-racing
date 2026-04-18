import { defineStore } from 'pinia'
import { genHorses } from '~/lib/horse'
import { genRaceProgram } from '~/lib/raceProgram'
import type { IHorse, IRaceProgram, IRaceRound, IRaceStatus } from '~/typescript/interfaces/app'
import type { ID } from '~/typescript/types/app'

export const useAppStore = defineStore('app', {
  state: () => ({
    horses: new Map<ID, IHorse>(),
    horsesBackup: [] as IHorse[],
    racePrograms: [] as IRaceProgram[],
    raceProgramsBackup: [] as IRaceProgram[],
    raceStatus: {
      horsesData: [],
      roundData: undefined,
      totalTime: 0,
      spentTime: 0,
      isStarted: false
    } as IRaceStatus,
    activeRaceProgram: undefined as IRaceProgram | undefined,
    raceInterval: undefined as NodeJS.Timeout | undefined
  }),

  actions: {
    generateHorses() {
      const generatedHorses = genHorses(20)
      for (const h of generatedHorses) {
        this.horses.set(h.id, h)
      }
    },

    addNewRaceProgram() {
      const newProgram = genRaceProgram(Array.from(this.horses.keys()))
      this.racePrograms.push(newProgram)
    },

    getBackup() {
      this.horsesBackup = JSON.parse(JSON.stringify(Array.from(this.horses.values())))
      this.raceProgramsBackup = JSON.parse(JSON.stringify(this.racePrograms))
    },

    clearBackup() {
      this.horsesBackup = []
      this.raceProgramsBackup = []
    },

    restoreBackup() {
      this.horses.clear()
      for (const h of this.horsesBackup) {
        this.horses.set(h.id, h)
      }
      this.racePrograms = [...this.raceProgramsBackup]
      this.clearBackup()
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
      for (const id of this.activeRaceProgram?.horses || []) {
        const horse = this.horses.get(id)
        if (horse) {
          this.raceStatus.horsesData.push({
            ...horse,
            xPos: 0,
            todaysCondition: (Math.random() - Math.random()) * 10
          })
        }
      }
    },

    setActiveRaceProgram(payload: IRaceProgram) {
      this.activeRaceProgram = payload
    },

    startRound() {
      return new Promise((resolve, reject) => {
        const GAME_TICK_RATE = 100

        // ////////////////////////// start race interval
        this.raceStatus.spentTime = 0
        this.raceInterval = setInterval(() => {
          // increase spentTime
          this.raceStatus.spentTime += GAME_TICK_RATE
          const horsesXpos = new Set<number>([])

          // update horse movement position
          for (const item of this.raceStatus?.horsesData || []) {
            const movementRate = item.condition + item.todaysCondition
            item.xPos = item.xPos + (movementRate > 0 ? movementRate : Math.random() * 100 + 20)
            horsesXpos.add(item.xPos)
          }

          // finish round
          const biggestHorseXpos = [...horsesXpos].sort((a, b) => b - a)[0] || 0
          if (this.raceStatus.spentTime >= this.raceStatus.totalTime && biggestHorseXpos >= this.raceStatus.totalTime) {
            // kill interval
            clearInterval(this.raceInterval)

            // sort horse data by their positions
            this.raceStatus.horsesData.sort((a, b) => b.xPos - a.xPos)

            // fill round results array with race data
            const roundData = this.raceStatus.roundData

            let pos = 1
            for (const item of this.raceStatus.horsesData) {
              roundData?.results?.push({ horseId: item.id, position: pos })
              pos++
            }

            // update racePrograms data with activeProgram updates
            const activeProgramRounds = this.activeRaceProgram?.rounds.map((item) => {
              if (item.id === roundData?.id) return roundData
              else return item
            }) as IRaceRound[]

            // update race programs list
            this.updateProgramsWithActiveProgram({ activeProgramRounds })

            // update horse races count
            for (const id of this.activeRaceProgram?.horses || []) {
              const horse = this.horses.get(id)
              if (horse) horse.races++
            }

            // update horse wins count
            const horse_winned = this.horses.get(this.raceStatus.roundData?.results[0]?.horseId as ID)
            if (horse_winned) horse_winned.wins++

            // resolve promise - ready for next round ;)
            resolve(true)
          }
        }, GAME_TICK_RATE * useRuntimeConfig().public.gameSpeedMultiplier)
      })
    },

    async startRace() {
      // get backup
      this.getBackup()

      try {
        for await (const round of this.activeRaceProgram?.rounds || []) {
          this.setRaceStatus({
            isStarted: true,
            roundData: round,
            totalTime: round.length * 10 * useRuntimeConfig().public.gameSpeedMultiplier,
            spentTime: 0
          })

          await this.startRound()
        }

        this.setRaceStatus({ isStarted: false })
        this.updateProgramsWithActiveProgram({ activeProgramIsDone: true })

        // clear backup
        this.clearBackup()

        // tell client race is finished and change route to programs list
        await ElMessageBox.alert('Race Finished!', {
          type: 'success',
          confirmButtonClass: 'confirm-finish-alert-btn',
          customClass: 'finish-race-alert'
        })
        useRouter().push({ name: 'programs' })
      } catch (err) {}
    },

    stopRace() {
      if (!this.raceStatus.isStarted) return

      // kill interval
      clearInterval(this.raceInterval)

      // reset raceStatus
      this.setRaceStatus()

      // restore backup
      this.restoreBackup()
    }
  }
})
