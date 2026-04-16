import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAppStore } from '@/stores/app'
import { mockHorse } from '../../helpers/mockData'

describe('AppStore Test', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('should add horse and get it using horseId', () => {
    const store = useAppStore()
    const horse = mockHorse()
    store.horses.set(horse.id, horse)

    expect(store.horses.size).toBe(1)
    expect(store.horses.get(horse.id)).toStrictEqual(horse)
  })

  it('should generate 20 horses and add them to store, all map key and value.id must be match with valid horse objects', () => {
    const store = useAppStore()

    store.generateHorses()

    expect(store.horses.size).toBe(20)
    for (const [key, value] of store.horses) {
      expect(key).toBe(value.id)
    }
    store.horses.values().forEach((item) => {
      expect(item).toBeValidHorse()
    })
  })

  it('should create a race program', () => {
    const store = useAppStore()
    store.generateHorses()
    store.addNewRaceProgram()

    expect(store.racePrograms.length).toBe(1)

    const program = store.racePrograms[0]

    expect(program.horses.length).toBe(10)
    expect(program.rounds.length).toBe(6)
  })

  it('should set active race program', () => {
    const store = useAppStore()

    store.generateHorses()
    store.addNewRaceProgram()

    const program = store.racePrograms[0]
    store.setActiveRaceProgram(program)

    expect(store.activeRaceProgram?.id).toBe(program.id)
  })

  it('should build race status from active program', () => {
    const store = useAppStore()

    store.generateHorses()
    store.addNewRaceProgram()
    store.setActiveRaceProgram(store.racePrograms[0])

    const round = store.activeRaceProgram!.rounds[0]

    store.setRaceStatus({
      roundData: round,
      totalTime: 1000,
      isStarted: true
    })

    expect(store.raceStatus.horsesData.length).toBe(store.activeRaceProgram!.horses.length)
  })

  it('should finish round and generate results', async () => {
    const store = useAppStore()

    store.generateHorses()
    store.addNewRaceProgram()
    store.setActiveRaceProgram(store.racePrograms[0])

    const round = store.activeRaceProgram!.rounds[0]

    store.setRaceStatus({
      roundData: round,
      totalTime: 300,
      isStarted: true
    })

    await store.startRound()

    expect(round.results.length).toBe(10)
    expect(store.raceStatus.horsesData.length).toBe(10)
  })

  it('should complete full race and mark program done', async () => {
    const store = useAppStore()

    vi.useFakeTimers()

    store.generateHorses()
    store.addNewRaceProgram()

    const program = store.racePrograms[0]
    store.setActiveRaceProgram(program)

    const promise = store.startRace()

    await vi.runAllTimersAsync()

    await promise

    expect(store.racePrograms[0].isDone).toBe(true)
    expect(store.raceStatus.isStarted).toBe(false)

    // check if 10 horses contributed in race and their race rate is 6 (6 rounds of race)
    let horsesContributed = 0
    store.horses.forEach((item) => {
      if (item.races === 6) horsesContributed++
    })
    expect(horsesContributed).toBe(10)

    // check raceRoundResults
    store.racePrograms.forEach((item) => {
      item.rounds.forEach((round) => {
        expect(round.results.length).toBe(10)
      })
    })

    vi.useRealTimers()
  })

  it('should stop race and restore horses and programs from backup', () => {
    const store = useAppStore()

    // 1. setup initial data
    store.generateHorses()
    store.addNewRaceProgram()
    store.raceStatus.isStarted = true

    // keep original data
    const originalHorses = JSON.parse(JSON.stringify(Array.from(store.horses.values())))
    const originalPrograms = JSON.parse(JSON.stringify(store.racePrograms))

    // get backup
    store.getBackup()

    // mutate state (simulate race changes)
    const horse = originalHorses[0]
    const horseRef = store.horses.get(horse.id)!

    // check first horse item wins before mutation
    expect(store.horses.get(horse.id)?.wins).toBe(0)

    horseRef.wins += 4
    horseRef.races += 12

    // check first horse item wins after mutation
    expect(store.horses.get(horse.id)?.wins).toBe(4)

    store.racePrograms[0].rounds[0].isDone = true

    // call stop function
    store.stopRace()

    // check first horse item wins after race stop
    expect(store.horses.get(horse.id)?.wins).toBe(0)

    // check if other backups have been replaced
    expect(store.horses.size).toBe(originalHorses.length)
    const restoredHorse = store.horses.get(horse.id)
    expect(restoredHorse?.wins).toBe(horse.wins)
    expect(restoredHorse?.races).toBe(horse.races)

    expect(store.racePrograms.length).toBe(originalPrograms.length)
    expect(store.racePrograms[0].rounds[0].isDone).toBe(false)
    expect(store.raceStatus.isStarted).toBe(false)
  })
})
