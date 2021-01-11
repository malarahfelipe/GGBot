import { rejects } from "assert"
import Jimp from "jimp"
import { recognize } from "node-tesseract-ocr"
import { Bitmap } from "robotjs"

export const getJimpImage = async(data = Buffer.from(''), width = 0, height = 0) =>
  new Promise<Jimp>((resolve, reject) =>
    new Jimp({ data, width, height }, (err, image) => {
      if (err) return reject(err)
      resolve(image)
    })
  )

export const writeImage = async(data = Buffer.from(''), fileName = '', width = 0, height = 0) =>
  new Promise((resolve, reject) =>
    getJimpImage(data, width, height)
      .then(image =>
        image.write(fileName, (err, value) => {
          if (err) return reject(err)
          else return resolve(value)
        })
      )
  )

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

export const screenCaptureToFile2 = async (robotScreenPic: Bitmap, path: string = '') => {
  return new Promise((resolve, reject) => {
    try {
      const image = new Jimp(robotScreenPic.width, robotScreenPic.height);
      let pos = 0;
      image.scan(0, 0, image.bitmap.width, image.bitmap.height, (x, y, idx) => {
        image.bitmap.data[idx + 2] = robotScreenPic.image.readUInt8(pos++);
        image.bitmap.data[idx + 1] = robotScreenPic.image.readUInt8(pos++);
        image.bitmap.data[idx + 0] = robotScreenPic.image.readUInt8(pos++);
        image.bitmap.data[idx + 3] = robotScreenPic.image.readUInt8(pos++);
      });
      image.write(path, resolve);
    } catch (e) {
      console.error(e);
      reject(e);
    }
  });
}
