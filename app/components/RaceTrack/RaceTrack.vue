<template>
  <div class="race-track">
    <div v-for="(horse, index) in horses" :key="horse.id" class="lane">
      <div class="lane-number">{{ index + 1 }}</div>
      <div class="lane-path">
        <RunningHorseVector :color="horse.color" :is-running="false"/>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IHorse } from '~/typescript/interfaces/app'

// /////////////////////////////////////////////// props
defineProps<{
  horses: IHorse[]
}>()
</script>

<style src="./RaceTrack.scss" lang="scss"></style>
