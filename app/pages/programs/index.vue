<template>
  <div>
    <div class="card glass p-3">
      <div class="d-flex align-items-center justify-content-between">
        <b class="text-dark">Here are the available race programs:</b>
        <el-button type="primary" size="large" @click="addNewRaceProgram">Generate New Program</el-button>
      </div>

      <div class="py-3">
        <RaceProgramsList v-if="racePrograms.length" />
        <p v-else class="text-center text-white py-5 large-border-radius glass">No race program generated yet.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { racePrograms } = storeToRefs(useAppStore())
const { addNewRaceProgram } = useAppStore()
</script>

<style scoped></style>
