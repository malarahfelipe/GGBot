import { IpcRenderer, ipcRenderer } from 'electron'
import { Logger } from '../../common/services/Logger'

export class BaseStore implements Partial<IpcRenderer> {
  invoke<T, K = any>(channel: string, ...args: K[]): Promise<T> {
    Logger.log(`BaseStore.invoke: ${ channel }`)
    return ipcRenderer.invoke(channel, ...args)
  }

  static invoke<T, K = any>(channel: string, ...args: K[]): Promise<T> {
    Logger.log(`BaseStore.invoke(static): ${ channel }`)
    return ipcRenderer.invoke(channel, ...args)
  }
}
