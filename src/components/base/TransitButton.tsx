import React from 'react'

export interface ITransitButton {
  color: {
    bg: string,
    text: string
  },
  to?: 'up' | 'down'
}
export const TransitButton: React.FC<ITransitButton> = ({ color: { bg, text }, to = 'up', children }) =>
  <div
    className={
      `rounded p-1 m-1 cursor-pointer bg-${ bg } text-${ text } hover:text-${ bg } hover:bg-${ text } transform transition ease-out hover:${ to === 'up' ? '-' : '' }translate-y-1`
    }
  >
    { children }
  </div>
