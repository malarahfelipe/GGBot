import React from 'react'

export interface ITransitOpacity { className?: string, show: boolean }
export const TransitOpacity: React.FC<ITransitOpacity> = ({ children, className, show }) =>
  <div className={`opacity-${ show ? '100' : '0' } transition-opacity delay-300 ease-in-out ${ className || '' }`} >
    { children }
  </div>
