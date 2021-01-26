import { ipcMain, IpcMain } from 'electron'
import robotjs from 'robotjs'
import { Cavebot } from '../models/Cavebot'

export const startListeners = (): void => {
  ipcMain.on('ping', (event) =>
    event.sender.send('repong', { version: process.version })
  )
  ipcMain.on('capture', (event) => {
    const { width } = robotjs.screen.capture()
    event.sender.send('capture', { width })
  })
  ipcMain.on('cavebot_goToNext', (event) => {
    Cavebot.getInstance().goToNextStep()
  })
}
