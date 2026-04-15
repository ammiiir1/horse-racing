<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { genHorses } from '~/lib/horse'
const { setHorses } = useAppStore()

// /////////////////////////////////////////////////// methods
const generateHorseLists = () => {
  const horses = genHorses(20)
  setHorses(horses)
}
// /////////////////////////////////////////////////// run at app init
onMounted(() => {
  generateHorseLists()
})
</script>

<style src="@/sass/global/index.scss" lang="scss"></style>
