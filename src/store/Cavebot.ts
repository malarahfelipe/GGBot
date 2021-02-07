import { CAVEBOT_ACTIONS } from '../../common/models/CavebotActions.enum'
import { BaseStore } from './Base.store'
import { CavebotConfig } from '../../common/models/CavebotConfig'
import { ConfigStore } from './Config'
import { AGENT_ACTIONS } from '../../common/models/Agent.dynamic-enum'

export class CavebotStore extends BaseStore {
  private static instance: CavebotStore
  private config: CavebotConfig

  private constructor() {
    super('CavebotStore')
  }

  static async getInstance(): Promise<CavebotStore> {
    if (!this.instance) this.instance = await new CavebotStore().initialize()
    return this.instance
  }

  async initialize(): Promise<CavebotStore> {
    const { cavebot } = (await ConfigStore.getInstance()).getConfig()
    this.config = cavebot
    return this
  }

  start(): Promise<void> {
    return this.invoke(AGENT_ACTIONS('cavebot').start)
  }

  stop(): Promise<void> {
    return this.invoke(AGENT_ACTIONS('cavebot').stop)
  }

  checkSupply(): Promise<void> {
    return this.invoke(CAVEBOT_ACTIONS.checkSupply)
  }

  refillMana(): Promise<void> {
    return this.invoke(CAVEBOT_ACTIONS.refillMana)
  }
}
