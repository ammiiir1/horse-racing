<template>
  <div>
    <el-collapse>
      <el-collapse-item v-for="(program, index) in racePrograms" :key="program.id" :name="program.id">
        <template #title="{ isActive }">
          <span>{{ `Program ${index + 1}, Created at ${$date(program.createdAt)}` }}</span>
          <span :class="[program.isDone ? 'text-success' : 'text-danger', 'ms-3']">
            {{ program.isDone ? 'Completed' : 'Pending' }}
          </span>
        </template>

        <div class="row">
          <div class="col-6">
            <p class="text-left">Horses in this program:</p>
            <HorsesList :horses="program.horses" class="large-border-radius" />
          </div>
          <div class="col-6">
            <p class="text-left">Results:</p>
            <RaceRoundResultsList :rounds="program.rounds" :horses="program.horses" class="large-border-radius" />
          </div>

          <div v-if="!program.isDone" class="col-12 text-center mt-3">
            <el-button type="primary" size="large" class="px-10">Start Race</el-button>
          </div>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script setup lang="ts">
const { racePrograms } = storeToRefs(useAppStore())
</script>

<style scoped></style>
