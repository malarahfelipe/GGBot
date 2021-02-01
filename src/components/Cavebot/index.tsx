import React, { useState } from 'react'
import { Container, Text } from './styles'
import Grid from '../base/Grid'
import { TutorialCavebot } from './Tutorial'
import { FormCavebot } from './Form'
import { ActionsCavebot } from './ActionsCavebot'
import { CavebotConfig } from '../../../common/models/CavebotConfig'
import { CavebotStore } from '../../store/Cavebot'

const Cavebot: React.FC = () => {
  const [ tutorial, setTutorial ] = useState(-1)
  const [ config, setConfig ] = useState<CavebotConfig>()

  const getConfigs = (): Promise<CavebotConfig[]> =>
    CavebotStore
      .getInstance()
      .then(instance =>
        instance.load()
          .then(() =>
            instance.getConfigs()
          )
      )

  const onSetConfig = (config: CavebotConfig) =>
    CavebotStore
      .getInstance()
      .then(instance =>
        instance.setConfig(config)
      )
      .then(setConfig)

  return (
    <Grid className="grid-cols-12">
      <Container className="col-start-8 col-span-4 space-y-4">
        <div className="w-full border-b-2 border-white p-2">
          <Text className="text-2xl">Cavebot</Text>
        </div>
        <TutorialCavebot tutorial={tutorial} setTutorial={setTutorial} />
        {
          config &&
          <FormCavebot config={config} setConfig={onSetConfig} />
        }
        <ActionsCavebot config={config} getConfigs={getConfigs} setConfig={onSetConfig} />
      </Container>
    </Grid>
  )
}

export default Cavebot
