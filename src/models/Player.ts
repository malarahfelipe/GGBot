import { StackKey } from "./Key"

export class Player {

  private _stackKeys!: StackKey[]
  constructor(
    private hp: number,
    private mana: number
  ) {
    this._stackKeys = [
      {
        key: 'f3',
        min: 80,
      },
      {
        key: 'f5',
        min: 50
      },
      {
        key: 'f7',
        min: 100
      },
    ]
  }

  get stackKeys() {
    return this._stackKeys
  }
}