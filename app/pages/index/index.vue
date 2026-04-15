<template>
  <div>
    <div class="glass">
      <HorsesList :horses="horses" />
    </div>
  </div>
</template>

<script setup lang="ts">
const { horses } = storeToRefs(useAppStore())
</script>

<style src="./index.scss" lang="scss"></style>
