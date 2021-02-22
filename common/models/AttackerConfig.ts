import { Key } from './Key'
export interface AttackConfig {
  monsterAmount: number
  priority: number
  key: Key
}

export interface AttackerConfig {
  configs: AttackConfig[]
}
