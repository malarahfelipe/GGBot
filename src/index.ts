import { Cavebot } from "./models/Cavebot"


export const initialize = async() => {
  setInterval(async() => {
    console.log('starting cavebot')
    const cavebot = Cavebot.getInstance()
    return cavebot.goToNextStep()
  }, 3000)
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
