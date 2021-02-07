import { FullPosition, BarInfo } from '../../../common/models/Utils'
import { Screen } from '../Screen/Screen'
import { ConfigModule } from '../Config/Config'
import { AttackerConfig, AttackConfig } from '../../../common/models/AttackerConfig'
import { keyTap, getPixelColor } from 'robotjs'
import { BehaviorSubject } from 'rxjs'

export class Attacker {
  private static instance: Attacker
  private config: AttackerConfig
  private attackersInterval: number[]
  private onMonsterAvailable: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  private constructor() { }

  static async getInstance(): Promise<Attacker> {
    if (!this.instance) this.instance = await new Attacker().initialize()
    return this.instance
  }

  public async initialize(): Promise<Attacker> {
    const configInstance = await ConfigModule.getInstance()
    configInstance
      .getConfig()
      .subscribe(({ attacker }) => { this.config = attacker })
    return this
  }

  public static hasMoreThanxMonsters(quantity = 0): boolean {
    if (quantity < 1) return false

    const { startsAt: { x, y } } = this.getMonsterPosition()
    const { filledColor } = this.getMonsterInfo()
    const monsterDistance = this.getMonstersBatteDistance()
    const monsterAt = { x, y: y + (monsterDistance * quantity) }
    const currentColor = getPixelColor(monsterAt.x, monsterAt.y)
    return filledColor !== currentColor
  }

  public getOnMonsterAvailable(): BehaviorSubject<boolean> {
    return this.onMonsterAvailable
  }

  private checkAndAttack() {
    const hasMonster = Attacker.hasMoreThanxMonsters(1)
    if (hasMonster)
      keyTap('space')
    this.onMonsterAvailable.next(hasMonster)
    return this.config.configs.forEach(({ monsterAmount, key }, index) => {
      this.attackersInterval[index] = setInterval(() => {
        if (Attacker.hasMoreThanxMonsters(monsterAmount))
          keyTap(key)
      }, 500)
    })
  }

  public start(): void {
    if (!this.config) return

    this.stop()
    this.checkAndAttack()
  }

  public stop(): void {
    if (this.attackersInterval.length)
      this.attackersInterval.forEach(clearInterval)
  }

  static getLifePosition(): FullPosition {
    const { x, y } = Screen.getInstance().getHiggsPosition()
    return {
      startsAt: {
        x: x + 1139,
        y: y + 285
      }
    }
  }

  static getMonstersBatteDistance(): number {
    return 22
  }

  static getMonsterPosition(): FullPosition {
    const { x, y } = Screen.getInstance().getHiggsPosition()
    return {
      startsAt: {
        x: x + 1099,
        y: y + 30
      }
    }
  }

  public static getMonsterInfo(): BarInfo {
    return {
      filledColor: '000000',
      emptyColor: '494A4A'
    }
  }
}
