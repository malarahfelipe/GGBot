export type Alpha = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G' | 'H' | 'I' | 'J' | 'K' | 'L' | 'M' | 'N' | 'O' | 'P' | 'Q' | 'R' | 'S' | 'T' | 'U' | 'V' | 'W' | 'X' | 'Y' | 'Z'

export interface BarInfo {
  filledColor: string,
  emptyColor: string
}
export abstract class Utils {
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

  public static nextAlpha(alpha: Alpha, alphabet: Alpha[] = this.getAlphabet()): Alpha {
    if (!alpha) return 'A'
    else
      return alphabet[alphabet.indexOf(alpha) + 1] ?? alphabet[0]
  }
}
export interface Position {
  x: number,
  y: number
}

export interface FullPosition {
  startsAt: Position
  endsAt?: Position
}
