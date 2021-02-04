import * as cv from 'opencv4nodejs'
import { resolve } from 'path'
import { tmpdir } from 'os'
import Jimp from 'jimp'
import { Position } from '../../common/models/Utils'
import { Bitmap, screen } from 'robotjs'
const { recognize } = require('node-tesseract-ocr')

export const imgDir = (): string => `${ tmpdir() }/GGBot`

export const find = async (filePath: string, templatePath: string): Promise<Position> => {
  // Load images
  const waldoMat = await cv.imreadAsync(filePath)
  const originalMat = await cv.imreadAsync(templatePath)

  // Match template (the brightest locations indicate the highest match)
  const matched = originalMat.matchTemplate(waldoMat, 5)

  // Use minMaxLoc to locate the highest value (or lower, depending of the type of matching method)
  const minMax = matched.minMaxLoc()
  const { maxLoc: { x, y } } = minMax
  return { x, y }
}

export const writeImageFromBitmap = async (screenPic: Bitmap, path: string): Promise<Jimp> => {
  try {
    const image = new Jimp(screenPic.width, screenPic.height)
    let pos = 0
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
      image.bitmap.data[idx + 2] = screenPic.image.readUInt8(pos++)
      image.bitmap.data[idx + 1] = screenPic.image.readUInt8(pos++)
      image.bitmap.data[idx + 0] = screenPic.image.readUInt8(pos++)
      image.bitmap.data[idx + 3] = screenPic.image.readUInt8(pos++)
    })
    return image.writeAsync(path)
  } catch (e) {
    console.error(e)
    throw new Error(`WriteImageError: ${ (e && e.message) || '' }`)
  }
}

export const writeImage = async (data = Buffer.from(''), fileName = ''): Promise<Jimp> =>
  Jimp.read(data)
    .then(image => image.writeAsync(fileName))

export const getImageBase64 = async (data = Buffer.from('')): Promise<string> =>
  Jimp.read(data)
    .then(image =>
      image.getBase64Async(Jimp.MIME_PNG)
    )

export const readBitmapData = async (fileName = ''): Promise<Buffer> =>
  (await Jimp.read(fileName)).bitmap.data

export const readTextInImage = async (fileName = ''): Promise<string> =>
  recognize(fileName, { psm: 7 })

export const getAssetPath = (imageName: string): string => {
  console.log('imageAssetPath', resolve(__dirname, '..', 'assets', `${ imageName }.png`))
  return resolve(__dirname, '..', 'assets', `${ imageName }.png`)
}

export const getAssetPositionOnScreen = async (imageName: string): Promise<Position> => {
  const bitmap = screen.capture()
  const templatePath = `${ imgDir() }/screen-${ imageName }.png`
  await writeImageFromBitmap(bitmap, templatePath)
  const imagePath = getAssetPath(imageName)
  return find(imagePath, templatePath)
}
