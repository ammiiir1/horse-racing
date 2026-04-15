<template>
  <div>
    <div class="glass p-3">
      <p>Here are the available race programs:</p>

      <div class="py-3">
        <RaceProgramsList />
      </div>

      <el-button type="primary" size="large" @click="addRaceProgram">Generate New Program</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { genRaceProgram } from '~/lib/race'

const appStore = useAppStore()
const { racePrograms, horses } = storeToRefs(appStore)
const { setRacePrograms } = appStore

// ///////////////////////////////////////////////// methods
const addRaceProgram = () => {
  const newProgram = genRaceProgram(horses.value)
  setRacePrograms([...racePrograms.value, newProgram])
}
</script>

<style scoped></style>
