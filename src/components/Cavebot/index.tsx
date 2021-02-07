import React, { useState } from 'react'
import { Text } from '../base/styles'
import { TutorialCavebot } from './Tutorial'
import { FormCavebot } from './Form'
import { Actions } from '../base/Actions'
import { CavebotConfig } from '../../../common/models/CavebotConfig'
import { IChildren } from '../../models/Children.interface'
import { CavebotStore } from '../../store/Cavebot'
import { Counter } from '../base/Counter'

const Cavebot: React.FC<IChildren> = ({ config, setConfig }) => {
  const { cavebot } = config
  const [ tutorial, setTutorial ] = useState(-1)
  const setCavebotConfig = (cavebotConfig: CavebotConfig) =>
    setConfig(Object.assign(config, { cavebot: cavebotConfig }))

  const startCavebot = async () => {
    const instance = await CavebotStore.getInstance()
    const onReachZero = () => instance.start()
    const { start } = Counter({ onReachZero })
    start()
  }

  const stopCavebot = async () => {
    const instance = await CavebotStore.getInstance()
    instance.stop()
  }

  return (
    <>
      <div className="w-full border-b-2 border-white py-2 px-0.5">
        <Text className="text-2xl">Cavebot</Text>
      </div>
      <TutorialCavebot tutorial={tutorial} setTutorial={setTutorial} />
      {
        cavebot && <>
          <FormCavebot cavebot={cavebot} setConfig={setCavebotConfig} />
          <Actions onPlay={startCavebot} onStop={stopCavebot} />
        </>
      }
    </>
  )
}

export default Cavebot
