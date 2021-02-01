
import { moveMouse, screen, Bitmap, mouseClick } from 'robotjs'
import { Position, Alpha } from '../../../common/models/Utils'
import { find, imgDir, writeImageFromBitmap } from '../../models/Image'
import { resolve } from 'path'
export class MiniMap {
  private constructor() { }

  private static instance: MiniMap

  static async getInstance(): Promise<MiniMap> {
    if (!this.instance) this.instance = await new MiniMap().initialize()
    return this.instance
  }

  private async initialize(): Promise<MiniMap> {
    return this
  }

  static getMiniMapImage(): Bitmap {
    const { startsAt: { x, y }, width: mapWidth, height: mapHeight } = this.getInfo()
    return screen.capture(x, y, mapWidth, mapHeight)
    /*
    console.log('typeof data', typeof data)
    console.log('isBuffer', Buffer.isBuffer(data))
    console.log('isView', ArrayBuffer.isView(data))
    console.log('bites', data.constructor.BYTES_PER_ELEMENT)
    */
  }

  static getInfo(): { startsAt: { x: number, y: number }, width: number, height: number } {
    return {
      startsAt: {
        x: 1199,
        y: 28
        /*
        FAKE:
        x: 700,
        y: 28
        */
      },
      width: 600,
      height: 700
    }
  }

  async saveMinimapImage(): Promise<string> {
    const bitmap = MiniMap.getMiniMapImage()
    const miniMapPath = `${ imgDir }/miniMap.png`
    await writeImageFromBitmap(bitmap, miniMapPath)
    return miniMapPath
  }

  async getAlphaPositionInMinimap(alpha: Alpha): Promise<Position> {
    const miniMapPath = await this.saveMinimapImage()
    const alphaPath = resolve(__dirname, '..', 'assets', `${ alpha }.png`)
    const result = await find(alphaPath, miniMapPath)
    return result
  }

  async goTo(alpha: Alpha): Promise<void> {
    const position = await this.getAlphaPositionInMinimap(alpha)
    console.log('result', position)
    const { startsAt } = MiniMap.getInfo()
    const { x, y } = { x: startsAt.x + position.x, y: startsAt.y + position.y }
    moveMouse(x, y)
    mouseClick()
  }
}
