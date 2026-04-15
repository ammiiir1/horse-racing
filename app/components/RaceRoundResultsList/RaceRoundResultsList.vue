<template>
  <div class="race-round-results" :style="{ height: height || '400px' }">
    <el-scrollbar class="scrollbar">
      <div v-for="round in rounds" :key="round.id" class="result-wrapper">
        <div class="round-details">
          <span>Round {{ round.round }}</span>
          <span>{{ round.length }}m</span>
        </div>

        <el-table :data="round.results" style="width: 100%">
          <el-table-column prop="position" label="Position" width="70" />

          <el-table-column prop="name" label="Name" min-width="130">
            <template #default="{ row }">
              <span class="d-block">{{ row.horse.name }}</span>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-scrollbar>
  </div>
</template>

<script setup lang="ts">
import type { IRaceRound } from '~/typescript/interfaces/app'

// ///////////////////////////////////////////////////// props
defineProps<{
  rounds: IRaceRound[]
  height?: string
}>()
</script>

<style src="./RaceRoundResultsList.scss" lang="scss"></style>
