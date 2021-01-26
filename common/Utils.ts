export type Alpha = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z'

export interface BarInfo {
  filledColor: string,
  emptyColor: string,
  startsAt: {
    x: number,
    y: number
  }
}
export abstract class Utils {
  public static getHealthInfo(): BarInfo {
    return {
      filledColor: 'c04040',
      emptyColor: '623234',
      startsAt: {
        x: 1210,
        y: 146
      }
    }
  }

  public static getManaInfo(): BarInfo {
    return {
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

  public static getAlphabet(): Alpha[] {
    return ['A', 'B', 'C', 'D', 'E', 'F'
    //  "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
    ]
  }
}
export interface Position {
  x: number,
  y: number
}
