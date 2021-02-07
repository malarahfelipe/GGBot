import { ActionAlpha, ActionWalk } from './ActionAlpha'

export interface CavebotConfig {
  actions: ActionAlpha[]
  goOutPath: ActionAlpha[]
}
