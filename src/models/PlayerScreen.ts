import { getPixelColor } from 'robotjs'
import { BarInfo, Utils } from './Utils';

export abstract class PlayerScreen {

  private static getCurrentColor(x: number = 0, y: number = 0) {
    return getPixelColor(x, y)
  }

  private static isBelow(percentage: number = 0, info: BarInfo) {
    const { filledColor, startsAt: { x, y }} = info
    const currentColor = this.getCurrentColor(x + percentage, y)
    return filledColor !== currentColor
    // Press f1.
      robot.keyTap("f1")
  }

  public static isHealthBelow(percentage: number = 0) {
    return this.isBelow(percentage, Utils.getHealthInfo())
  }

  public static isManaBelow(percentage: number = 0) {
    return this.isBelow(percentage, Utils.getManaInfo())
  }
}
