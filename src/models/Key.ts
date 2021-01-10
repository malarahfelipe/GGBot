import { screen } from 'robotjs'
import { readImage, writeImage } from './Image'
import { Utils } from "./Utils"

export type Key = 'f1' | 'f2' | 'f3' | 'f4' | 'f5' | 'f6' | 'f7' | 'f8' | 'f9' | 'f10' | 'f11' | 'f12'
export interface StackKey {
  key: Key,
  min: number
}
export abstract class KeyScreen {

  static getKeyStackAmount = async (key = 'f1') => {
    const { x } = getPositionFromKey(key)
    const width = Utils.getHotkeyInfo().hotkeyPixelsWidth
    const height = 8
    const { image } = screen.capture(x, 604, width, height)
    const fileName = `${tmpDir}\\${key}.png`
    console.log('fileName', `${tmpDir}\\${key}.png`)
    return writeImage(image, fileName, width, height)
      .then(async() => {
        const rawAmount = await readImage(fileName)
        const keyAmount = Number(rawAmount.replace(/.*?(\d+).*?$/m, '$1'))
        return keyAmount
      })
  }

}