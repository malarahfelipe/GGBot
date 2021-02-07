import { Config } from '../../../common/models/Config'
import { CAVEBOT_ACTIONS } from '../../../common/models/CavebotActions.enum'
import { BehaviorSubject } from 'rxjs'

export class ConfigModule {
  private static instance: ConfigModule
  private config: BehaviorSubject<Config> = new BehaviorSubject<Config>(null)
  private configs: Config[]
  private constructor() { }

  static async getInstance(): Promise<ConfigModule> {
    if (!this.instance) this.instance = await new ConfigModule().initialize()
    return this.instance
  }

  public async initialize(): Promise<ConfigModule> {
    await this.loadConfigs()
    return this
  }

  public async loadConfigs(): Promise<void> {
    this.configs = [
      {
        id: Math.random().toString(36).toUpperCase().slice(2),
        name: 'ELITE KNIGHT VAMPIRES EDRON',
        profission: 'EK',
        supplies: [
          {
            key: 'f2',
            min: 80
          },
          {
            key: 'f3',
            min: 150
          }
        ],
        cavebot: {
          goOutPath: [
            {
              alpha: 'E',
              action: {
                name: 'Andar',
                handler: CAVEBOT_ACTIONS.checkSupply
              }
            },
            {
              alpha: 'F'
            },
            {
              alpha: 'G'
            }
          ],
          actions: [
            {
              alpha: 'A',
              action: {
                name: 'Andar',
                handler: CAVEBOT_ACTIONS.checkSupply
              }
            },
            {
              alpha: 'B'
            },
            {
              alpha: 'C'
            },
            {
              alpha: 'D'
            }
          ]
        },
        healer: {
          configs: [
            {
              type: 'mana',
              percentage: 85,
              key: 'f3',
              every: 500
            },
            {
              type: 'life',
              percentage: 85,
              key: 'f1',
              every: 350
            },
            {
              type: 'life',
              percentage: 70,
              key: 'f2',
              every: 500
            }
          ]
        },
        attacker: {
          configs: [
            {
              monsterAmount: 1,
              key: 'f4'
            },
            {
              monsterAmount: 2,
              key: 'f5'
            },
            {
              monsterAmount: 4,
              key: 'f6'
            }
          ]
        }
      }
    ]
    this.config.next(this.configs[0])
  }

  public async getConfigs(): Promise<Config[]> {
    return this.configs
  }

  public setConfig(configId: string): Config {
    const newConfig = this.configs.find(({ id }) => id === configId)
    this.config.next(newConfig)
    return newConfig
  }

  public getConfig(): BehaviorSubject<Config> {
    return this.config
  }
}
