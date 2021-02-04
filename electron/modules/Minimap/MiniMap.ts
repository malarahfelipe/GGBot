import { Observable, Subject, interval, BehaviorSubject } from 'rxjs'
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

  static getCentralMiniMapImage(): Bitmap {
    const { startsAt: { x, y } } = this.getInfo()
    return screen.capture(x + 47, y + 47, 12, 12)
  }

  static getMiniMapImage(): Bitmap {
    const { startsAt: { x, y }, width: mapWidth, height: mapHeight } = this.getInfo()
    return screen.capture(x, y, mapWidth, mapHeight)
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

  async screenShotCentralPositionInMinimap(): Promise<string> {
    const bitmap = MiniMap.getCentralMiniMapImage()
    const centralMiniMapPath = `${ imgDir() }/miniMapCentral.png`
    await writeImageFromBitmap(bitmap, centralMiniMapPath)
    return centralMiniMapPath
  }

  async screenShotMiniMap(): Promise<string> {
    const bitmap = MiniMap.getMiniMapImage()
    const miniMapPath = `${ imgDir() }/miniMap.png`
    await writeImageFromBitmap(bitmap, miniMapPath)
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

  async hasReachedAlpha(alpha: Alpha): Promise<boolean> {
    const minimapCentralImagePath = await this.screenShotCentralPositionInMinimap()
    const imagePath = this.getImage(`${ alpha }.png`)
    const { x, y } = await find(imagePath, minimapCentralImagePath)
    console.log('result', { x, y })
    return x > 0 && y > 0
  }

  async goTo(alpha: Alpha): Promise<BehaviorSubject<boolean>> {
    const position = await this.getAlphaPositionInMinimap(alpha)
    console.log('result', position)
    const { startsAt } = MiniMap.getInfo()
    const { x, y } = { x: startsAt.x + position.x, y: startsAt.y + position.y }
    moveMouse(x, y)
    mouseClick()
    const onReachSubject = new BehaviorSubject<boolean>(false)
    const onReachInterval = setTimeout(async () => {
      const reach = await this.hasReachedAlpha(alpha).catch(() => false)
      onReachSubject.next(reach)
    }, 650)
    onReachSubject.subscribe({
      next: (reach) => {
        if (reach) {
          clearInterval(onReachInterval)
          onReachSubject.complete()
        }
      }
    })
    return onReachSubject
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
