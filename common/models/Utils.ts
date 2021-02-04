export type Alpha = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z'

export interface BarInfo {
  filledColor: string,
  emptyColor: string
}
export abstract class Utils {
  public static getHealthInfo(): BarInfo {
    return {
      filledColor: 'DB4F4F',
      emptyColor: '623234'
    }
  }

  public static getManaInfo(): BarInfo {
    return {
      filledColor: '5350DA',
      emptyColor: '623234'
    }
  }

  public static getStackInfo() {
    return {
      emptyColor: '363636'
    }
  }

  public static getHotkeyInfo() {
    return {
      hotkeyPixelsSize: 31,
      hotkeyPixelsDistance: 36
    }
  }

  public static getAlphabet(): Alpha[] {
    return [ 'A', 'B', 'C', 'D', 'E', 'F'
    //  "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"
    ]
  }

  public static nextAlpha(alpha: Alpha): Alpha {
    if (!alpha) return 'A'
    else {
      const alphabet = this.getAlphabet()
      return alphabet[alphabet.indexOf(alpha) + 1] ?? 'A'
    }
  }
}
export interface Position {
  x: number,
  y: number
}

export interface StartPosition {
  startsAt: Position
}
