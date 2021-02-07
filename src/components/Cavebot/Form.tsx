import React from 'react'
import { Utils } from '../../../common/models/Utils'
import Row from '../base/Row'
import { ActionAlpha, createActionAlpha } from '../../../common/models/ActionAlpha'
import { FormActionSelect } from './FormActionSelect'
import { TransitButton } from '../base/TransitButton'
import { ICavebotChildren } from './ICavebotChildren'

export const FormCavebot: React.FC<ICavebotChildren> = ({
  cavebot: config, setConfig
}) => {
  const createNewActionAlpha = () =>
    setConfig({
      ...config,
      actions: [
        ...config.actions,
        createActionAlpha(Utils.nextAlpha(config.actions[config.actions.length - 1]?.alpha))
      ]
    })

  const onUpdateActionAlpha = async (index: number, newActionAlpha: ActionAlpha): Promise<void> => {
    const newActions = [ ...config.actions ]
    newActions.splice(index, 1, newActionAlpha)
    await setConfig({
      ...config,
      actions: newActions
    })
  }

  return (
    <>
      <div
        className="rounded p-0.5 m-1 text-white"
      >
        <div
          className="flex flex-col rounded border border-black text-center overflow-y-scroll max-h-72">
          <label className="mx-auto inline-flex items-center border-b border-white w-full text-center">
            <span className="mx-auto">Caminho</span>
          </label>
          {
            config.actions
              .map((actionAlpha, index) =>
                <FormActionSelect
                  key={index}
                  actionAlpha={actionAlpha}
                  onSetActionAlpha={(newActionAlpha) => onUpdateActionAlpha(index, newActionAlpha)}
                />
              )
          }
          <TransitButton
            color={{ bg: 'gray-200', text: 'green-800' }}
            onClick={createNewActionAlpha}
          >
            <Row
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
      </div>
    </>
  )
}
