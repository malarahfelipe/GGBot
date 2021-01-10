import { Player } from "./models/Player"
import { Utils } from "./models/Utils"

const robot = require("robotjs")
const pngParse = require('pngparse')
const Jimp = require('jimp')
const imageSearch = require('matches-subimage/src')
const tesseract = require("node-tesseract-ocr")
const os = require('os')
const { fstat } = require("fs")
const { resolve } = require("path")
const tmpDir = `${os.tmpdir()}\\GoodBot`

const NineNineProblems = new Player(2045, 2830)
const healthInfo = Utils.getHealthInfo()
const manaInfo = Utils.getManaInfo()
const stack = Utils.getStackInfo()
const { f1, hotkeyPixelsWidth, hotkeyPixelsDistance } = Utils.getHotkeyInfo()
const minHealth = 80
const miniMapWps = [
  'A', 'B', 'C', 'D', 'E', 'F'
]
const wpStepsBuffers = []
const miniMapImage = getMiniMapImage()
let currentStep = -1

export const getPositionFromKey = (key = 'f1') =>
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
export const getPixelColorFromPosition = ({ x, y }) =>
  robot.getPixelColor(x, y)
export const isKeyStackEmpty = (key = 'f1') =>
  getPixelColorFromPosition(
    getPositionFromKey(key)
  ) === stack.emptyColor
export const getMiniMapWpsBuffer = async () =>
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


export const getStepPosition = async(step) =>
  new Promise((resolve, reject) =>
    imageSearch(miniMapImage, step, (error, results) => {
      if (error) return reject(error)
      else return resolve((results || []).pop())
    })
  )
export const goToNextStep = async () => {
  currentStep++
  const step = wpStepsBuffers[currentStep]
  const { x, y } = await getStepPosition(step)
  robot.moveMouse(x, y)
  robot.mouseClick()
}

export const initialize = async() => {
  wpStepsBuffers.splice(0, miniMapWps.length, await getMiniMapWpsBuffer())
  setInterval(async () =>
    goToNextStep()
  , 1000)
}
initialize()
/*


  setInterval(async () =>
    goToNextStep()
    await Promise.all(
      stackKeys.map(async keyStack => {
        if (isBelowMin)
          console.log(keyStack.key, 'is below min amount')
      })
    )
  , 1000)
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
}, 3000)
/*

*/