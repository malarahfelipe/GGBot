import React, { useState } from 'react'
import { HealerConfig } from '../../../common/models/HealerConfig'
import { Text } from '../base/styles'
import { IChildren } from '../../models/Children.interface'
import { HealerStore } from '../../store/Healer'
import { Actions } from '../base/Actions'
import { Counter } from '../base/Counter'

const Healer: React.FC<IChildren> = ({ config, setConfig }) => {
  const { healer } = config
  const setHealerConfig = (healerConfig: HealerConfig) =>
    setConfig(Object.assign(config, { healer: healerConfig }))

  const start = async () => {
    const instance = await HealerStore.getInstance()
    const onReachZero = () => instance.start()
    const { start } = Counter({ onReachZero })
    start()
  }

  const stop = async () => {
    const instance = await HealerStore.getInstance()
    instance.stop()
  }

  return <>
    <div className="w-full border-b-2 border-white p-2">
      <Text className="text-2xl">Healer</Text>
    </div>
    <Actions onPlay={start} onStop={stop} />
  </>
}

export default Healer
