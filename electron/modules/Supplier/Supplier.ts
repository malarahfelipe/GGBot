import { SupplyKey } from '../../../common/models/SupplyKey'
import { KeyScreen } from '../Key/Key'

export class Supplier {
  static async isAtMinimumSupply({ key, min }: SupplyKey): Promise<boolean> {
    const amount = await KeyScreen.getKeyStackAmount(key)
    return amount <= min
  }

  static async needsSupply(supplies: SupplyKey[]): Promise<boolean> {
    return (await Promise.all(supplies.map(this.isAtMinimumSupply))).some(isBelowMin => !!isBelowMin)
  }
}
