import { CavebotConfig } from '../../../common/models/CavebotConfig'

export interface ICavebotChildren {
  config: CavebotConfig
  getConfigs?: () => Promise<CavebotConfig[]>
  setConfig: (config: CavebotConfig) => Promise<void>
}
