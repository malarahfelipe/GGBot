
import { moveMouse, screen, Bitmap, mouseClick } from 'robotjs'
import { Position, Alpha } from '../../common/Utils'
import { find, imgDir, writeImageFromBitmap } from './Image'
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
        x: 700,
        y: 28
        /*
        x: 1199,
        y: 28
        */
      },
      width: 600,
      height: 700
    }
  }

  async goTo(alpha: Alpha): Promise<Position> {
    const bitmap = MiniMap.getMiniMapImage()
    const miniMapPath = `${imgDir}/miniMap.png`
    await writeImageFromBitmap(bitmap, miniMapPath)
    console.log('imgDir', imgDir)
    const alphaPath = resolve(__dirname, '..', 'assets', `${alpha}.png`)
    console.log('miniMapPath', miniMapPath)
    console.log('alphaPath', alphaPath)
    const result = await find(alphaPath, miniMapPath)
    console.log('result', result)
    const { startsAt } = MiniMap.getInfo()
    const { x, y } = { x: startsAt.x + result.x, y: startsAt.y + result.y }
    moveMouse(x, y)
    mouseClick()
    return result
    /*
    const b64FromPosition = await getImageBase64(wpPosition, 7, 7)
    const pixelColor = getPixelColor(1248, 77)
    const
    return
    for (let indexColumn = 0; indexColumn < wpsCountColumn; indexColumn++) {
      console.log('indexColumn', indexColumn)
      for (let indexRow = 0; indexRow < wpsCountRow; indexRow++) {
    console.log('pixelColor', pixelColor)
    console.time()
    for (let indexColumn = 62; indexColumn < wpsCountColumn; indexColumn++) {
      console.log('indexColumn', indexColumn)
      for (let indexRow = 0; indexRow < wpsCountRow; indexRow++) {
        const xWp = x + indexRow
        const yWp = y + indexColumn
        const { image } = screen.capture(xWp, yWp, MiniMap.WP_IMAGE_SIZE, MiniMap.WP_IMAGE_SIZE)
        const b64FromScreenShoot = await getImageBase64(image, MiniMap.WP_IMAGE_SIZE, MiniMap.WP_IMAGE_SIZE)
        if (indexColumn === 0 && indexRow === 0)
          console.log('b64FromScreenShoot no 0', b64FromScreenShoot)
        if (indexColumn === 65 && indexRow === 62)
          console.log('b64FromScreenShoot', b64FromScreenShoot)
        if (b64FromPosition !== b64FromScreenShoot) continue;

        console.timeEnd('Found wp')
        moveMouse(xWp, yWp)
        mouseClick()
      }
    }

    const startMinimap = screen.capture(1199, 28, 1304 - 1199, 136 - 28)
    return Promise.all(
      Utils.getAlphabet().map(async file =>
        new Promise<Buffer>((resolve, reject) =>
          parseFile(`${__dirname}\\${file}.png`, (err, image) => {
            if (err) return reject(err)
            else return resolve(image)
          })
        )
      )
    ) */
  }
}
