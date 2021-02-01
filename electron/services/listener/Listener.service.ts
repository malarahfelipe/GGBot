import { IpcMain, ipcMain } from 'electron'
import { Logger } from '../../../common/services/Logger'

export class ListenerService implements Partial<IpcMain> {
  handle(channel: string, listener: (event: Electron.IpcMainInvokeEvent, ...args: any[]) => any): void {
    Logger.log(`ListenerService.handle: ${ channel }`)
    return ipcMain.handle(channel, listener)
  }

  on(channel: string, listener: (event: Electron.IpcMainEvent, ...args: any[]) => void): IpcMain {
    Logger.log(`ListenerService.on: ${ channel }`)
    return ipcMain.on(channel, listener)
  }

  once(channel: string, listener: (event: Electron.IpcMainEvent, ...args: any[]) => void): IpcMain {
    Logger.log(`ListenerService.once: ${ channel }`)
    return ipcMain.once(channel, listener)
  }
}
