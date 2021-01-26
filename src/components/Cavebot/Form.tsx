import React, { useState } from 'react'
import { ImageWP } from './styles'
import { Utils } from '../../../common/Utils'
import { TransitOpacity } from '../base/TransitOpacity'
import Row from '../base/Row'
import { WalkingPoint, ActionWalkingPoint, Action, createWalkingPoint } from '../../../common/WalkingPoint'
import { FormWalkingPoint } from './FormWalkingPoint'
import { TransitButton } from '../base/TransitButton'

export interface IFormCavebot {
  a?: undefined
}

export const FormCavebot: React.FC<IFormCavebot> = () => {
  const loadScript = (): void => (
    undefined
  )

  const saveScript = (): void => (
    undefined
  )

  const [ walkingPoints, setWps ] = useState<WalkingPoint[]>([])
  const createNewWp = () => setWps(wps => ([ ...wps, createWalkingPoint(Utils.nextAlpha(walkingPoints[walkingPoints.length - 1]?.alpha)) ]))
  return (
    <>
      <div
        className={
          `${ '' } bg-gray-800 rounded p-0.5 m-1 text-white`
        }
      >
        <div
          className="flex flex-col rounded border border-black p-2 m-1 text-center"
        >
          <label className="mx-auto inline-flex items-center">
            <span className="ml-2 cursor-pointer">Cavebot</span>
          </label>
          {
            walkingPoints
              .map((wp, index) =>
                <FormWalkingPoint wp={wp} key={index} />
              )
          }
          <TransitButton
            color={{ bg: 'gray-200', text: 'green-800' }}
          >
            <Row
              onClick={createNewWp}
              className="mx-auto space-x-4 text-center w-max"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <span>
                Criar Novo
              </span>
            </Row>
          </TransitButton>
        </div>
        <Row className="justify-around text-center border border-white rounded text-sm tracking-wider">
          <button type="button"
            disabled
            className="hover:bg-white hover:text-black w-full"
            onClick={loadScript}
          >
            CARREGAR
          </button>
          <span>|</span>
          <button type="button"
            disabled
            className="hover:bg-white hover:text-black w-full"
            onClick={saveScript}
          >
            SALVAR
          </button>
        </Row>
      </div>
    </>
  )
}
