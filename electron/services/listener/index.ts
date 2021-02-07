import { CavebotListener } from '../../modules/Cavebot/listener'
import { ScreenListener } from '../../modules/Screen/listener'
import { ConfigListener } from '../../modules/Config/listener'
import { HealerListener } from '../../modules/Healer/listener'
import { AttackerListener } from '../../modules/Attacker/listener'

export const startListeners = (): void => {
  HealerListener.start()
  AttackerListener.start()
  ConfigListener.start()
  ScreenListener.start()
  CavebotListener.start()
}
