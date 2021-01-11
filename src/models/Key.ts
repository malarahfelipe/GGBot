import { getPixelColor, screen } from 'robotjs'
import { readTextInImage, writeImage } from './Image'
import { imgDir, Position, Utils } from "./Utils"

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
  static getPositionFromKey(key: Key = 'f1') {
    return {
      y: f1.startsAt.y,
      x: f1.startsAt.x + ( ( Number(key.split('f').pop()) - 1 ) * Utils.getHotkeyInfo().hotkeyPixelsDistance )
    }
  }

  static async getKeyStackAmount(key: Key = 'f1') {
    const { x } = this.getPositionFromKey(key)
    const width = Utils.getHotkeyInfo().hotkeyPixelsWidth
    const height = 8
    const { image } = screen.capture(x, 604, width, height)
    const fileName = `${imgDir}\\${key}.png`
    console.log('fileName', `${imgDir}\\${key}.png`)
    return writeImage(image, fileName, width, height)
      .then(async() => {
        const rawAmount = await readTextInImage(fileName)
        const keyAmount = Number(rawAmount.replace(/.*?(\d+).*?$/m, '$1'))
        return keyAmount
      })
  }


  static getPixelColorFromPosition ({ x, y }: Position) {
    return getPixelColor(x, y)
  }

  static isKeyStackEmpty(key: Key = 'f1') {
    return this.getPixelColorFromPosition(
      this.getPositionFromKey(key)
    ) === Utils.getStackInfo().emptyColor
  }

}
