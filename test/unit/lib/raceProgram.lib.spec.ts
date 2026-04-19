import { describe, it, expect } from 'vitest'
import { genHorses } from '@/lib/horse'
import { genRaceProgram } from '@/lib/raceProgram'

describe('Race Program Library Test', () => {
  // mock nuxtRuntimeConfig
  // @ts-ignore
  globalThis.useRuntimeConfig = () => ({
    public: {
      testMode: true
    }
  })

  it('should generate a valid raceProgram', () => {
    const horses = genHorses(20)
    const raceProgram = genRaceProgram(horses.map((item) => item.id))

    expect(raceProgram).toBeValidRaceProgram()

    raceProgram.rounds.forEach((item) => {
      expect(item).toBeValidRaceRound()
    })
  })
})
