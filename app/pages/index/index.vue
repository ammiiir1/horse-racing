<template>
  <div>
    <div class="card">
      <HorsesList :horses="horses" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { horses } = storeToRefs(useAppStore())
</script>

<style src="./index.scss" lang="scss"></style>
