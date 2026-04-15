<template>
  <div v-if="currentProgram" class="row align-items-stretch">
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
    <!-- <div class="col-12">
      <pre>{{ currentProgram }}</pre>
    </div> -->
    <div class="col-8">
      <div class="glass card p-3">
        <RaceTrack :horses="horses" :horses-position="horsesPosition" :active-round="activeRound" />
      </div>
    </div>
    <div class="col-4">
      <div class="glass card p-3">
        <RaceRoundResultsList :rounds="currentProgram.rounds" :horses="currentProgram.horses" height="76vh" />
      </div>
    </div>
  </div>

  <div v-else>
    <p class="text-center">No program found</p>
  </div>
</template>

<script setup lang="ts">
import type { IHorse, IHorseRaceData, IRaceProgram, IRaceRound, IRaceStatus } from '~/typescript/interfaces/app'

const { racePrograms, raceStatus } = storeToRefs(useAppStore())
const { setRaceStatus, setRacePrograms } = useAppStore()
const route = useRoute()

// /////////////////////////////////////////////////////// states
const horsesPosition = reactive<IHorseRaceData[]>([])
const activeRound = ref<IRaceRound>()

// /////////////////////////////////////////////////////// computed
const currentProgram = computed(() => {
  const pid = route.query.pid as string
  return racePrograms.value.find((program) => program.id === pid)
})

const horses = computed(() => currentProgram.value?.horses || [])

// /////////////////////////////////////////////////////// methods
const updateRaceStatusData = (payload?: Partial<IRaceStatus>) => {
  const tempData: IRaceStatus = {
    horsesData: [],
    roundData: payload?.roundData,
    isStarted: payload?.isStarted || false,
    totalTime: payload?.totalTime || 0,
    spentTime: payload?.totalTime || 0
  }
  for (const item of currentProgram.value?.horses || []) {
    tempData.horsesData.push({ ...item, xPos: 0, todaysCondition: (Math.random() - Math.random()) * 10 })
  }
  setRaceStatus(tempData)
}

const updateProgramsList = (payload?: { currentProgramRounds?: IRaceRound[]; currentProgramIsDone?: boolean }) => {
  const allPrograms = racePrograms.value.map((item) => {
    if (item.id === currentProgram.value?.id) {
      const tmpData = {
        ...item,
        isDone: payload?.currentProgramIsDone || false
      } as IRaceProgram
      if (payload?.currentProgramRounds) tmpData.rounds = payload.currentProgramRounds
      return tmpData
    } else return item
  })
  setRacePrograms(allPrograms)
}

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

        // update raceProgram data (current program)
        const currentProgramRounds = currentProgram.value?.rounds.map((item) => {
          if (item.id === roundDataClone.id) return roundDataClone
          else return item
        })

        // update race programs list
        updateProgramsList({ currentProgramRounds: currentProgramRounds || [] })

        // resolve promise - ready for next round ;)
        resolve(true)
      }
    }, 100)
  })
}

const startRace = async () => {
  try {
    for await (const round of currentProgram.value?.rounds || []) {
      updateRaceStatusData({
        isStarted: true,
        roundData: round,
        totalTime: round.length * 10,
        spentTime: 0
      })

      await startRound()
    }

    updateRaceStatusData({ isStarted: false })
    updateProgramsList({ currentProgramIsDone: true })
  } catch (err) {}
}

// ////////////////////////////////////////////////// on mounted
onMounted(() => {
  updateRaceStatusData()
})
</script>

<style src="./index.scss" lang="scss"></style>
