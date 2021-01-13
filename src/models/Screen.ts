
import cv from 'opencv4nodejs'
import { Position } from './Utils'

export const find = async (templatePath = '', subImagePath = ''): Promise<Position> => {
  // Load images
  const originalMat = await cv.imreadAsync(templatePath, 1)
  const subMat = await cv.imreadAsync(subImagePath, 1)

  // Match template (the brightest locations indicate the highest match)
  const matched = originalMat.matchTemplate(subMat, 5)
  return matched.minMaxLoc().maxLoc
}
