import React, { useState } from 'react'

export interface ICustomSelect {
  selected: number
  children: React.ReactNode[]
  className?: string
}
export const CustomSelect: React.FC<ICustomSelect> = ({ selected, children, className }) => {
  selected = (!selected || selected === -1) ? 0 : selected
  const [ showItems, setShowItems ] = useState(false)
  return (
    <div
      onClick={() => setShowItems(true) }
      onBlur={() => setShowItems(false) }
      className={
        `${ className || '' } relative min-h-8 space-y-1`
      }
    >
      {
        children.map((child, index) =>
          <div key={index} className={ `mt-1 absolute z-50 ${ !showItems && index !== selected ? 'hidden' : '' }` }>
            { child }
          </div>
        )
      }
    </div>
  )
}
