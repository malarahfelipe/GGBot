import { CAVEBOT_ACTIONS } from '../../../common/models/CavebotActions.enum'
import { ipcMain } from '../../services/listener/ipc.service'
import { Cavebot } from './Cavebot'
import { AGENT_ACTIONS } from '../../../common/models/Agent.dynamic-enum'

export const CavebotListener =
({
  start: (): Promise<Partial<Electron.IpcMain>> =>
    Cavebot.getInstance()
      .then(instance => {
        const handler = ipcMain('Cavebot')

        handler
          .handle(
            AGENT_ACTIONS('cavebot').start,
            () =>
              instance.resume()
          )

        handler
          .handle(
            AGENT_ACTIONS('cavebot').stop,
            () =>
              instance.pause()
          )

        handler
          .handle(
            CAVEBOT_ACTIONS.checkSupply,
            () =>
              instance.checkSupply()
          )

        handler
          .handle(
            CAVEBOT_ACTIONS.refillMana,
            () =>
              instance.refillMana()
          )

        return handler
      })
})
