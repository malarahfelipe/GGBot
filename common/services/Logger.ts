import chalk from 'chalk'

export type Logger = Record<'error' | 'info' | 'success', (message: string) => void>

export const logger: Logger = Object.entries({
  error: chalk.bold.red,
  info: chalk.bold.blue,
  success: chalk.bold.green
})
  .reduce(
    (result, [ type, color ]) =>
      Object.assign(
        result, {
          [type]: (message: string) => console.log(color(message))
        }
      )
    , {} as Logger
  )
