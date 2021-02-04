import { Screen } from './Screen'
import { ipcMain } from 'electron'
import { SCREEN_ACTIONS } from '../../../common/models/ScreenActions.enum'
import flow from 'lodash.flow'
import { MiniMap } from '../Minimap/MiniMap'
import { Utils } from '../../../common/models/Utils'

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
      ipcMain
        .handle('test_whichAlpha',
          async () => {
            const responses = await MiniMap.getInstance()
              .then((instance) =>
                Promise.all(
                  Utils.getAlphabet()
                    .map(async alpha =>
                      instance.hasReachedAlpha(alpha)
                    )
                )
              )
            return responses.filter(i => !!i).pop()
          }
        )

      return ipcMain
    }
  )
})
