import { Observable, Subject, interval } from 'rxjs'
import { moveMouse, screen, Bitmap, mouseClick } from 'robotjs'
import { Position, Alpha } from '../../../common/models/Utils'
import { find, imgDir, writeImageFromBitmap } from '../../models/Image'
import { resolve } from 'path'
import { Screen } from '../Screen/Screen'
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
    const { x, y } = Screen.getInstance().getHiggsPosition()
    return {
      startsAt: {
        x: x + 1127,
        y: y + 5
      },
      width: 105,
      height: 108
    }
  }

  async screenShotMiniMap(): Promise<string> {
    const bitmap = MiniMap.getMiniMapImage()
    const miniMapPath = `${ imgDir() }/miniMap.png`
    console.log('screenShotMiniMap.miniMapPath', miniMapPath)
    await writeImageFromBitmap(bitmap, miniMapPath)
    console.log('writed down image')
    return miniMapPath
  }

  getImage(imageName: string): string {
    return resolve(__dirname, '..', 'assets', imageName)
  }

  private async getPositionInMinimap(imageName: string): Promise<Position> {
    const miniMapPath = await this.screenShotMiniMap()
    const imagePath = this.getImage(imageName)
    const result = await find(imagePath, miniMapPath)
    return result
  }

  async getAlphaPositionInMinimap(alpha: Alpha): Promise<Position> {
    return this.getPositionInMinimap(`${ alpha }.png`)
  }

  async getMarkPositionInMinimap(): Promise<Position> {
    return this.getPositionInMinimap('Mark.png')
  }

  async getLocationPositionInMinimap(): Promise<Position> {
    return this.getPositionInMinimap('Location.png')
  }

  async goTo(alpha: Alpha): Promise<void> {
    const position = await this.getAlphaPositionInMinimap(alpha)
    console.log('result', position)
    const { startsAt } = MiniMap.getInfo()
    const { x, y } = { x: startsAt.x + position.x, y: startsAt.y + position.y }
    moveMouse(x, y)
    mouseClick()
    // const onReachObservable = new Observable(observer => {
    //   const checkReachInterval = setInterval(async () => {
    //     await this.get
    //   }, 150)
    //   return () => clearInterval(checkReachInterval)
    // })
    // checkReachInterval.subscribe(subscription => {
    //   next: () =>
    // })
    // const onReachSubject = new Subject()
    // onReachSubject.
    // onReachSubject
  }
}
