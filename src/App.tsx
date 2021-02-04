import React, { useState } from 'react'
import { render } from 'react-dom'
import Grid from './components/base/Grid'
import './styles/tailwind.css'
import Screen from './components/Screen'
import Cavebot from './components/Cavebot'
import { Container } from './components/Cavebot/styles'

const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
const modalElement = document.createElement('div')
modalElement.setAttribute('id', 'modal')
document.body.appendChild(modalElement)
document.body.appendChild(mainElement)

const App = () => {
  const [ started, setStarted ] = useState(false)
  return (
    <Grid className="grid-cols-12">
      <Container className="col-start-6 col-span-4 space-y-4">
        <Screen started={started} setStarted={setStarted} />
      </Container>
      <Container className={`${ !started ? 'bg-blur-md cursor-none' : '' } col-start-8 col-span-4 space-y-4`}>
        <Cavebot />
      </Container>
    </Grid>
  )
}

render(<App />, mainElement)
