import { CAVEBOT_ACTIONS } from './CavebotActions.enum'
import { HEALER_ACTIONS } from './HealerActions.enum'

export const ACTIONS = Object.freeze(
  Object.assign({},
    CAVEBOT_ACTIONS,
    HEALER_ACTIONS
  )
)

export const CREATE_ACTIONS = (targetName: string): string[] =>
  [
    'get',
    'set',
    'listen',
    'listen_all'
  ].map(action =>
    `${ targetName }_${ action }`
  )
