const robot = require("robotjs")
const pngParse = require('pngparse')
const Jimp = require('jimp')
const imageSearch = require('matches-subimage/src')
const tesseract = require("node-tesseract-ocr")
const os = require('os')
const { fstat } = require("fs")
const { resolve } = require("path")
const tmpDir = `${os.tmpdir()}\\GoodBot`

const healthInfo = {
  filledColor: 'c04040',
  emptyColor: '623234',
  startsAt: {
    x: 1210,
    y: 146
  }
}
const manaInfo = {
  filledColor: '7471ff',
  emptyColor: '623234',
  startsAt: {
    x: 1210,
    y: 162
  }
}
const charInfo = {
  hp: 2045,
  mana: 2830
}
const stack = {
  emptyColor: '363636'
}
const hotkeyPixelsWidth = 31
const hotkeyPixelsDistance = 36
const f1 = {
  startsAt: {
    x: 85,
    y: 581
  }
}
const stackKeys = [
  {
    key: 'f3',
    min: 80,
  },
  {
    key: 'f5',
    min: 50
  },
  {
    key: 'f7',
    min: 100
  },
]
const minHealth = 80
const miniMapWps = [
  'A', 'B', 'C', 'D', 'E', 'F'
]
const wpStepsBuffers = []
let currentStep = -1

const getPositionFromKey = (key = 'f1') =>
  ({
    y: f1.startsAt.y,
    x: f1.startsAt.x + ( ( Number(key.split('f').pop()) - 1 ) * hotkeyPixelsDistance )
  })
/**
 *
type Position = {
  x: number,
  y: number
}
*/
const getPixelColorFromPosition = ({ x, y }) =>
  robot.getPixelColor(x, y)
const isKeyStackEmpty = (key = 'f1') =>
  getPixelColorFromPosition(
    getPositionFromKey(key)
  ) === stack.emptyColor
const writeImage = async(data = Buffer.from(''), fileName = '', width = 0, height = 0) =>
  new Promise((resolve, reject) =>
    new Jimp({ data, width, height }, (err, image) => {
      if (err) return reject(err)
      image.write(fileName)
    })
  )
const readImage = async(fileName) =>
  tesseract.recognize(fileName, { psm: 7 })
const getKeyStackAmount = async (key = 'f1') => {
  const { x } = getPositionFromKey(key)
  const width = hotkeyPixelsWidth
  const height = 8
  const { image } = robot.screen.capture(x, 604, width, height)
  const fileName = `${tmpDir}\\${key}.png`
  console.log('fileName', `${tmpDir}\\${key}.png`)
  return writeImage(image, fileName, width, height)
    .then(async() => {
      const rawAmount = await readImage(fileName)
      const keyAmount = Number(rawAmount.replace(/.*?(\d+).*?$/m, '$1'))
      return keyAmount
    })
}


const getMiniMapWpsBuffer = async () =>
  Promise.all(
    miniMapWps.map(async file =>
      new Promise((resolve, reject) =>
        pngParse.parseFile(`${__dirname}\\${file}.png`, (err, image) => {
          if (err) return reject(err)
          else return resolve(image.data)
        })
      )
    )
  )

const initialize = async() => {
  setInterval(async () =>
    await Promise.all(
      stackKeys.map(async keyStack => {
        const currentKeyAmount = await getKeyStackAmount(keyStack.key)
        const isBelowMin = currentKeyAmount < keyStack.min
        if (isBelowMin)
          console.log(keyStack.key, 'is below min amount')
      })
    )
  , 1000)
}
initialize()
/*


setTimeout(() => {
  // Get mouse position.
  const mouse = robot.getMousePos();

  // Get pixel color in hex format.
  const hex = robot.getPixelColor(mouse.x, mouse.y);
  console.log(hex + " at x:" + mouse.x + " y:" + mouse.y);

  setTimeout(() => {
    // Get mouse position.
    const mouse = robot.getMousePos();

    // Get pixel color in hex format.
    const hex = robot.getPixelColor(mouse.x, mouse.y);
    console.log(hex + " at x:" + mouse.x + " y:" + mouse.y);
  }, 3000)
}, 3000)
/*
setInterval(() => {
  const getAmmo
  if ()
}, 1000)
setTimeout(() => {

  // Press enter.
  robot.keyTap("f1");
  setInterval(() => {
    const colorAt = robot.getPixelColor(healthInfo.startsAt.x + minHealth, healthInfo.startsAt.y)
    if (healthInfo.filledColor !== colorAt)
    // Press enter.
      robot.keyTap("f1");

  }, 50)
}, 3000)
/*

*/
