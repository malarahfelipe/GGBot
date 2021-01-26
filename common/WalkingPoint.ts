import { Alpha } from './Utils'

export interface GenericWalkingPoint {
  alpha: Alpha,
  type: 'walk' | 'action'
}

export interface Action {
  name: string
  handler: () => void
}

export interface ActionWalkingPoint extends GenericWalkingPoint {
  action: Action
}

export type WalkingPoint = Partial<GenericWalkingPoint & ActionWalkingPoint>

export const createWalkingPoint = (alpha: Alpha): WalkingPoint =>
  ({ type: 'action', alpha, action: { name: '', handler: null } })
