import type { ID } from '~/typescript/types/app'

export const useRaceProgramHorses = (raceProgramId: ID) => {
  const { racePrograms, horses } = storeToRefs(useAppStore())

  // //////////////////////////////////////////////////  computed
  const raceProgram = computed(() => racePrograms.value.find((item) => item.id === raceProgramId))

  const raceProgramHorses = computed(() => {
    return raceProgram.value?.horses.flatMap((horseId) => horses.value.get(horseId) || []) || []
  })

  return { raceProgram, raceProgramHorses }
}
