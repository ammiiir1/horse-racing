import 'vitest'

declare module 'vitest' {
  interface Assertion<T = any> {
    toBeValidHorse(): T
    toBeValidRaceRound(): T
    toBeValidRaceProgram(): T
  }
}
