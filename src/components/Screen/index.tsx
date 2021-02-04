import React, { useState } from 'react'
import { TransitButton } from '../base/TransitButton'
import { Text } from '../Cavebot/styles'
import { ScreenStore } from '../../store/Screen'

export interface IScreen {
  setStarted: React.Dispatch<React.SetStateAction<boolean>>
}
const Screen: React.FC<IScreen> = ({ setStarted }) => {
  // const [ whichAlpha, setWhichAlpha ] = useState(null)
  const [ counter, setCounter ] = useState(0)

  const onStart = async (): Promise<void> => {
    const instance = await ScreenStore.getInstance()
    setCounter(3)
    const interval = setInterval(() => setCounter((counter) => counter - 1), 1000)
    setTimeout(async () => {
      console.log('screenShotHiggsPosition', await instance.screenShotHiggsPosition())
      clearInterval(interval)
      setCounter(0)
      setStarted(true)
    }
    , 3000)
  }
  /*
  const onWhichAlpha = async (): Promise<void> => {
    const instance = await ScreenStore.getInstance()
    setCounter(3)
    const interval = setInterval(() => setCounter((counter) => counter - 1), 1000)
    setTimeout(async () => {
      const response = await instance.invoke('test_whichAlpha')
      console.log('whichAlpha', response)
      setWhichAlpha(response)
      clearInterval(interval)
      setCounter(0)
    }
    , 3000)
  }
  */
  return (
    <>
      <div className="w-full border-b-2 border-white p-2">
        <Text className="text-2xl">Início</Text>
      </div>
      <div className="flex flex-col m-auto space-y-3">
        <p>Atenção, para iniciar o bot esteja com seu char logado.</p>
        <p>Quando clicar abaixo em <span className="font-bold">INICIAR</span>, abra a tela do jogo em até 3 segundos e depois volte aqui ;)</p>
        <TransitButton
          color={ { bg: 'green-500', text: 'white' } }
          onClick={onStart}
        >
          <span className="font-normal mx-auto">
            INICIAR
          </span>
        </TransitButton>
        {
          counter > 0 &&
          <span className="text-7xl mx-auto text-white animate-ping">{ counter }</span>
        }
        {
          false &&
          <TransitButton
            color={ { bg: 'green-500', text: 'white' } }
            // onClick={onWhichAlpha}
          >
            <span className="font-normal mx-auto">
              WHICH ALPHA
            </span>
          </TransitButton>
        }
      </div>
    </>
  )
}

export default Screen
