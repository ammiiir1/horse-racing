<template>
  <div v-if="activeRaceProgram" class="row align-items-stretch">
    <div class="col-12 mb-3">
      <div
        :class="['glass card p-3 d-flex align-items-center justify-content-between', raceStatus.isStarted && 'py-4']"
      >
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
const { racePrograms, raceStatus, activeRaceProgram } = storeToRefs(useAppStore())
const { setRaceStatus, setActiveRaceProgram, startRace, stopRace } = useAppStore()
const route = useRoute()

// /////////////////////////////////////////////////////// states

// /////////////////////////////////////////////////////// computed

// /////////////////////////////////////////////////////// methods

// ////////////////////////////////////////////////// on mounted
onMounted(() => {
  // first step: fill activeRaceProgram data using id param passed in the route
  const pid = route.query.pid as string
  const raceProgram = racePrograms.value.find((program) => program.id === pid)
  if (raceProgram) setActiveRaceProgram(raceProgram)

  // second step: reset race status data (this method uses activeRaceProgram data inside it, so first we need to fill ActiveRaceProgram data)
  setRaceStatus()
})

// ////////////////////////////////////////////////// on route leave
onBeforeRouteLeave(async (to, from) => {
  if (raceStatus.value.isStarted) {
    try {
      await ElMessageBox.confirm('Racing is running, do you want to stop it and quit?', {
        type: 'warning',
        confirmButtonText: 'QUIT',
        confirmButtonType: 'danger',
        cancelButtonText: 'Cancel'
      })
      stopRace()
      return true
    } catch (err) {
      return false
    }
  } else return true
})
</script>

<style src="./index.scss" lang="scss"></style>
