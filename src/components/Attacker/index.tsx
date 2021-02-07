import React, { useState } from 'react'
import { AttackerConfig } from '../../../common/models/AttackerConfig'
import { Text } from '../base/styles'
import { IChildren } from '../../models/Children.interface'
import { AttackerStore } from '../../store/Attacker'
import { Actions } from '../base/Actions'
import { Counter } from '../base/Counter'

const Attacker: React.FC<IChildren> = ({ config, setConfig }) => {
  const { attacker } = config
  const setAttackerConfig = (attackerConfig: AttackerConfig) =>
    setConfig(Object.assign(config, { attacker: attackerConfig }))

  const start = async () => {
    const instance = await AttackerStore.getInstance()
    const onReachZero = () => instance.start()
    const { start } = Counter({ onReachZero })
    start()
  }

  const stop = async () => {
    const instance = await AttackerStore.getInstance()
    instance.stop()
  }

  return <>
    <div className="w-full border-b-2 border-white p-2">
      <Text className="text-2xl">Attacker</Text>
    </div>
    <Actions onPlay={start} onStop={stop} />
  </>
}

export default Attacker
