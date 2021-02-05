import { ipcMain as ipc, IpcMain } from 'electron'
import { Logger, logger } from '../../../common/services/Logger'

type HandleFn = (channel: string, listener: (event: Electron.IpcMainInvokeEvent, ...args: any[]) => any) => void

const handle = (serviceName: string): HandleFn =>
  (channel, listener) =>
    ipc.handle(channel, async (event, ...args) => {
      const message = `[${ serviceName }.${ channel }]`
      try {
        const rawResult = listener(event, ...args)
        const result = rawResult instanceof Promise ? await rawResult : rawResult
        logger.success(`${ message }: ${ result }`)
        return result
      } catch (err) {
        logger.error(`${ message }: ${ (err && err.message) || '' }`)
        throw err
      }
    })

export const ipcMain = (serviceName: string): Partial<IpcMain> => ({
  handle: handle(serviceName)
})
