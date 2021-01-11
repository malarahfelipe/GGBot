import { Bitmap, getPixelColor, mouseClick, moveMouse, screen } from 'robotjs'
import { Position, Utils } from './Utils'
import { parseFile } from 'pngparse'
import { readFileSync } from 'fs'
import cv from 'opencv4nodejs'
import { getImageBase64, readBitmapData, readTextInImage, screenCaptureToFile2, writeImage } from './Image'

const find = async (templatePath = '', subImagePath = '') => {
  // Load images
  console.log('templatePath', templatePath)
  console.log('subImagePath', subImagePath)
  const originalMat = await cv.imreadAsync(templatePath, 1);
  const waldoMat = await cv.imreadAsync(subImagePath, 1);

  // Match template (the brightest locations indicate the highest match)
  const matched = originalMat.matchTemplate(waldoMat, 5);
  console.log('matched', matched)
  // Use minMaxLoc to locate the highest value (or lower, depending of the type of matching method)
  /* const minMax = matched.minMaxLoc();
  const { maxLoc: { x, y } } = minMax;

  // Draw bounding rectangle
  originalMat.drawRectangle(
    new cv.Rect(x, y, waldoMat.cols, waldoMat.rows),
    new cv.Vec3(0, 255, 0),
    2,
    cv.LINE_8
  ); */
  return matched.minMaxLoc().maxLoc
};

export class MiniMap {

  private constructor() { }

  private static instance: MiniMap
  private wpPositionsBuffer: Buffer[]

  static async getInstance(): Promise<MiniMap> {
    if (!this.instance) this.instance = await new MiniMap().initialize()
    return this.instance
  }

  private async initialize(): Promise<MiniMap> {
    this.wpPositionsBuffer = await this.getAlphabetWpsBuffer()
    return this
  }

  static readonly WP_IMAGE_SIZE: number = 7

  static getMiniMapImage(): Bitmap {
    const { startsAt: { x: mapX, y: mapY }, width: mapWidth, height: mapHeight } = this.getInfo()
    return screen.capture(mapX, mapY, mapWidth, mapHeight)
    /*
    console.log('typeof data', typeof data)
    console.log('isBuffer', Buffer.isBuffer(data))
    console.log('isView', ArrayBuffer.isView(data))
    console.log('bites', data.constructor.BYTES_PER_ELEMENT)
    */
  }

  private async getAlphabetWpsBuffer() {
    return Promise.all(
      Utils.getAlphabet().map(async file =>
        readBitmapData(`${__dirname}\\${file}.png`)
      )
    )
  }

  static getInfo() {
    return {
      startsAt: {
        x: 1199,
        y: 28
      },
      width: 105,
      height: 108
    }
  }

  static getWpPositions() {
    const { startsAt: { x, y }, width, height } = MiniMap.getInfo()
    const wpsCountRow = height - MiniMap.WP_IMAGE_SIZE
    const wpsCountColumn = width - MiniMap.WP_IMAGE_SIZE
    return new Array(wpsCountColumn)
    .fill(null)
    .flatMap((_, indexColumn) =>
      new Array(wpsCountRow)
        .fill(null)
        .map((_, indexRow) =>
          getPixelColor(x + indexRow, y + indexColumn) !== '463a32'
            ? null
            : getPixelColor(x + indexRow + 5, y + indexColumn) !== '463a32'
              ? null
              : ({
                x: x+indexRow,
                y: y+indexColumn
              })
        ).filter(i => !!i)
    ).filter(i => !!i)
  }
  async goTo(position: number = 0) {
    console.log('position')
    const { startsAt: { x: miniMapX, y: miniMapY } } = MiniMap.getInfo()
    const { image, width, height } = MiniMap.getMiniMapImage()
    await screenCaptureToFile2(MiniMap.getMiniMapImage(), `${__dirname}\\miniMap2.png`)
    await writeImage(image, `${__dirname}\\miniMap.png`, width, height)
    const { x, y } = await find(
      `${__dirname}\\miniMap2.png`,
      `${__dirname}\\${Utils.getAlphabet()[position]}.png`,
    )
    console.log('mouseMove', { x: miniMapX+x, y: miniMapY+y })
    moveMouse(miniMapX+x, miniMapY+y)
    //mouseClick()
    console.log('result', { x, y })
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
