import { Cavebot } from './Cavebot'
import { ipcMain } from 'electron'
import { CAVEBOT_ACTIONS } from '../../../common/models/CavebotActions.enum'
import { CAVEBOT_CONFIG_ACTIONS } from '../../../common/models/CavebotConfigActions.enum'

export const CavebotListener =
({
  start: (): Promise<Electron.IpcMain> =>
    Cavebot.getInstance()
      .then(instance => {
        ipcMain
          .handle(
            CAVEBOT_CONFIG_ACTIONS.get,
            () =>
              instance.getConfigs()
          )

        ipcMain
          .handle(
            CAVEBOT_CONFIG_ACTIONS.set,
            (_, { id }) =>
              instance.setConfig(id)
          )

        ipcMain
          .handle(
            CAVEBOT_ACTIONS.goToNextWp,
            () =>
              instance.goToNextStep()
          )

        ipcMain
          .handle(
            CAVEBOT_ACTIONS.checkSupply,
            () =>
              instance.checkSupply()
          )

        ipcMain
          .handle(
            CAVEBOT_ACTIONS.refillMana,
            () =>
              instance.refillMana()
          )

        return ipcMain
      })
})
