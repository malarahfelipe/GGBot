import React, { useState } from 'react'
import { useCavebotActions } from './CavebotActionForm'
import { ActionKeyed, Action } from '../../../common/models/Actions'

export interface ICavebotAction {
  action: Action
}

export const CavebotAction: React.FC<ICavebotAction> = ({ action }) => {
  const [ actions, setActions ] = useState<ActionKeyed>({} as ActionKeyed)

  const { onChooseAction } = useCavebotActions([ actions, setActions ])

  return (
    <>
      <label className="block w-full min-w-max">
        <span>Ação</span>
        <select className="form-select mt-1 block w-full rounded text-black" defaultValue={ action.name } onChange={onChooseAction}>
          {
            Object.entries(actions)
              .map(([ actionName ], index) =>
                <option value={ actionName } key={index}>
                  { actionName }
                </option>
              )
          }
        </select>
      </label>
    </>
  )
}
