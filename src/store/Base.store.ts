import { ipcRenderer } from '../services/ipc.renderer'
import { IpcRenderer } from 'electron'
export class BaseStore implements Partial<IpcRenderer> {
  constructor(private serviceName: string) { }
  invoke<T, K = any>(channel: string, ...args: K[]): Promise<T> {
    return ipcRenderer(this.serviceName).invoke(channel, ...args)
  }

  static invoke<T, K = any>(serviceName: string, channel: string, ...args: K[]): Promise<T> {
    return ipcRenderer(serviceName).invoke(channel, ...args)
  }
}
