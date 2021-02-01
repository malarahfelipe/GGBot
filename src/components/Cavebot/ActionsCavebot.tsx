import React from 'react'
import Row from '../base/Row'
import { ICavebotChildren } from './ICavebotChildren'
import { TransitButton } from '../base/TransitButton'
import { CavebotStore } from '../../store/Cavebot'

export const ActionsCavebot: React.FC<ICavebotChildren> = ({
  config, getConfigs, setConfig
}) => {
  let startCavebotHandler: number = null
  const loadConfigs = async (): Promise<void> => {
    const configs = await getConfigs()
    console.log('configs', configs)
    if (!configs || !configs.length) return

    setConfig(configs[0])
  }

  const startCavebot = () =>
    setTimeout(async () => {
      const instance = await CavebotStore.getInstance()
      startCavebotHandler = setInterval(() => instance.goToNextWp(), 4000)
    }
    , 2000)

  const stopCavebot = () =>
    clearInterval(startCavebotHandler)

  return (
    <>
      {
        config &&
        (
          <Row>
            <TransitButton
              color={ { bg: 'green-500', text: 'white' } }
            >
              <svg
                onClick={startCavebot}
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </TransitButton>
            <TransitButton
              color={ { bg: 'red-500', text: 'white' } }
            >
              <svg
                onClick={stopCavebot}
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 9v6m4-6v6m7-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </TransitButton>
          </Row>
        )
      }
      <Row className="justify-around text-center border border-white rounded text-sm tracking-wider">
        <button type="button"
          className="hover:bg-white hover:text-black w-full"
          onClick={loadConfigs}
        >
          CARREGAR
        </button>
        <span>|</span>
        <button type="button"
          className="hover:bg-white hover:text-black w-full"
          onClick={() => setConfig(config)}
        >
          SALVAR
        </button>
      </Row>
    </>
  )
}
