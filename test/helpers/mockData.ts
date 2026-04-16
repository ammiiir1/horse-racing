import type { IHorse } from '@/typescript/interfaces/app'
import type { ID } from '../../app/typescript/types/app'
import { genRaceRounds } from '~/lib/raceProgram'

export const mockHorse = (overrides?: Partial<IHorse>): IHorse => {
  return {
    id: '9112d383-e7a2-4101-8ad9-3e8fc84cefcf' as ID,
    name: 'Sky Storm',
    condition: 66,
    color: 'hsl(194, 30%, 50%)',
    races: 0,
    wins: 0,
    ...overrides
  }
}

export const mockRoundResult = () => {
  const results = [] as { horseId: ID; position: number }[]

  for (let i = 0; i < 10; i++) {
    results.push({
      horseId: crypto.randomUUID(),
      position: i + 1
    })
  }

  return results
}

export const mockRaceRounds = () => {
  const rounds = genRaceRounds()
  const results = mockRoundResult()

  for (const item of rounds) {
    item.results = results
  }

  return rounds
}
