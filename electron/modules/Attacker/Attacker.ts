import { FullPosition, BarInfo } from '../../../common/models/Utils'
import { Screen } from '../Screen/Screen'
import { ConfigModule } from '../Config/Config'
import { AttackerConfig, AttackConfig } from '../../../common/models/AttackerConfig'
import { keyTap, getPixelColor } from 'robotjs'
import { BehaviorSubject } from 'rxjs'
import { KeyScreen } from '../Key/Key'

const MAX_COUNT_MONSTERS = 8
export class Attacker {
  private static instance: Attacker
  private keyScreenInstance: KeyScreen
  private config: AttackerConfig
  private attackersInterval: number[] = []
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

  public getOnMonsterAvailable(): BehaviorSubject<boolean> {
    return this.onMonsterAvailable
  }

  private checkAndAttack() {
    return this.config.configs.forEach(({ monsterAmount, priority, key }, index) => {
      const defaultInterval = 1000
      this.attackersInterval[index] = setInterval(() => {
        if (Attacker.hasMonsters(monsterAmount))
          this.keyScreenInstance.addToQueue({ ...key, priority })
      }, defaultInterval)
    })
  }

  public start(): void {
    if (!this.config) return
    this.keyScreenInstance = KeyScreen.getInstance()
    this.stop()
    // this.checkAndAttack()
    this.attackersInterval.push(
      setInterval(() => {
        const hasMonster = Attacker.hasMonsters()
        if (hasMonster && !Attacker.isAttacking())
          keyTap('space')
        this.onMonsterAvailable.next(hasMonster)
      }, 150)
    )
    setTimeout(() => this.stop(), 5000)
  }

  public stop(): void {
    if (this.attackersInterval.length)
      this.attackersInterval.forEach(clearInterval)
  }

  public static isAttacking(): boolean {
    const { startsAt: { x, y } } = this.getMonsterPosition()
    const { attackingColor } = this.getMonsterInfo()
    const monsterDistance = this.getMonstersBatteDistance()
    return new Array(MAX_COUNT_MONSTERS)
      .fill(null)
      .some((_, index) =>
        attackingColor === getPixelColor(x - 3, y + (monsterDistance * index))
      )
  }

  public static hasMonsters(minQuantity = 0): boolean {
    if (minQuantity < 0) return false

    const { startsAt: { x, y } } = this.getMonsterPosition()
    const { filledColor } = this.getMonsterInfo()
    const monsterDistance = this.getMonstersBatteDistance()
    const monsterAt = { x, y: y + (monsterDistance * minQuantity) }
    const currentColor = getPixelColor(monsterAt.x, monsterAt.y)
    return filledColor === currentColor
  }

  static getMonstersBatteDistance(): number {
    return 22
  }

  static getMonsterPosition(): FullPosition {
    const { x, y } = Screen.getInstance().getHiggsPosition()
    return {
      startsAt: {
        x: x + 968,
        y: y + 30
      }
    }
  }

  public static getMonsterInfo(): BarInfo & { attackingColor: string } {
    return {
      attackingColor: 'ff0000',
      filledColor: '000000',
      emptyColor: '494a4a'
    }
  }
}
