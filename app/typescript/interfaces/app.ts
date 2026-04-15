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
