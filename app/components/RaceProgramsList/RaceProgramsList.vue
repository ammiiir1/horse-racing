<template>
  <div>
    <el-collapse>
      <el-collapse-item
        v-for="(program, index) in racePrograms"
        :key="program.id"
        :name="program.id"
        data-testid="race-program-item"
      >
        <template #title>
          <span class="text-white">{{ `Program ${index + 1}, Created at ${$date(program.createdAt)}` }}</span>
          <span :class="[program.isDone ? 'text-success' : 'text-danger', 'ms-3']">
            {{ program.isDone ? 'Completed' : 'Pending' }}
          </span>
        </template>

        <div class="row">
          <div class="col-12 col-lg-6">
            <p class="text-white text-left">Horses in this program:</p>
            <HorsesList :race-program-id="program.id" class="large-border-radius" />
          </div>
          <div class="col-12 col-lg-6">
            <p class="text-white text-left">Results:</p>

            <RaceRoundResultsList :rounds="program.rounds" :horses="program.horses" class="large-border-radius" />
          </div>

          <div v-if="!program.isDone" class="col-12 text-center mt-3">
            <el-button
              type="primary"
              size="large"
              class="px-10"
              data-testid="start-race-btn"
              @click="$router.push({ name: 'programs-race', query: { pid: program.id } })"
            >
              Start Race
            </el-button>
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
