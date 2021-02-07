import { CavebotConfig } from './CavebotConfig'
import { AttackerConfig } from './AttackerConfig'
import { Profission } from './Profission'
import { HealerConfig } from './HealerConfig'
import { SupplyKey } from './SupplyKey'

export class Config {
  id: string
  name: string
  profission: Profission
  healer: HealerConfig
  attacker: AttackerConfig
  cavebot: CavebotConfig
  supplies: SupplyKey[]
  constructor() {
    this.id = Math.random().toString(36).toUpperCase().slice(2)
    this.name = 'Nova Configuração'
    this.profission = 'EK'
    this.supplies = []
    this.healer = {
      configs: []
    }
    this.attacker = {
      configs: []
    }
    this.cavebot = {
      actions: [],
      goOutPath: []
    }
  }
}
