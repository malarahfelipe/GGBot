import { SupplyKey } from '../../../common/models/SupplyKey'
import { KeyScreen } from '../Key/Key'

export class Supplier {
  static async isBelowMin({ key, min }: SupplyKey): Promise<boolean> {
    const amount = await KeyScreen.getKeyStackAmount(key)
    return amount < min
  }
}
