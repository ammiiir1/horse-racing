import { expect } from 'vitest'
import { IHorse, IRaceProgram, IRaceRound } from '@/typescript/interfaces/app'

expect.extend({
  toBeValidHorse(horse: IHorse) {
    const pass =
      horse &&
      typeof horse.id === 'string' &&
      typeof horse.name === 'string' &&
      typeof horse.color === 'string' &&
      typeof horse.condition === 'number' &&
      typeof horse.races === 'number' &&
      typeof horse.wins === 'number'

    return {
      pass,
      message: () =>
        pass ? `Horse data Matches Interface` : `Horse data does NOT Match Interface: ${JSON.stringify(horse, null, 2)}`
    }
  },
  toBeValidRaceRound(round: IRaceRound) {
    const pass =
      round &&
      typeof round.id === 'string' &&
      typeof round.round === 'number' &&
      typeof round.length === 'number' &&
      typeof round.isDone === 'boolean' &&
      typeof round.startTime === 'number' &&
      typeof round.finishTime === 'number' &&
      Array.isArray(round.results)

    return {
      pass,
      message: () =>
        pass
          ? `RaceRound data Matches Interface`
          : `RaceRound data does NOT Match Interface: ${JSON.stringify(round, null, 2)}`
    }
  },
  toBeValidRaceProgram(raceProgram: IRaceProgram) {
    let pass =
      raceProgram &&
      typeof raceProgram.id === 'string' &&
      typeof raceProgram.createdAt === 'number' &&
      typeof raceProgram.finishedAt === 'number' &&
      typeof raceProgram.isDone === 'boolean' &&
      Array.isArray(raceProgram.rounds) &&
      Array.isArray(raceProgram.horses)

    if (raceProgram.rounds.length !== 6) pass = false
    if (raceProgram.horses.length !== 10) pass = false

    return {
      pass,
      message: () =>
        pass
          ? `RaceProgram data Matches Interface`
          : `RaceProgram data does NOT Match Interface: ${JSON.stringify(raceProgram, null, 2)}`
    }
  }
})
