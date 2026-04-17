<template>
  <div>
    <div class="card glass p-3">
      <div class="d-flex align-items-center justify-content-between">
        <b class="text-dark">Here are the available race programs:</b>
        <el-button type="primary" size="large" data-testid="generate-program-btn" @click="addNewRaceProgram">
          Generate Race Program
        </el-button>
      </div>

      <div class="py-3">
        <RaceProgramsList v-if="racePrograms.length" data-testid="race-program-list" />
        <p v-else data-testid="no-program-text" class="text-center text-white py-5 large-border-radius glass">No race program generated yet.</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const { racePrograms } = storeToRefs(useAppStore())
const { addNewRaceProgram } = useAppStore()
</script>

<style scoped></style>
