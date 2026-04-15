<template>
  <div v-if="currentProgram" class="row align-items-stretch">
    <div class="col-12 mb-3">
      <div class="glass card p-3 d-flex align-items-center justify-content-between">
        <b class="text-dark">Ready to go?</b>
        <el-button class="px-5 ms-2" size="large" type="primary">Start!</el-button>
      </div>
    </div>
    <div class="col-8">
      <div class="glass card p-3">
        <RaceTrack :horses="horses" />
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
const { racePrograms } = storeToRefs(useAppStore())
const route = useRoute()

// /////////////////////////////////////////////////////// computed
const currentProgram = computed(() => {
  const pid = route.query.pid as string
  return racePrograms.value.find((program) => program.id === pid)
})

const horses = computed(() => currentProgram.value?.horses || [])
</script>

<style src="./index.scss" lang="scss"></style>
