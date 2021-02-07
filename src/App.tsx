import React, { useState } from 'react'
import { render } from 'react-dom'
import Grid from './components/base/Grid'
import './styles/tailwind.css'
import Screen from './components/Screen'
import Cavebot from './components/Cavebot'
import Healer from './components/Healer'
import Attacker from './components/Attacker'
import { Container } from './components/base/styles'
import { Config } from '../common/models/Config'
import { GlobalStyle } from './styles/GlobalStyle'
import { ConfigStore } from './store/Config'

const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
const modalElement = document.createElement('div')
modalElement.setAttribute('id', 'modal')
document.body.classList.add('overflow-y-hidden')
document.body.appendChild(modalElement)
document.body.appendChild(mainElement)

const App = () => {
  const [ started, setStarted ] = useState(false)
  const notStartedClasses = 'blur-md cursor-not-allowed pointer-events-none'
  const [ config, setConfig ] = useState(new Config())

  const onSetStarted = async (value: boolean) => {
    const instance = await ConfigStore.getInstance()
    const config = instance.getConfig()
    console.log('config', config)
    setConfig(config)
    setStarted(value)
  }

  const onSetConfig = async (newConfig: Config) => {
    setConfig(newConfig)
    const instance = await ConfigStore.getInstance()
    await instance.setConfig(newConfig)
  }

  return <>
    <GlobalStyle />
    {
      config &&
      <Grid className="grid-cols-5">
        {
          (started &&
            <>
              <Container className="col-start-3 space-y-4">
                <Healer config={config} setConfig={onSetConfig}/>
              </Container>
              <Container className="space-y-4">
                <Attacker config={config} setConfig={onSetConfig}/>
              </Container>
              <Container className="space-y-4">
                <Cavebot config={config} setConfig={onSetConfig}/>
              </Container>
            </>
          ) ||
          <Container className="col-span-5 space-y-2 text-center">
            <Screen setStarted={onSetStarted} />
          </Container>
        }
      </Grid>
    }
  </>
}

render(<App />, mainElement)
