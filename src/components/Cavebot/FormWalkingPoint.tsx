import React from 'react'
import { ImageWP } from './styles'
import { Utils } from '../../../common/Utils'
import Row from '../base/Row'
import { WalkingPoint, ActionWalkingPoint, Action } from '../../../common/WalkingPoint'
import { CustomSelect } from '../base/CustomSelect'

export interface IFormWalkingPoint {
  wp: WalkingPoint
  usedWps?: WalkingPoint[]
}

export const FormWalkingPoint: React.FC<IFormWalkingPoint> = ({ usedWps = [], wp: { alpha, type, action } }) => {
  const optionWps =
    Utils
      .getAlphabet()
      .filter(alpha => !usedWps.find(usedWp => usedWp.alpha === alpha))
      .map((alpha, index) =>
        <ImageWP key={index} src={require(`../../assets/${ alpha }.png`).default} />
      )

  const availableActions: ActionWalkingPoint[] = [

  ]

  const optionActions = (wpAction?: Action) =>
    availableActions
      .map(({ action: { name } }, index) =>
        <option value={ name } key={index} selected={ wpAction && wpAction?.name === name }>
          { name }
        </option>
      )

  return (
    <Row>
      <label className="block">
        <span className="text-gray-700">Marcador</span>
        <CustomSelect
          className="form-select mt-1 block w-full"
          selected={Utils.getAlphabet().indexOf(alpha)}
        >
          { optionWps }
        </CustomSelect>
      </label>
      {
        type === 'action' &&
        <Row>
          <label className="block">
            <span className="text-gray-700">Ação</span>
            <select className="form-select mt-1 block w-full">
              {
                optionActions(action)
              }
            </select>
            <Row>
              <svg className="cursor-pointer w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z">
                </path>
              </svg>
              <svg className="cursor-pointer w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z">
                </path>
              </svg>
            </Row>
          </label>
        </Row>
      }
      <svg className="cursor-pointer w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z">
        </path>
      </svg>
    </Row>
  )
}
