import { getPixelColor, screen } from 'robotjs'
import { readTextInImage, writeImage, imgDir } from './Image'
import { Position, Utils } from '../../common/Utils'

export type Key = 'f1' | 'f2' | 'f3' | 'f4' | 'f5' | 'f6' | 'f7' | 'f8' | 'f9' | 'f10' | 'f11' | 'f12'
export interface SupportKey {
  check: () => boolean,
  action: () => void,
  // in ms
  every: number
}
export interface StackKey {
  key: Key,
  min: number
}
export abstract class KeyScreen {
  static getPositionFromKey(key: Key = 'f1'): Position {
    const { f1 } = Utils.getHotkeyInfo()
    return {
      y: f1.startsAt.y,
      x: f1.startsAt.x + ((Number(key.split('f').pop()) - 1) * Utils.getHotkeyInfo().hotkeyPixelsDistance)
    }
  }

  static async getKeyStackAmount(key: Key = 'f1'): Promise<number> {
    const { x } = this.getPositionFromKey(key)
    const width = Utils.getHotkeyInfo().hotkeyPixelsWidth
    const height = 8
    const { image } = screen.capture(x, 604, width, height)
    const fileName = `${ imgDir }\\${ key }.png`
    console.log('fileName', `${ imgDir }\\${ key }.png`)
    return writeImage(image, fileName, width, height)
      .then(async () => {
        const rawAmount = await readTextInImage(fileName)
        const keyAmount = Number(rawAmount.replace(/.*?(\d+).*?$/m, '$1'))
        return keyAmount
      })
  }

  static getPixelColorFromPosition({ x, y }: Position): string {
    return getPixelColor(x, y)
  }

  static isKeyStackEmpty(key: Key = 'f1'): boolean {
    return this.getPixelColorFromPosition(
      this.getPositionFromKey(key)
    ) === Utils.getStackInfo().emptyColor
  }
}
