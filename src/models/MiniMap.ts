import { screen } from 'robotjs'
export abstract class MiniMap {
  static getMiniMapImage = () =>
    screen.capture(1199, 28, 1304 - 1199, 136 - 28).image
}