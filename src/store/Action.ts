import { ACTION } from '../../common/models/Actions'
import { BaseStore } from './Base.store'

export abstract class ActionHandler extends BaseStore {
  static call(action: ACTION): Promise<void> {
    return BaseStore.invoke(action)
  }
}
