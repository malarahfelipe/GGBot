import { CavebotConfig } from '../../../common/models/CavebotConfig'

export interface ICavebotChildren {
  cavebot: CavebotConfig
  setConfig: (config: CavebotConfig) => Promise<void>
}
