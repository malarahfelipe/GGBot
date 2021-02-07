import { CONFIG_ACTIONS } from '../../../common/models/ConfigActions.enum'
import { ipcMain } from '../../services/listener/ipc.service'
import { ConfigModule } from './Config'

export const ConfigListener =
({
  start: (): Promise<Partial<Electron.IpcMain>> =>
    ConfigModule.getInstance()
      .then(instance => {
        const handler = ipcMain('Config')

        handler
          .handle(
            CONFIG_ACTIONS.get,
            () =>
              instance.getConfigs()
          )

        handler
          .handle(
            CONFIG_ACTIONS.set,
            (_, { id }) =>
              instance.setConfig(id)
          )

        return handler
      })
})
