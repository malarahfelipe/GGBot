import { ChangeEvent } from 'react'

export type ChangeInputEvent = ChangeEvent<HTMLElement & { value: string }>

export const onChangeInput =
  ({ currentTarget: { value } }: ChangeInputEvent): string =>
    value
