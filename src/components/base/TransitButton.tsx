import React from 'react'

export interface ITransitButton {
  color: {
    bg: string,
    text: string
  },
  to?: 'up' | 'down' | 'left' | 'right'
}
export const TransitButton: React.FC<ITransitButton> = ({ color: { bg, text }, to = 'up', children }) =>
  <div
    className={
      `rounded
        p-1 m-1
        cursor-pointer
        bg-${ bg } text-${ text }
        hover:text-${ bg } hover:bg-${ text }
        transform transition ease-out
        hover:${ [ 'up', 'left' ].includes(to) ? '-' : '' }translate-${ [ 'left', 'right' ].includes(to) ? 'x' : 'y' }-1`
    }
  >
    { children }
  </div>
