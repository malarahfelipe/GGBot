import { Alpha } from './Utils'
import { ACTIONS } from './Actions.enum'
import { Action } from './Actions'

export interface ActionAlpha {
  alpha: Alpha,
  action: Action
}

export interface ActionWalk {
  alpha: Alpha,
  action: Action
}

export const createActionAlpha = (alpha: Alpha): ActionAlpha =>
  ({ alpha, action: { name: 'Andar', handler: ACTIONS.goToNextWp } })
