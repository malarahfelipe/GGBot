export abstract class Utils {

  public static getHealthInfo() {
    return {
      filledColor: 'c04040',
      emptyColor: '623234',
      startsAt: {
        x: 1210,
        y: 146
      }
    }
  }
  public static getManaInfo() {
    return  {
      filledColor: '7471ff',
      emptyColor: '623234',
      startsAt: {
        x: 1210,
        y: 162
      }
    }
  }
  public static getStackInfo() {
    return {
      emptyColor: '363636'
    }
  }
  public static getHotkeyInfo() {
    return {
      f1: {
        startsAt: {
          x: 85,
          y: 581
        }
      },
      hotkeyPixelsWidth: 31,
      hotkeyPixelsDistance: 36
    }
  }
}