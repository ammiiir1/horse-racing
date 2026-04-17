<template>
  <div class="race-track">
    <div v-for="(horse, index) in raceStatus.horsesData" :key="horse.id" class="lane" data-testid="race-track-lane">
      <div class="lane-number">{{ index + 1 }}</div>

      <div class="lane-path">
        <RunningHorseVector :color="horse.color" :x-pos="getHorsePos(horse)" />
        <span class="horse-name">{{ horse.name }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IHorseRaceData } from '~/typescript/interfaces/app'
const { raceStatus } = storeToRefs(useAppStore())

// /////////////////////////////////////////////// methods
const getHorsePos = (horse: IHorseRaceData) => {
  const xPos = (100 * horse.xPos) / raceStatus.value.totalTime
  return `${xPos}%`
}
</script>

<style src="./RaceTrack.scss" lang="scss"></style>
