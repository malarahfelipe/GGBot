import { BaseStore } from './Base.store'
import { AttackerConfig } from '../../common/models/AttackerConfig'
import { ConfigStore } from './Config'
import { AGENT_ACTIONS } from '../../common/models/Agent.dynamic-enum'

export class AttackerStore extends BaseStore {
  private static instance: AttackerStore
  private config: AttackerConfig

  private constructor() {
    super('AttackerStore')
  }

  static async getInstance(): Promise<AttackerStore> {
    if (!this.instance) this.instance = await new AttackerStore().initialize()
    return this.instance
  }

  async initialize(): Promise<AttackerStore> {
    const { attacker } = (await ConfigStore.getInstance()).getConfig()
    this.config = attacker
    return this
  }

  start(): Promise<void> {
    return this.invoke(AGENT_ACTIONS('attacker').start)
  }

  stop(): Promise<void> {
    return this.invoke(AGENT_ACTIONS('attacker').stop)
  }
}
