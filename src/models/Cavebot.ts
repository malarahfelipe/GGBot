import { MiniMap } from "./MiniMap"
import { Utils } from "./Utils"
export class Cavebot {

  private currentStep: string = null
  private static instance: Cavebot
  private constructor() { }

  static getInstance() {
    if (!this.instance)
      this.instance = new Cavebot()
    return this.instance
  }

  public async goToNextStep() {
    const alphabet = Utils.getAlphabet()
    const currentPosition = alphabet.indexOf(this.currentStep)
    const nextIndex = currentPosition !== -1 && (currentPosition + 1) < alphabet.length ? currentPosition + 1 : 0
    this.currentStep = alphabet[nextIndex]
    console.log('this.currentStep', this.currentStep)
    return MiniMap.getInstance().goTo(nextIndex)
    /*
    TODO: 01/10 16h
    const { x, y } =
    robot.moveMouse(x, y)
    robot.mouseClick()
    */
  }
}
