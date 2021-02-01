import * as cv from 'opencv4nodejs'
import { tmpdir } from 'os'
import Jimp from 'jimp'
import { Position } from '../../common/models/Utils'
import { Bitmap } from 'robotjs'
const { recognize } = require('node-tesseract-ocr')

export const imgDir = `${ tmpdir() }/GGBot`

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

export const getJimpImage = async (data = Buffer.from(''), width = 0, height = 0) =>
  new Promise<Jimp>((resolve, reject) =>
    new Jimp({ data, width, height }, (err, image) => {
      if (err) return reject(err)
      resolve(image)
    })
  )

export const writeImageFromBitmap = (screenPic: Bitmap, path: string) =>
  new Promise<Jimp>((resolve, reject) => {
    try {
      const image = new Jimp(screenPic.width, screenPic.height)
      let pos = 0
      image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
        image.bitmap.data[idx + 2] = screenPic.image.readUInt8(pos++)
        image.bitmap.data[idx + 1] = screenPic.image.readUInt8(pos++)
        image.bitmap.data[idx + 0] = screenPic.image.readUInt8(pos++)
        image.bitmap.data[idx + 3] = screenPic.image.readUInt8(pos++)
      })
      image.write(path, (err, value) => {
        if (err) return reject(err)
        else return resolve(value)
      })
    } catch (e) {
      console.error(e)
      reject(e)
    }
  })

export const writeImage = async (data = Buffer.from(''), fileName = '', width = 0, height = 0) =>
  getJimpImage(data, width, height)
    .then(image => image.write(fileName))

export const getImageBase64 = async (data = Buffer.from(''), width = 0, height = 0) =>
  new Promise<string>((resolve, reject) =>
    getJimpImage(data, width, height)
      .then(image =>
        image.getBase64(Jimp.MIME_PNG, (err, result) => {
          if (err) return reject(err)
          else return resolve(result)
        })
      )
  )

export const readBitmapData = async (fileName = '') =>
  (await Jimp.read(fileName)).bitmap.data

export const readTextInImage = async (fileName = '') =>
  recognize(fileName, { psm: 7 })
