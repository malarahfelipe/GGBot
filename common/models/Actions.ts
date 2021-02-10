import { ACTIONS } from './Actions.enum'
import { FKey } from './Key'

export type ACTION = typeof ACTIONS[keyof typeof ACTIONS]

export type AvailableAction = 'Andar' | 'Checar supply' | 'Refilar mana'

export type ChecarSupplyValue = {
  minCap: number
  keys: Array<{ key: FKey, value: number }>
}
export type RefilarManaValue = {
  mana: number
}
export type ValueKeyed<K extends string, P extends K, T = undefined> =
Record<P, { value: T }>

export type ActionKeyed =
ValueKeyed<AvailableAction, 'Andar'> &
ValueKeyed<AvailableAction, 'Checar supply', ChecarSupplyValue> &
ValueKeyed<AvailableAction, 'Refilar mana', RefilarManaValue>

export interface Action<T = any, K extends AvailableAction = 'Andar'> {
  name: K
  value?: T,
  completed?: boolean
  handler?: ACTION
}
