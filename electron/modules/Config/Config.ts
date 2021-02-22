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
              type: 'life',
              percentage: 85,
              key: {
                key: 'f1',
                type: 'spell'
              },
              priority: 2,
              every: 400
            },
            {
              type: 'life',
              percentage: 30,
              key: {
                key: 'f10',
                type: 'spell'
              },
              priority: 3,
              every: 500
            },
            {
              type: 'life',
              percentage: 60,
              key: {
                key: 'f2',
                type: 'rune_potion'
              },
              priority: 5,
              every: 200
            },
            {
              type: 'mana',
              percentage: 85,
              key: {
                key: 'f3',
                type: 'rune_potion'
              },
              priority: 4,
              every: 600
            }
          ]
        },
        attacker: {
          configs: [
            {
              monsterAmount: 1,
              priority: 2,
              key: {
                key: 'f4',
                type: 'spell'
              }
            },
            {
              monsterAmount: 2,
              priority: 3,
              key: {
                key: 'f5',
                type: 'spell'
              }
            },
            {
              monsterAmount: 4,
              priority: 4,
              key: {
                key: 'f6',
                type: 'spell'
              }
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
