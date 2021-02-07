import { Alpha } from './Utils'
import { Action } from './Actions'

export interface ActionAlpha {
  alpha: Alpha,
  action?: Action
}

export interface ActionWalk {
  alpha: Alpha,
}

export const createActionAlpha = (alpha: Alpha): ActionAlpha =>
  ({ alpha, action: { name: 'Andar' } })
