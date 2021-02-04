import { getAssetPositionOnScreen } from '../../models/Image'
import { Position } from '../../../common/models/Utils'

export class Screen {
  private higgsPosition: Position = null
  private static instance: Screen
  private constructor() { }

  static getInstance(): Screen {
    if (!this.instance) this.instance = new Screen()
    return this.instance
  }

  public getHiggsPosition(): Position {
    if (this.higgsPosition)
      return this.higgsPosition
    else throw new Error('[Screen]: no higgs position')
  }

  public async screenShotHiggsPosition(): Promise<void> {
    const { x, y } = await getAssetPositionOnScreen('RightArrowLeftSide')
    if (x < 100 && y < 100)
      this.higgsPosition = { x, y }
  }
}
