import { Profission } from '../../electron/models/Profission'
import { ActionAlpha, ActionWalk } from './ActionAlpha'

export interface CavebotConfig {
  id: string
  name: string
  profission: Profission
  actions: ActionAlpha[]
  goOutPath: ActionWalk[]
}
