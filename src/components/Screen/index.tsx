import React, { useState } from 'react'
import { TransitButton } from '../base/TransitButton'
import { Text } from '../Cavebot/styles'

export interface IScreen {
  started: boolean
  setStarted: React.Dispatch<React.SetStateAction<boolean>>
}
const Screen: React.FC<IScreen> = ({ started, setStarted }) => {
  const [ mark, setMarkPosition ] = useState(null)
  const onStart = (): void => {
    console.log('log')
  }

  const getMarkPosition = (): void => {
    console.log('log')
  }
  return (
    <>
      <div className="w-full border-b-2 border-white p-2">
        <Text className="text-2xl">Screen</Text>
      </div>
      {
        !started
          ? <>
            <div className="m-auto rounded">
              <TransitButton
                color={ { bg: 'green-500', text: 'white' } }
              >
                <span onClick={() => setStarted(true)}>
                  INICIAR
                </span>
              </TransitButton>
            </div>
          </>
          : <>
            {
              mark &&
                <span>{ mark } </span>
            }
            <div className="m-auto">
              <TransitButton
                color={ { bg: 'green-500', text: 'white' } }
              >
                <span onClick={getMarkPosition}>
                  GET MARK POSITION
                </span>
              </TransitButton>
            </div>
          </>
      }
    </>
  )
}

export default Screen
