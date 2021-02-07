import { Config } from '../../common/models/Config'

export interface IChildren {
  config: Config
  setConfig: (newConfig: Config) => Promise<void>
}
