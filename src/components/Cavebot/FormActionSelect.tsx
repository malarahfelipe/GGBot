import React, { useState } from 'react'
import { Utils } from '../../../common/models/Utils'
import Row from '../base/Row'
import { CustomSelect } from '../base/CustomSelect'
import { CavebotAction } from './CavebotAction'
import { ActionAlpha } from '../../../common/models/ActionAlpha'

export type CallbackActionAlpha = (wp: ActionAlpha) => unknown
export interface IFormActionSelect {
  actionAlpha: ActionAlpha
  onSetActionAlpha: CallbackActionAlpha
}

export const FormActionSelect: React.FC<IFormActionSelect> = ({ actionAlpha: { alpha, action }, onSetActionAlpha }) => {
  const [ isHover, setHover ] = useState(null)

  const optionWps =
    Utils
      .getAlphabet()
      // .filter(alpha => !usedActionAlphas.find(usedWp => usedWp.alpha === alpha))
      .map((alpha, index) =>
        <img
          onClick={() => onSetActionAlpha({ action, alpha }) }
          style={{ minWidth: '20px', maxWidth: '20px' }}
          key={index}
          src={require(`../../assets/${ alpha }.png`).default}
        />
      )

  return (
    <Row className="m-1 text-white text-center space-x-1 relative" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
      <label className="block w-full" style={ { maxWidth: '3rem' } }>
        <span>Mark</span>
        <CustomSelect
          className="form-select mt-1 block w-full rounded max-w-16"
          childClassName="transform transition ease-out hover:-translate-x-1"
          selected={Utils.getAlphabet().indexOf(alpha)}
        >
          {
            optionWps
          }
        </CustomSelect>
      </label>
      {
        action &&
          <CavebotAction action={action} />
      }
      {
        isHover &&
        <span className="absolute block w-full right-0 top-0">
          <svg className="cursor-pointer m-auto w-6 h-6 hover:text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16">
            </path>
          </svg>
        </span>
      }
    </Row>
  )
}
