import { CONFIG_ACTIONS } from '../../common/models/ConfigActions.enum'
import { BaseStore } from './Base.store'
import { isRejected, isFullfilled } from '../../common/utils/promise'
import { Config } from '../../common/models/Config'

export class ConfigStore extends BaseStore {
  private static instance: ConfigStore
  private config: Config
  private configs: Array<Config>

  private constructor() {
    super('ConfigStore')
  }

  static async getInstance(): Promise<ConfigStore> {
    if (!this.instance) this.instance = await new ConfigStore().initialize()
    return this.instance
  }

  async initialize(): Promise<ConfigStore> {
    await this.load()
    return this
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
        .flatMap<Config>(({ value }) => value)
    ]
    this.configs = configs
    this.config = this.configs[0]
  }

  private async loadConfigs(): Promise<Config[]> {
    return this.invoke(CONFIG_ACTIONS.get)
  }

  getConfigs(): Array<Config> {
    return this.configs
  }

  getConfig(): Config {
    return this.config
  }

  setConfig(config: Config): Promise<Config> {
    return this.invoke(CONFIG_ACTIONS.set, config)
  }
}
