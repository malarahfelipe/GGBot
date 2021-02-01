import { getPixelColor } from 'robotjs'
import { BarInfo, Utils } from '../../common/models/Utils'

export abstract class PlayerScreen {
  private static getCurrentColor(x = 0, y = 0) {
    return getPixelColor(x, y)
  }

  private static isBelow(percentage = 0, info: BarInfo) {
    const { filledColor, startsAt: { x, y } } = info
    const currentColor = this.getCurrentColor(x + percentage, y)
    return filledColor !== currentColor
  }

  public static isHealthBelow(percentage = 0) {
    return this.isBelow(percentage, Utils.getHealthInfo())
  }

  public static isManaBelow(percentage = 0) {
    return this.isBelow(percentage, Utils.getManaInfo())
  }
}
