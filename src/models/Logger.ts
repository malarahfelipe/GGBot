
export class Logger {
  static instance: Logger

  private constructor() {

  }

  static async getInstance(): Promise<Logger> {
    if (!this.instance) this.instance = await new Logger().initialize()
    return this.instance
  }

  async initialize(): Promise<Logger> {
    return this
  }

  log(color = 'gray', message = '') {
    console.log(`${color}: ${ message }`)
  }
}
