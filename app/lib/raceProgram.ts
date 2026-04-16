import type { IHorse, IRaceRound } from '~/typescript/interfaces/app'
import type { ID } from '~/typescript/types/app'

// ////////////////////////////////////////////// helpers
const genRaceRounds = () => {
  const rounds = [] as IRaceRound[]

  for (let i = 0; i < 6; i++) {
    rounds.push({
      id: crypto.randomUUID(),
      round: rounds.length + 1,
      // length: 1200 + rounds.length * 200,
      length: 120 + rounds.length * 50,
      isDone: false,
      startTime: 0,
      finishTime: 0,
      results: []
    })
  }

  return rounds
}

// ////////////////////////////////////////////////// generate program
export const genRaceProgram = (availableHorses: ID[]) => {
  const chosenHorses = new Set<ID>()

  while (chosenHorses.size < 10) {
    const randomIndex = Math.floor(Math.random() * availableHorses.length)
    if (availableHorses[randomIndex]) chosenHorses.add(availableHorses[randomIndex])
  }

  return {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    finishedAt: 0,
    horses: Array.from(chosenHorses),
    rounds: genRaceRounds(),
    isDone: false
  }
}
