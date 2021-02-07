import { ipcMain } from '../../services/listener/ipc.service'
import { Attacker } from './Attacker'
import { AGENT_ACTIONS } from '../../../common/models/Agent.dynamic-enum'

export const AttackerListener =
({
  start: (): Promise<Partial<Electron.IpcMain>> =>
    Attacker.getInstance()
      .then(instance => {
        const handler = ipcMain('Attacker')

        handler
          .handle(
            AGENT_ACTIONS('attacker').start,
            () =>
              instance.start()
          )

        handler
          .handle(
            AGENT_ACTIONS('attacker').stop,
            () =>
              instance.stop()
          )

        return handler
      })
})
