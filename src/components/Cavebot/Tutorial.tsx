import React from 'react'
import { ImageWP } from './styles'
import { Utils } from '../../../common/Utils'
import { TransitOpacity } from '../base/TransitOpacity'
import Row from '../base/Row'

export interface ITutorialCavebot {
  tutorial: number,
  setTutorial: (tutorial: number) => void
}

export const TutorialCavebot: React.FC<ITutorialCavebot> = ({ tutorial, setTutorial }) =>
  <div className="border rounded border-white">
    <div
      className={
        `bg-gray-200 rounded p-0.5 m-1 cursor-pointer text-gray-600 hover:text-white hover:${ tutorial === -1 ? 'bg-gray-800' : 'bg-red-800' } transform transition ease-out hover:-translate-y-1`
      }
      onClick={() => setTutorial(tutorial === -1 ? 0 : -1) }
    >
      <div
        className="flex rounded border border-black p-2 m-1 cursor-pointer text-center"
      >
        <label className="mx-auto inline-flex items-center cursor-pointer">
          {
            tutorial === -1 &&
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          }
          {
            tutorial !== -1 &&
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          }
          <span className="ml-2 cursor-pointer">{ tutorial === -1 ? 'Iniciar' : 'Fechar' } Tutorial</span>
        </label>
      </div>
    </div>
    {
      tutorial !== -1 &&
      <TransitOpacity
        show={tutorial !== -1}
        className="flex flex-col space-y-4 text-center text-white p-2 border border-white rounded"
      >
        <TransitOpacity
          show={tutorial === 0}
          className="flex flex-col space-y-2"
        >
          <p className="text-normal">Primeiramente, você ira marcar os seguintes pontos no mapa: </p>
          <Row className="space-x-3 mx-auto">
            {
              Utils.getAlphabet()
                .map((alpha, index) =>
                  <ImageWP
                    key={index}
                    // eslint-disable-next-line @typescript-eslint/no-var-requires
                    src={require(`../../assets/${ alpha }.png`).default}
                    alt={`Wp-${ index }`}
                  />
                )
            }
          </Row>
          <p className="text-sm italic text-gray-300"> ( não precisa ser em sequência )</p>
        </TransitOpacity>
        <Row className="justify-between">
          <TransitOpacity
            show={tutorial !== 0}
          >
            {
              tutorial !== 0 &&
              <svg
                onClick={() => setTutorial(tutorial - 1)}
                className="w-6 h-6 cursor-pointer transform delay-150 transition hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path>
              </svg>
            }
          </TransitOpacity>
          <TransitOpacity
            show={tutorial < 5}
          >
            {
              tutorial < 5 &&
              <svg
                onClick={() => setTutorial(tutorial + 1)}
                className="w-6 h-6 cursor-pointer transform delay-150 transition hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path>
              </svg>
            }
          </TransitOpacity>
        </Row>
      </TransitOpacity>
    }
  </div>
