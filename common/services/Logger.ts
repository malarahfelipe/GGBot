
export const Logger = ({
  log: (message: string): void =>
    console.log('[Logger:log] ' + message)
})
