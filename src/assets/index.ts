import { join } from "path"

export const assets = (assetName: string) => join(`${__dirname}`, assetName)
