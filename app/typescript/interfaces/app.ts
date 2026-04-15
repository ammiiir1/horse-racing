export interface IHorse {
  id: ReturnType<typeof crypto.randomUUID>
  name: string
  /** condition: 1-100 */
  condition: number
  /** color: any valid css color */
  color: string
  races?: number
  wins?: number
}

export interface IRaceRound {
  id: ReturnType<typeof crypto.randomUUID>
  /** round: 1-6 */
  round: number
  /** length: 1200, 1400, 1600, 1800, 2000, 2200 */
  length: number 
  isDone: boolean
  startTime: number
  finishTime: number
  results: {
    horseId: ReturnType<typeof crypto.randomUUID>
    time: number
    position: number
  }[]
}
export interface IRaceProgram {
  id: ReturnType<typeof crypto.randomUUID>
  createdAt: number
  finishedAt: number
  /** horses: 10 horses */
  horses: IHorse[]
  /** rounds: an Array of 6 rounds */
  rounds: IRaceRound[]
  isDone: boolean
  winner?: ReturnType<typeof crypto.randomUUID>
}