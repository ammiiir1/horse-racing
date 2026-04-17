<template>
  <div v-if="activeRaceProgram" class="row align-items-stretch">
    <div class="col-12 mb-3">
      <div
        class="glass card p-3 d-flex align-items-center justify-content-between"
        data-testid="race-action-bar"
      >
        <template v-if="!raceStatus.isStarted">
          <b class="text-dark">Ready to go?</b>
          <el-button
            class="px-5 ms-2"
            size="large"
            type="primary"
            data-testid="start-race-btn"
            @click="startRace"
          >
            Start!
          </el-button>
        </template>
        <template v-else>
          <div>
            <span>Round {{ raceStatus.roundData?.round }} is running ...</span>
            <span class="text-danger ms-2">{{ raceStatus.roundData?.length }}m</span>
          </div>

          <el-button
            class="px-5 ms-2"
            size="large"
            type="danger"
            data-testid="stop-race-btn"
            @click="stop"
          >
            Stop
          </el-button>
        </template>
      </div>
    </div>

    <div class="col-12 col-lg-8 col-xxl-9">
      <div class="glass card p-3">
        <RaceTrack :key="dataRenderKey" data-testid="race-track" />
      </div>
    </div>
    <div class="col-12 col-lg-4 col-xxl-3 mt-4 mt-lg-0">
      <div class="glass card p-3">
        <RaceRoundResultsList
          :key="dataRenderKey + 1"
          :rounds="activeRaceProgram.rounds"
          :horses="activeRaceProgram.horses"
          height="76vh"
          data-testid="race-results"
        />
      </div>
    </div>
  </div>

  <div v-else>
    <p class="text-center">No program found</p>
  </div>
</template>

<script setup lang="ts">
const { racePrograms, raceStatus, activeRaceProgram } = storeToRefs(useAppStore())
const { setRaceStatus, setActiveRaceProgram, startRace, stopRace } = useAppStore()
const route = useRoute()

// /////////////////////////////////////////////////////// states
const dataRenderKey = ref(0)

// /////////////////////////////////////////////////////// computed

// /////////////////////////////////////////////////////// methods
const getActiveProgram = () => {
  const pid = route.query.pid as string
  const raceProgram = racePrograms.value.find((program) => program.id === pid)
  if (raceProgram) setActiveRaceProgram(raceProgram)
}

const stopWarning = (msg: string, btn: string) =>
  ElMessageBox.confirm(msg, {
    type: 'warning',
    confirmButtonText: btn,
    confirmButtonType: 'danger',
    cancelButtonText: 'Cancel',
    confirmButtonClass: 'confirm-stop-alert-btn',
    cancelButtonClass: 'cancel-stop-alert-btn',
    customClass: 'stop-race-alert'
  })

const stop = async () => {
  try {
    await stopWarning('Are you sure wanna stop the race?', 'STOP')
    stopRace()
    setRaceStatus()
    getActiveProgram()
    dataRenderKey.value = Math.random()
  } catch (err) {}
}

// ////////////////////////////////////////////////// on mounted
onMounted(() => {
  // first step: fill activeRaceProgram data using id param passed in the route
  getActiveProgram()

  // second step: reset race status data (this method uses activeRaceProgram data inside it, so first we need to fill ActiveRaceProgram data)
  setRaceStatus()
})

// ////////////////////////////////////////////////// on route leave
onBeforeRouteLeave(async (to, from) => {
  if (raceStatus.value.isStarted) {
    try {
      await stopWarning('Racing is running, do you want to stop it and quit?', 'QUIT')
      stopRace()
      return true
    } catch (err) {
      return false
    }
  }
})
</script>

<style src="./index.scss" lang="scss"></style>
