import type { IHorse, IRaceRound } from '~/typescript/interfaces/app'

// ////////////////////////////////////////////// helpers
const genRaceRounds = () => {
  const rounds = [] as IRaceRound[]

  for (let i = 0; i < 6; i++) {
    rounds.push({
      id: crypto.randomUUID(),
      round: rounds.length + 1,
      length: 1200 + rounds.length * 200,
      isDone: false,
      startTime: 0,
      finishTime: 0,
      results: []
    })
  }

  return rounds
}


// ////////////////////////////////////////////////// generate program
export const genRaceProgram = (availableHorses: IHorse[]) => {
  const chosenHorses = new Set<IHorse>()

  while (chosenHorses.size < 10) {
    const randomIndex = Math.floor(Math.random() * availableHorses.length)
    if (availableHorses[randomIndex]) chosenHorses.add(availableHorses[randomIndex])
  }

  const horsesArray = Array.from(chosenHorses)

  return {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    finishedAt: 0,
    horses: horsesArray,
    rounds: genRaceRounds(),
    isDone: false
  }
}
