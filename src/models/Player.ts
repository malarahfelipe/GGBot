import { keyTap } from "robotjs"
import { StackKey, SupportKey } from "./Key"
import { PlayerScreen } from "./PlayerScreen"

export class Player {

  private _stackKeys!: StackKey[]
  private _supportKeys!: SupportKey[]
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
    this.supportKeys = [
      {
        check: () => PlayerScreen.isHealthBelow(80),
        action: () => keyTap('f1'),
        every: 150
      },
      {
        check: () => PlayerScreen.isManaBelow(60),
        action: () => keyTap('f3'),
        every: 200
      }
    ]
  }

  set supportKeys(supKeys: SupportKey[]) {
    this._supportKeys = supKeys
    this._supportKeys.forEach(({ check, action, every }) =>
      setInterval(() => {
        if (check())
          action()
      }, every)
    )
  }

  get stackKeys() {
    return this._stackKeys
  }
}
