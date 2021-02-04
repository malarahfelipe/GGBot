import { CavebotListener } from '../../modules/Cavebot/listener'
import { ScreenListener } from '../../modules/Screen/listener'

export const startListeners = (): void => {
  ScreenListener.start()
  CavebotListener.start()
}
