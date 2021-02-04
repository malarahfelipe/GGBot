import { SCREEN_ACTIONS } from '../../common/models/ScreenActions.enum'
import { BaseStore } from './Base.store'

export class ScreenStore extends BaseStore {
  private static instance: ScreenStore

  private constructor() {
    super()
  }

  static async getInstance(): Promise<ScreenStore> {
    if (!this.instance) this.instance = new ScreenStore()
    return this.instance
  }

  screenShotHiggsPosition(): Promise<Position> {
    return this.invoke(SCREEN_ACTIONS.screenShotHiggsPosition)
  }
}
