import { BaseStore } from './Base.store'
import { HealerConfig } from '../../common/models/HealerConfig'
import { ConfigStore } from './Config'
import { AGENT_ACTIONS } from '../../common/models/Agent.dynamic-enum'

export class HealerStore extends BaseStore {
  private static instance: HealerStore
  private config: HealerConfig

  private constructor() {
    super('HealerStore')
  }

  static async getInstance(): Promise<HealerStore> {
    if (!this.instance) this.instance = await new HealerStore().initialize()
    return this.instance
  }

  async initialize(): Promise<HealerStore> {
    const { healer } = (await ConfigStore.getInstance()).getConfig()
    this.config = healer
    return this
  }

  start(): Promise<void> {
    return this.invoke(AGENT_ACTIONS('healer').start)
  }

  stop(): Promise<void> {
    return this.invoke(AGENT_ACTIONS('healer').stop)
  }
}
