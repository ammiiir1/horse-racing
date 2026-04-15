<template>
  <div>
    <div class="card glass p-3">
      <p class="text-dark">Here are the available race programs:</p>

      <div class="py-3">
        <RaceProgramsList />
      </div>

      <el-button type="primary" size="large" @click="addNewRaceProgram">Generate New Program</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
const { addNewRaceProgram } = useAppStore()
</script>

<style scoped></style>
