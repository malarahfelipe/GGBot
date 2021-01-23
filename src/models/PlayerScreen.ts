import * as robot from 'robotjs'
import { BarInfo, Position, Utils } from './Utils';

export  class PlayerScreen {

  private static getCurrentColor(x: number = 0, y: number = 0) {
    return robot.getPixelColor(x, y)
  }

  private static isBelow(percentage: number = 0, info: BarInfo) {
    const { filledColor, startsAt: { x, y }} = info
    const currentColor = this.getCurrentColor(x + percentage, y)
    return filledColor !== currentColor
  }

  public static isHealthBelow(percentage: number = 0) {
    return this.isBelow(percentage, Utils.getHealthInfo())
  }

  public static isManaBelow(percentage: number = 0) {
    return this.isBelow(percentage, Utils.getManaInfo())
  }

  private static instance: PlayerScreen
  private position: Position
  private constructor() {
                    //TODO: remove hardcoded position
    this.position = { x: 625, y: 295 }
  }
  public static getInstance(): PlayerScreen {
    if (!this.instance)
      this.instance = new PlayerScreen()
    return this.instance
  }

  public getPosition() {
    return this.position
  }
}
