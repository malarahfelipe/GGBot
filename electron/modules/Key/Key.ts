import { getPixelColor, screen, setKeyboardDelay, keyTap } from 'robotjs'
import { readTextInImage, writeImage, imgDir } from '../../models/Image'
import { Position, Utils, FullPosition } from '../../../common/models/Utils'
import { Key, FKey } from '../../../common/models/Key'
import { throttle } from 'lodash'
import { Screen } from '../Screen/Screen'

export interface SupportKey {
  check: () => boolean,
  action: () => void,
  // in ms
  every: number
}
export class KeyScreen {
  private static instance: KeyScreen
  private lastKeyPressed: Key

  private constructor() { }

  public static getInstance(): KeyScreen {
    if (!this.instance) this.instance = new KeyScreen()
    return this.instance
  }

  private keyPresser = throttle(({ key }: Key) => keyTap(key), 1500)

  public keyPress(key: Key): void {
    const exhaust = 1250
    this.lastKeyPressed = key
    this.keyPresser(key)
  }

  static getFirstHotkeyPosition(): { f1: FullPosition } {
    const { x, y } = Screen.getInstance().getHiggsPosition()
    return {
      f1: {
        startsAt: {
          x: x + 20,
          y: y + 517
        }
      }
    }
  }

  static getPositionFromKey(key: FKey = 'f1'): Position {
    const { f1: { startsAt: { x, y } } } = this.getFirstHotkeyPosition()
    return {
      y: y,
      x: x + ((Number(key.split('f').pop()) - 1) * Utils.getHotkeyInfo().hotkeyPixelsDistance)
    }
  }

  static async getKeyStackAmount(key: FKey = 'f1'): Promise<number> {
    const { x, y } = this.getPositionFromKey(key)
    const { hotkeyPixelsSize } = Utils.getHotkeyInfo()
    const height = 8
    const startingY = y + hotkeyPixelsSize - height
    const { image } = screen.capture(x, startingY, hotkeyPixelsSize, height)
    const fileName = `${ imgDir() }\\${ key }.png`
    console.log('fileName', `${ imgDir() }\\${ key }.png`)
    return writeImage(image, fileName)
      .then(async () => {
        const rawAmount = await readTextInImage(fileName)
        const keyAmount = Number(rawAmount.replace(/.*?(\d+).*?$/m, '$1'))
        return keyAmount
      })
  }

  static getPixelColorFromPosition({ x, y }: Position): string {
    return getPixelColor(x, y)
  }

  static isKeyStackEmpty(key: FKey = 'f1'): boolean {
    return this.getPixelColorFromPosition(
      this.getPositionFromKey(key)
    ) === Utils.getStackInfo().emptyColor
  }
}
