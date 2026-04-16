import { expect } from 'vitest'
import { IHorse } from '@/typescript/interfaces/app'

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
        pass ? `Horse data matches interface` : `Horse data doesnt match interface: ${JSON.stringify(horse, null, 2)}`
    }
  }
})
