import React, { Dispatch, SetStateAction, useState } from 'react'
import set from 'lodash.set'
import { openConfirmModal } from '../base/Modal'
import { onChangeInput, ChangeInputEvent } from '../base/use.input'
import flow from 'lodash.flow'
import { CAVEBOT_ACTIONS } from '../../../common/models/CavebotActions.enum'
import { RendererAction } from '../../models/Action.renderer'
import { AvailableAction, ActionKeyed } from '../../../common/models/Actions'

export interface IUsingCavebot {
  onChooseAction: (valueChange: ChangeInputEvent) => void
}

export type IUseCavebot = [ActionKeyed, Dispatch<SetStateAction<ActionKeyed>>]

export const useCavebotActions = ([ oldActions, setActions ]: IUseCavebot): IUsingCavebot => {
  const [ actions, setCurrentActions ] = useState(oldActions)

  const onSaveAction = () => setActions(actions)

  const onChangeAction = (action: AvailableAction, path: string, value: any) =>
    setCurrentActions(set(actions, `${ action }${ path }`, value))

  const onChangeMinCap = flow(
    onChangeInput,
    (value) => onChangeAction('Checar supply', 'value.minCap', value)
  )

  const onChangeRefill = flow(
    onChangeInput,
    (value) => onChangeAction('Refilar mana', 'value.mana', value)
  )

  const onChangeSupply = (key: string) =>
    flow(
      onChangeInput,
      (value) => onChangeAction('Checar supply', `value.keys.${ key }`, value)
    )

  const allPossibleKeys = new Array(11)
    .fill(null)
    .map((_, index) => `f${ index + 1 }`)

  const availableKeysForSupply = () =>
    allPossibleKeys.filter(fKey => !actions['Checar supply']?.value.keys.find(({ key }) => fKey === key))

  const availableActions: [
    RendererAction<any, 'Andar'>,
    RendererAction<any, 'Checar supply'>,
    RendererAction<any, 'Refilar mana'>
  ] = [
    {
      name: 'Andar'
    },
    {
      name: 'Checar supply',
      children: (
        <>
          <label className="block">
            <span>Cap</span>
            <input className="block form-input" placeholder="( Ex: 150 )" type="number" value={actions['Checar supply']?.value?.minCap} onChange={onChangeMinCap} />
          </label>
          {
            actions['Checar supply']?.value?.keys
              .map(({ key, value }, index) =>
                <label className="block w-full" key={index}>
                  <span>{key}</span>
                  <select className="w-full block text-black" defaultValue={key}>
                    {
                      availableKeysForSupply()
                        .map((key: string, index) =>
                          <option key={index} value={key}>{ key }</option>
                        )
                    }
                  </select>
                  <span>menor que</span>
                  <input value={value || ''} onChange={onChangeSupply(key)} />
                </label>
              )
          }
        </>
      ),
      handler: CAVEBOT_ACTIONS.checkSupply
    },
    {
      name: 'Refilar mana',
      children: (
        <label className="block">
          <span className="text-gray-700">Porcentagem</span>
          <input
            type="number"
            className="form-input mt-1 block w-full"
            placeholder="( Ex: 50% )"
            max="100"
            value={ actions['Refilar mana']?.value.mana }
            onChange={onChangeRefill}
          />
        </label>
      ),
      handler: CAVEBOT_ACTIONS.refillMana
    }
  ]

  const onChooseAction = flow(
    onChangeInput,
    (actionName: string) => {
      const index = availableActions.findIndex(({ name }) => actionName === name)

      if (!availableActions[index].children)
        return onSaveAction()

      const oldValue = { ...actions[availableActions[index].name] }.value

      return openConfirmModal(
        {
          title: availableActions[index].name,
          children: availableActions[index].children,
          onConfirm: onSaveAction,
          onCancel: () =>
            onChangeAction(availableActions[index].name, 'value', oldValue ?? 0)
        }
      )
    }
  )

  return {
    onChooseAction
  }
}
