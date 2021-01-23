
import { WP_IMAGES } from '@/assets';
import { useState } from "preact/hooks"
import { FunctionalComponent, h } from 'preact';
import Alphabet from '../Alphabet';
import { Utils } from '@/models/Utils';
import { ACTIONS } from '@/models/Action';

export type WalkingPoint = {
  alphabet: string,
  title: string
  type: 'walk' | 'action'
  action?: () => void
}
const Cavebot: FunctionalComponent<{ }> = props => {

    const [ showTutorial, setShowTutorial ] = useState(true)
    const [ startCavebot, setStartCavebot ] = useState(false)
    const [ newWp, setNewWp ] = useState<WalkingPoint>(
      {
        alphabet:
          Utils
          .getAlphabet()
          .pop(),
        title: 'Andar',
        type: 'walk'
      }
    )
    console.log('ACTIONS', ACTIONS)
    return (
      <div class="bg-tibia_1-100 h-full min-h-64 p-2">
        <span class="text-lg font-bold text-gray-700 tracking-wider">
          Cavebot
        </span>
        {
          showTutorial &&
          <div class="border-t border-gray-800 flex flex-col space-y-1">
            <div class="m-1 p-2 py-1 flex flex-col space-y-2 rounded-sm border border-gray-700 transition-opacity duration-700 ease-in-out">
              <span class="border-b border-gray-400 flex flex-row align-items-end py-2">
                <Alphabet text="Atenção" />
              </span>
              <span class="text-xs text-center tracking-wide">
                Para utilizar o cavebot, você deve marcar os seguintes pontos no mapa:
                <span class="flex flex-row space-x-2 mx-auto w-max">
                  {
                    WP_IMAGES
                    .map(({ image }) =>
                      <img src={ image } />
                    )
                  }
                </span>
                <span class="text-xxs">( não há necessidade de ser nesta ordem )</span>
              </span>
              <label class="inline-flex select-none cursor-pointer items-center text-xs text-gray-600 mt-2 border-t border-gray-400 pt-2" onClick={() => setShowTutorial(!showTutorial)}>
                <input type="checkbox" class="form-checkbox rounded" checked={showTutorial} />
                <span class="ml-2">Não ver mais tutorial</span>
              </label>
            </div>
          </div>
        }
        <div className="flex flex-col space-y-2 m-1">
          {
            !startCavebot &&
              <button type="button" className="bg-green-800 px-2 py-1 text-white text-center rounded-sm flex flex-row space-x-2" onClick={() => setStartCavebot}>
                <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                <span>
                  Start cavebot
                </span>
              </button>
          }
          {
            startCavebot &&
            newWp &&
            <div className="transition-opacity duration-700 ease-in-out opacity-0">

              <label class="block">
                <span class="text-gray-700">Checkpoint</span>
                <select class="form-select mt-1 block w-full" value={ newWp.alphabet }>
                  {
                    WP_IMAGES
                      .map(({ alphabet, image }) =>
                        <option value={ alphabet } onClick={() => setNewWp({ ...newWp, alphabet })}>
                          <img src={image} />
                        </option>
                    )
                  }
                </select>
              </label>

              <label class="block">
                <span class="text-gray-700">Ação</span>
                <select class="form-select mt-1 block w-full" value={ newWp.type }>
                  <option value="walk" onClick={() => setNewWp({ ...newWp, type: 'walk' })}>
                    Andar
                  </option>
                  <option value="action" onClick={() => setNewWp({ ...newWp, type: 'action' })}>
                    Especial
                  </option>
                </select>
              </label>

              {
                newWp.type === 'action' &&
                <label class="block">
                  <span class="text-gray-700">Tipo de Ação</span>
                  <select class="form-select mt-1 block w-full" value={ newWp.type }>
                    {
                      ACTIONS
                        .map(({ title, action }) =>
                          <option value="action" onClick={() => setNewWp({ ...newWp, title, action })}>
                          </option>
                        )
                    }
                  </select>
                </label>
              }

            </div>
          }
        </div>
      </div>
    );
  }
export default Cavebot
