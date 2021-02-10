import { FullPosition, BarInfo } from '../../../common/models/Utils'
import { Screen } from '../Screen/Screen'
import { ConfigModule } from '../Config/Config'
import { HealerConfig } from '../../../common/models/HealerConfig'
import { keyTap, getPixelColor } from 'robotjs'
import { KeyScreen } from '../Key/Key'
import { throttle, memoize } from 'lodash'
import { Key } from '../../../common/models/Key'
export class Healer {
  private static readonly BAR_SIZE_PX = 91
  private keyScreenInstance: KeyScreen
  private static instance: Healer
  private config: HealerConfig
  private healersInterval: number[] = []
  private constructor() { }

  static async getInstance(): Promise<Healer> {
    if (!this.instance) this.instance = await new Healer().initialize()
    return this.instance
  }

  public async initialize(): Promise<Healer> {
    const configInstance = await ConfigModule.getInstance()
    configInstance
      .getConfig()
      .subscribe(({ healer }) => { this.config = healer })
    return this
  }

  private static getPixelsFromPercentage(percentage = 0) {
    return percentage / 100 * this.BAR_SIZE_PX
  }

  private static isBelow(percentage = 0, barInfo: BarInfo, startInfo: FullPosition) {
    const { startsAt: { x, y } } = startInfo
    const { filledColor } = barInfo
    const xPosition = Math.floor(x + this.getPixelsFromPercentage(percentage))
    const currentColor = getPixelColor(xPosition, y)
    return filledColor !== currentColor
  }

  public static isLifeBelow(percentage = 0): boolean {
    return this.isBelow(percentage, this.getLifeInfo(), this.getLifePosition())
  }

  public static isManaBelow(percentage = 0): boolean {
    return this.isBelow(percentage, this.getManaInfo(), this.getManaPosition())
  }

  private checkAndRestore() {
    this.config.configs.forEach(({ every, percentage, key, type }, index) => {
      this.healersInterval[index] = setInterval(() => {
        if (
          (type === 'mana' && Healer.isManaBelow(percentage)) ||
          (type === 'life' && Healer.isLifeBelow(percentage))
        )
          this.keyScreenInstance.keyPress(key)
      }, every)
    })
  }

  public start(): void {
    if (!this.config) return
    this.keyScreenInstance = KeyScreen.getInstance()
    this.stop()
    this.checkAndRestore()
    setTimeout(() => this.stop(), 10000)
  }

  public stop(): void {
    if (this.healersInterval.length)
      this.healersInterval.forEach(clearInterval)
  }

  static getLifePosition(): FullPosition {
    const { x, y } = Screen.getInstance().getHiggsPosition()
    return {
      startsAt: {
        x: x + 1141,
        y: y + 285
      }
    }
  }

  static getManaPosition(): FullPosition {
    const { x, y } = Screen.getInstance().getHiggsPosition()
    return {
      startsAt: {
        x: x + 1141,
        y: y + 298
      }
    }
  }

  public static getLifeInfo(): BarInfo {
    return {
      filledColor: 'db4f4f',
      emptyColor: ''
    }
  }

  public static getManaInfo(): BarInfo {
    return {
      filledColor: '5350da',
      emptyColor: ''
    }
  }
}
