import { StartPosition } from '../../../common/models/Utils'
import { Screen } from '../Screen/Screen'

export class Healer {
  private static instance: Healer
  private constructor() { }

  static getInstance(): Healer {
    if (!this.instance) this.instance = new Healer()
    return this.instance
  }

  public initialize(): Healer {
    return this
  }

  static getLifePosition(): StartPosition {
    const { x, y } = Screen.getInstance().getHiggsPosition()
    return {
      startsAt: {
        x: x + 1139,
        y: y + 285
      }
    }
  }

  static getManaPosition(): StartPosition {
    const { x, y } = Screen.getInstance().getHiggsPosition()
    return {
      startsAt: {
        x: x + 1139,
        y: y + 298
      }
    }
  }
}
