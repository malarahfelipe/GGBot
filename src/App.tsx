import React from 'react'
import { render } from 'react-dom'
import { GlobalStyle } from './styles/GlobalStyle'
import './styles/tailwind.css'
import Cavebot from './components/Cavebot'

const mainElement = document.createElement('div')
mainElement.setAttribute('id', 'root')
document.body.appendChild(mainElement)

const App = () => {
  return (
    <>
      <GlobalStyle />
      <Cavebot />
    </>
  )
}

render(<App />, mainElement)
