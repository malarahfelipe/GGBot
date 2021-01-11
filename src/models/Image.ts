import { rejects } from "assert"
import Jimp from "jimp"
import { recognize } from "node-tesseract-ocr"

export const getJimpImage = async(data = Buffer.from(''), width = 0, height = 0) =>
  new Promise<Jimp>((resolve, reject) =>
    new Jimp({ data, width, height }, (err, image) => {
      if (err) return reject(err)
      resolve(image)
    })
  )

export const writeImage = async(data = Buffer.from(''), fileName = '', width = 0, height = 0) =>
  getJimpImage(data, width, height)
    .then(image => image.write(fileName))

export const getImageBase64 = async(data = Buffer.from(''), width = 0, height = 0) =>
  new Promise<string>((resolve, reject) =>
    getJimpImage(data, width, height)
      .then(image =>
        image.getBase64(Jimp.MIME_PNG, (err, result) => {
          if (err) return reject(err)
          else return resolve(result)
        })
      )
  )

export const readBitmapData = async(fileName: string = '') =>
  (await Jimp.read(fileName)).bitmap.data

export const readTextInImage = async(fileName: string = '') =>
  recognize(fileName, { psm: 7 })
