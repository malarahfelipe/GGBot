export class Healer {

  static instance: Healer

  static getInstance(): Healer {
    if (!this.instance) this.instance = new Healer().initialize()
    return this.instance
  }

  initialize(): Healer {
    // tries to find player health & mana bars
    return this
  }
}
