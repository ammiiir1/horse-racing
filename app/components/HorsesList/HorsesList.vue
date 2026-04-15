<template>
  <el-table :data="horses" style="width: 100%" height="400">
    <el-table-column type="index" label="#" width="80" />
    <el-table-column prop="name" label="Name" min-width="180" />
    <el-table-column prop="color" label="Color" min-width="100">
      <template #default="{ row }">
        <HorseIcon :color="row.color" width="30" />
      </template>
    </el-table-column>
    <el-table-column prop="condition" label="Condition" min-width="150" />
    <el-table-column prop="races" label="Races" min-width="100">
      <template #default="{ row }">
        <span>{{ row.races || '-' }} </span>
      </template>
    </el-table-column>
    <el-table-column prop="wins" label="Wins" min-width="100">
      <template #default="{ row }">
        <span>{{ row.wins || '-' }} </span>
      </template>
    </el-table-column>
  </el-table>
</template>

<script setup lang="ts">
import type { IHorse } from '~/typescript/interfaces/app'

defineProps<{
  horses: IHorse[]
}>()
</script>

<style scoped></style>
