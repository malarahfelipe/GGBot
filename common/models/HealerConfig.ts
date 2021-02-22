import { Key } from './Key'

export type HealCommonConfig = {
  percentage: number
  key: Key
  type: 'mana' | 'life'
}

export type HealLifeConfig = HealCommonConfig & {
  type: 'life'
}

export type HealManaConfig = HealCommonConfig & {
  type: 'mana'
}

export type HealConfig = (HealManaConfig | HealLifeConfig) & {
  every: number
  priority: number
}

export interface HealerConfig {
  configs: HealConfig[]
}
