<template>
  <div v-if="activeRaceProgram" class="row align-items-stretch">
    <div class="col-12 mb-3">
      <div class="glass card p-3 d-flex align-items-center justify-content-between">
        <template v-if="!raceStatus.isStarted">
          <b class="text-dark">Ready to go?</b>
          <el-button class="px-5 ms-2" size="large" type="primary" @click="startRace"> Start! </el-button>
        </template>
        <template v-else>
          <span>Round {{ raceStatus.roundData?.round }} is running ...</span>
          <span>{{ raceStatus.roundData?.length }}m</span>
        </template>
      </div>
    </div>

    <div class="col-8">
      <div class="glass card p-3">
        <RaceTrack />
      </div>
    </div>
    <div class="col-4">
      <div class="glass card p-3">
        <RaceRoundResultsList :rounds="activeRaceProgram.rounds" :horses="activeRaceProgram.horses" height="76vh" />
      </div>
    </div>
  </div>

  <div v-else>
    <p class="text-center">No program found</p>
  </div>
</template>

<script setup lang="ts">
import type { IRaceProgram, IRaceRound } from '~/typescript/interfaces/app'

const { racePrograms, raceStatus, activeRaceProgram } = storeToRefs(useAppStore())
const { setRaceStatus, updateProgramsWithActiveProgram, setActiveRaceProgram } = useAppStore()
const route = useRoute()

// /////////////////////////////////////////////////////// states

// /////////////////////////////////////////////////////// computed

// /////////////////////////////////////////////////////// methods

const startRound = () => {
  return new Promise((resolve, reject) => {
    // ////////////////////////// start race interval
    let spentTime = 0
    const raceInterval = setInterval(() => {
      // increase spentTime
      spentTime += 100

      // update horse movement position
      for (const item of raceStatus.value?.horsesData || []) {
        const movementRate = item.condition + item.todaysCondition
        item.xPos = item.xPos + (movementRate > 0 ? movementRate : Math.random() * 100 + 20)
      }

      // finish round
      if (spentTime >= raceStatus.value.totalTime) {
        clearInterval(raceInterval)

        // sort horse data by their positions
        const horsesDataClone = [...raceStatus.value.horsesData]
        horsesDataClone.sort((a, b) => b.xPos - a.xPos)

        // fill round results array with race data
        const roundDataClone = { ...raceStatus.value.roundData } as IRaceRound

        let pos = 1
        for (const item of horsesDataClone) {
          roundDataClone?.results?.push({ horse: item, position: pos })
          pos++
        }

        // update racePrograms data with activeProgram updates
        const activeProgramRounds = activeRaceProgram.value?.rounds.map((item) => {
          if (item.id === roundDataClone.id) return roundDataClone
          else return item
        }) as IRaceRound[]

        // update race programs list
        updateProgramsWithActiveProgram({ activeProgramRounds })

        // resolve promise - ready for next round ;)
        resolve(true)
      }
    }, 100)
  })
}

const startRace = async () => {
  try {
    for await (const round of activeRaceProgram.value?.rounds || []) {
      setRaceStatus({
        isStarted: true,
        roundData: round,
        totalTime: round.length * 10,
        spentTime: 0
      })

      await startRound()
    }

    setRaceStatus({ isStarted: false })
    updateProgramsWithActiveProgram({ activeProgramIsDone: true })
  } catch (err) {}
}

// ////////////////////////////////////////////////// on mounted
onMounted(() => {
  // first step: fill activeRaceProgram data using id param passed in the route
  const pid = route.query.pid as string
  const raceProgram = racePrograms.value.find((program) => program.id === pid)
  if (raceProgram) setActiveRaceProgram(raceProgram)

  // second step: reset race status data (this method uses activeRaceProgram data inside it, so first we need to fill ActiveRaceProgram data)
  setRaceStatus()
})
</script>

<style src="./index.scss" lang="scss"></style>
