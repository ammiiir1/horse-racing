/* eslint-disable @typescript-eslint/no-explicit-any */
import 'vitest'

declare module 'vitest' {
  interface Assertion<T = any> {
    toBeValidHorse(): T
    toBeValidRaceRound(): T
    toBeValidRaceProgram(): T
  }
}
