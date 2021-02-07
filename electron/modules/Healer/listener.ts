import { ipcMain } from '../../services/listener/ipc.service'
import { Healer } from './Healer'
import { AGENT_ACTIONS } from '../../../common/models/Agent.dynamic-enum'

export const HealerListener =
({
  start: (): Promise<Partial<Electron.IpcMain>> =>
    Healer.getInstance()
      .then(instance => {
        const handler = ipcMain('Healer')

        handler
          .handle(
            AGENT_ACTIONS('healer').start,
            () =>
              instance.start()
          )

        handler
          .handle(
            AGENT_ACTIONS('healer').stop,
            () =>
              instance.stop()
          )

        return handler
      })
})
