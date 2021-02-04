import React from 'react'

export interface ITransitButton {
  color: {
    bg: string,
    text: string
  },
  to?: 'up' | 'down' | 'left' | 'right'
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

export const TransitButton: React.FC<ITransitButton> = ({ onClick, color: { bg, text }, to = 'up', children }) =>
  <button
    type="button"
    onClick={onClick}
    className={
      `rounded
        px-4 py-2 m-1
        flex flex-row
        cursor-pointer
        border
        border-${ bg }
        bg-${ bg } text-${ text }
        hover:text-${ bg } hover:bg-${ text }
        transform transition ease-out
        hover:${ [ 'up', 'left' ].includes(to) ? '-' : '' }translate-${ [ 'left', 'right' ].includes(to) ? 'x' : 'y' }-1`
    }
  >
    { children }
  </button>
