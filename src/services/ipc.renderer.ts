import { ipcRenderer as ipc, IpcRenderer } from 'electron'

type InvokeFn = (channel: string, ...args: any[]) => Promise<any>

const invoke = (serviceName: string): InvokeFn =>
  (channel, ...args) => {
    const message = `[${ serviceName }.${ channel }: ${ args }]`
    console.log('message', message)
    return ipc.invoke(channel, ...args)
  }

export const ipcRenderer = (serviceName: string): Partial<IpcRenderer> => ({
  invoke: invoke(serviceName)
})
