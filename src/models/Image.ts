import Jimp from "jimp"
import { recognize } from "node-tesseract-ocr"

export const writeImage = async(data = Buffer.from(''), fileName = '', width = 0, height = 0) =>
  new Promise((resolve, reject) =>
    new Jimp({ data, width, height }, (err, image) => {
      if (err) return reject(err)
      image.write(fileName)
      resolve(void 0)
    })
  )
export const readImage = async(fileName) =>
  recognize(fileName, { psm: 7 })
