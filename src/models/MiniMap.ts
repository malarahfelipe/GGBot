import { Bitmap, getPixelColor, mouseClick, moveMouse, screen } from 'robotjs'
import { imgDir, Position, Utils } from './Utils'
import { parseFile } from 'pngparse'
import { readFileSync } from 'fs'
import cv from 'opencv4nodejs'
import { getImageBase64, readBitmapData, readTextInImage, screenCaptureToFile2, writeImage } from './Image'

const find = async (templatePath = '', subImagePath = ''): Promise<Position> => {
  // Load images
  const originalMat = await cv.imreadAsync(templatePath, 1);
  const subMat = await cv.imreadAsync(subImagePath, 1);

  // Match template (the brightest locations indicate the highest match)
  const matched = originalMat.matchTemplate(subMat, 5);
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
    const { startsAt: { x: miniMapX, y: miniMapY } } = MiniMap.getInfo()
    await screenCaptureToFile2(MiniMap.getMiniMapImage(), `${imgDir}\\miniMap.png`)
    const { x, y } = await find(
      `${imgDir}\\miniMap.png`,
      `${__dirname}\\${Utils.getAlphabet()[position]}.png`,
    )
    moveMouse(miniMapX+x, miniMapY+y)
    mouseClick()
  }

}
