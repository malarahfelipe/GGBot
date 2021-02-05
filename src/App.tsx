import React, { useState } from 'react'
import { render } from 'react-dom'
import Grid from './components/base/Grid'
import './styles/tailwind.css'
import Screen from './components/Screen'
import Cavebot from './components/Cavebot'
import { Container } from './components/Cavebot/styles'
import { GlobalStyle } from './styles/GlobalStyle'

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
  return <>
    <GlobalStyle />
    <Grid className="grid-cols-12">
      <Container className={`${ !started ? `${ notStartedClasses } col-span-2` : 'col-span-3' } space-y-4`}>
        <Cavebot />
      </Container>
      <Container className={`${ !started ? `${ notStartedClasses } col-span-2` : 'col-span-3' } space-y-4`}>
        <Cavebot />
      </Container>
      {
        !started &&
        <Container className="col-span-4 space-y-2">
          <Screen setStarted={setStarted} />
        </Container>
      }
      <Container className={`${ !started ? `${ notStartedClasses } col-span-2` : 'col-span-3' } space-y-4`}>
        <Cavebot />
      </Container>
      <Container className={`${ !started ? `${ notStartedClasses } col-span-2` : 'col-span-3' } space-y-4`}>
        <Cavebot />
      </Container>
    </Grid>
  </>
}

render(<App />, mainElement)
