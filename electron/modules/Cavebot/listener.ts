import { CAVEBOT_ACTIONS } from '../../../common/models/CavebotActions.enum'
import { CAVEBOT_CONFIG_ACTIONS } from '../../../common/models/CavebotConfigActions.enum'
import { ipcMain } from '../../services/listener/ipc.service'
import { Cavebot } from './Cavebot'

export const CavebotListener =
({
  start: (): Promise<Partial<Electron.IpcMain>> =>
    Cavebot.getInstance()
      .then(instance => {
        const handler = ipcMain('Cavebot')

        handler
          .handle(
            CAVEBOT_CONFIG_ACTIONS.get,
            () =>
              instance.getConfigs()
          )

        handler
          .handle(
            CAVEBOT_CONFIG_ACTIONS.set,
            (_, { id }) =>
              instance.setConfig(id)
          )

        handler
          .handle(
            CAVEBOT_ACTIONS.startCavebot,
            () =>
              instance.startCavebot()
          )

        handler
          .handle(
            CAVEBOT_ACTIONS.stopCavebot,
            () =>
              instance.startCavebot()
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
