import { Screen } from './Screen'
import { ipcMain } from 'electron'
import { SCREEN_ACTIONS } from '../../../common/models/ScreenActions.enum'
import flow from 'lodash.flow'

export const ScreenListener =
({
  start: flow(
    () => Screen.getInstance(),
    instance => {
      ipcMain
        .handle(
          SCREEN_ACTIONS.screenShotHiggsPosition,
          () =>
            instance.screenShotHiggsPosition()
        )

      return ipcMain
    }
  )
})
