<template>
  <el-table :data="tableData" style="width: 100%" :height="height || 400">
    <el-table-column label="#" width="80">
      <template #default="{ $index }">
        <div data-testid="horse-item">{{ $index + 1 }}</div>
      </template>
    </el-table-column>
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
import type { ID } from '~/typescript/types/app'

// //////////////////////////////////////////// props
const props = defineProps<{
  horses?: IHorse[]
  raceProgramId?: ID
  height?: number
}>()

// ///////////////////////////////////////////// composables
const { raceProgramHorses } = useRaceProgramHorses(props.raceProgramId || ('' as ID))

// ///////////////////////////////////////////// computed
const tableData = computed(() => props.horses || raceProgramHorses.value || [])
</script>

<style scoped></style>
