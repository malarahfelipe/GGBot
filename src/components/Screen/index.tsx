import React from 'react'
import { TransitButton } from '../base/TransitButton'
import { Text } from '../Cavebot/styles'
import { Counter } from '../base/Counter'
import { ScreenStore } from '../../store/Screen'

export interface IScreen {
  setStarted: React.Dispatch<React.SetStateAction<boolean>>
}
const Screen: React.FC<IScreen> = ({ setStarted }) => {
  // const [ whichAlpha, setWhichAlpha ] = useState(null)

  const onStart = (): void => {
    const onReachZero = async () => {
      const instance = await ScreenStore.getInstance()
      const higgs = await instance.screenShotHiggsPosition()
      console.log('higgs', higgs)
      if (higgs) setStarted(true)
    }
    const { start } = Counter({ onReachZero })
    return start()
  }

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
      </div>
    </>
  )
}

export default Screen
