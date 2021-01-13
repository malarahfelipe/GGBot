import { assets } from "../assets"
import { mouseClick, moveMouse, screen } from "robotjs"
import { Cavebot } from "./Cavebot"
import { Healer } from "./Healer"
import { screenCaptureToFile2 } from "./Image"
import { Logger } from "./Logger"
import { MiniMap } from "./MiniMap"
import { find } from "./Screen"
import { imgDir } from "./Utils"

export class Hub {
  static instance: Hub

  private logger: Logger
  private cavebot: Cavebot
  private miniMap: MiniMap
  private healer: Healer

  private constructor() { }

  static async getInstance(): Promise<Hub> {
    if (!this.instance) this.instance = await new Hub().initialize()
    return this.instance
  }

  async openFullRightSpace(): Promise<void> {
    for(let i = 0; i < 4; i++) {
      await screenCaptureToFile2(
        screen.capture(),
        `${imgDir}\\screen.png`
      )
      const leftCloser =
        await find(
        `${imgDir}\\screen.png`,
        assets('closer-left.png')
        )
      const rightOpener =
        await find(
        `${imgDir}\\screen.png`,
        assets('opener-right.png')
        )
      const positionToClick = leftCloser || rightOpener
      if (!positionToClick) continue

      moveMouse(positionToClick.x, positionToClick.y)
      mouseClick()
    }
  }

  async initialize(): Promise<Hub> {
    // tries to initialize hub & other modules
    // tries to close left empty spaces
    await this.openFullRightSpace()

    //
    this.logger = await Logger.getInstance()

    // on demand services
    this.cavebot = Cavebot.getInstance()
    this.miniMap = MiniMap.getInstance()
    this.healer = Healer.getInstance()

    return this
  }

}
