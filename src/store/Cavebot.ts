import { CAVEBOT_ACTIONS } from '../../common/models/CavebotActions.enum'
import { BaseStore } from './Base.store'
import { isRejected, isFullfilled } from '../../common/utils/promise'
import { CAVEBOT_CONFIG_ACTIONS } from '../../common/models/CavebotConfigActions.enum'
import { CavebotConfig } from '../../common/models/CavebotConfig'

export class CavebotStore extends BaseStore {
  private static instance: CavebotStore
  private config: CavebotConfig
  private configs: Array<CavebotConfig>

  private constructor() {
    super('CavebotStore')
  }

  static async getInstance(): Promise<CavebotStore> {
    if (!this.instance) this.instance = await new CavebotStore().initialize()
    return this.instance
  }

  async initialize(): Promise<CavebotStore> {
    await this.load()
    return this
  }

  startCavebot(): Promise<void> {
    return this.invoke(CAVEBOT_ACTIONS.startCavebot)
  }

  stopCavebot(): Promise<void> {
    return this.invoke(CAVEBOT_ACTIONS.stopCavebot)
  }

  checkSupply(): Promise<void> {
    return this.invoke(CAVEBOT_ACTIONS.checkSupply)
  }

  refillMana(): Promise<void> {
    return this.invoke(CAVEBOT_ACTIONS.refillMana)
  }

  async load(): Promise<void> {
    const promises = await Promise.allSettled(
      [
        this.loadConfigs()
      ]
    )
    const [ reasons, configs ] = [
      promises
        .filter(isRejected)
        .map(({ reason }) => reason),
      promises
        .filter(isFullfilled)
        .map<CavebotConfig[]>(({ value }) => value)
    ]
    console.log('reasons', reasons)
    this.configs = configs[0]
  }

  private async loadConfigs(): Promise<CavebotConfig[]> {
    return this.invoke(CAVEBOT_CONFIG_ACTIONS.get)
  }

  getConfigs(): Array<CavebotConfig> {
    return this.configs
  }

  setConfig(config: CavebotConfig): Promise<CavebotConfig> {
    return this.invoke(CAVEBOT_CONFIG_ACTIONS.set, config)
  }
}
