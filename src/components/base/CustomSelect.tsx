import React, { useState } from 'react'

export interface ICustomSelect {
  selected: number
  children: React.ReactElement[]
  className?: string
  childClassName?: string
}
export const CustomSelect: React.FC<ICustomSelect> = ({ selected, children, className, childClassName }) => {
  selected = (!selected || selected === -1) ? 0 : selected
  const [ showItems, setShowItems ] = useState(false)
  const StyledChildren = () =>
    children.map((child, index) =>
      React.cloneElement(child, {
        className: `${ child.props.className || '' } mt-1 z-50 ${ childClassName || '' } ${ !showItems && index !== selected ? 'hidden' : '' }`
      })
    )
  return (
    <div
      onClick={() => setShowItems(!showItems) }
      onBlur={() => setShowItems(false) }
      className={
        `${ className || '' } relative min-h-8 space-y-1`
      }
    >
      {
        StyledChildren()
      }
    </div>
  )
}
