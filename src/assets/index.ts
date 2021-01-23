import { Utils } from "@/models/Utils"
import { join } from "path"

export const WP_IMAGES = Object.freeze(
  Utils
    .getAlphabet()
    .map(alphabet =>
      ({ alphabet, image: require(`@/assets/${alphabet}.png`).default })
    )
)
export const assets = (assetName: string) => join(`@/assets/`, assetName)
