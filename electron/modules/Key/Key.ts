import { getPixelColor, screen, setKeyboardDelay, keyTap, moveMouse, mouseClick } from 'robotjs'
import { readTextInImage, writeImage, imgDir } from '../../models/Image'
import { Position, Utils, FullPosition } from '../../../common/models/Utils'
import { Key, FKey, KeyStatus } from '../../../common/models/Key'
import { throttle } from 'lodash'
import { Screen } from '../Screen/Screen'

export type KeyPressingStatus = KeyStatus & {
  done?: boolean
}
export interface SupportKey {
  check: () => boolean,
  action: () => void,
  // in ms
  every: number
}

const MAX_KEYS_IN_QUEUE = 8
export class KeyScreen {
  private static instance: KeyScreen
  private lastKeyPressed: Key
  private queue: KeyPressingStatus[] = []

  private constructor() {
    setInterval(() => {
      if (this.queue.length >= MAX_KEYS_IN_QUEUE)
        this.queue.splice(0, MAX_KEYS_IN_QUEUE)
    }, 3000)
    setInterval(() => this.queue.slice(0, MAX_KEYS_IN_QUEUE).forEach(this.keyToucher), 150)
  }

  public static getInstance(): KeyScreen {
    if (!this.instance) this.instance = new KeyScreen()
    return this.instance
  }

  private keyPresser = throttle(({ key }: Key) => keyTap(key), 550)

  private keyToucher = throttle(({ key }: Key) => {
    const { x, y } = KeyScreen.getPositionFromKey(key)
    moveMouse(x, y)
    mouseClick()
    this.queue.shift()
  }, 250)

  addToQueue(key: KeyStatus): void {
    this.queue = [ ...this.queue ].concat(key).sort((a, b) => b.priority - a.priority)
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
