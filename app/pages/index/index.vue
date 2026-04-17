<template>
  <div>
    <div class="card">
      <HorsesList data-testid="horses-statistics-table" :horses="horsesList" :height="650" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { horses } = storeToRefs(useAppStore())

// ///////////////////////////////////////////////////////// computed
const horsesList = computed(() => Array.from(horses.value.values()))
</script>

<style src="./index.scss" lang="scss"></style>
