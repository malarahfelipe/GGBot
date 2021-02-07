import { MiniMap } from '../Minimap/MiniMap'
import { Alpha, Utils } from '../../../common/models/Utils'
import { CavebotConfig } from '../../../common/models/CavebotConfig'
import { SupplyKey } from '../../../common/models/SupplyKey'
import { Supplier } from '../Supplier/Supplier'
import { ActionWalk } from '../../../common/models/ActionAlpha'
import { ConfigModule } from '../Config/Config'
import { Healer } from '../Healer/Healer'
import { Attacker } from '../Attacker/Attacker'
import { Subscription } from 'rxjs'

export class Cavebot {
  private currentStep: Alpha = null
  private static instance: Cavebot
  private config: CavebotConfig
  private path: ActionWalk[]
  private supplies: SupplyKey[]
  private reachingInterval: number = null
  private attackerSubscription: Subscription
  private miniMapInstance: MiniMap
  private attackerInstance: Attacker
  private healerInstance: Healer
  private configInstance: ConfigModule
  private constructor() { }

  static async getInstance(): Promise<Cavebot> {
    if (!this.instance) this.instance = await new Cavebot().initialize()
    return this.instance
  }

  public async initialize(): Promise<Cavebot> {
    this.healerInstance = await Healer.getInstance()
    this.miniMapInstance = await MiniMap.getInstance()
    this.attackerInstance = await Attacker.getInstance()
    const configInstance = await ConfigModule.getInstance()
    configInstance
      .getConfig()
      .subscribe(({ supplies, cavebot }) => {
        this.supplies = supplies
        this.path = cavebot.actions
        this.config = cavebot
      })
    return this
  }

  public async resume(): Promise<void> {
    if (!this.config) return

    this.pause()
    const hasReached = async () => {
      const response = await this.miniMapInstance.hasReachedAlpha(this.getNextAlpha()).catch(() => false)
      console.log('hasReached', this.currentStep, response)
      return response
    }
    let counter = 0
    this.healerInstance.start()
    this.attackerInstance.start()
    this.attackerSubscription = this.attackerInstance
      .getOnMonsterAvailable()
      .subscribe(async hasMonster => {
        if (hasMonster)
          this.pause()
        else
          await this.resume()
      })
    this.reachingInterval = setInterval(async () => {
      if (await hasReached()) {
        this.currentStep = this.getNextAlpha()
        await this.resume()
      } else if (counter >= 30)
        this.pause()
      else
        setTimeout(() => counter++, 1000)
    }, 600)

    return this.goToNextStep()
  }

  public pause(): void {
    this.attackerInstance.stop()
    if (this.attackerSubscription)
      this.attackerSubscription.unsubscribe()
    if (this.reachingInterval)
      clearInterval(this.reachingInterval)
  }

  private getNextAlpha(): Alpha {
    const alphabet = this.path.map(({ alpha }) => alpha)
    return Utils.nextAlpha(this.currentStep, alphabet)
  }

  public async goToNextStep(): Promise<void> {
    return this.miniMapInstance.goTo(this.getNextAlpha())
  }

  public async checkSupply(): Promise<void> {
    const needsSupply = Supplier.needsSupply(this.supplies)
    if (!needsSupply) return

    this.pause()
    this.path = this.config.goOutPath
    return this.resume()
  }

  public async refillMana(): Promise<void> {
    console.log('refillMana')
  }
}
