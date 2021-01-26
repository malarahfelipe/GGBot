import React, { useState } from 'react'
import { Container, Text } from './styles'
import { ipcRenderer } from 'electron'
import Grid from '../base/Grid'
import { TutorialCavebot } from './Tutorial'
import { FormCavebot } from './Form'

const Cavebot: React.FC = () => {
  ipcRenderer.on('repong', (_, args) => console.log('args', args))
  ipcRenderer.on('capture', (_, args) => console.log('capture args', args))
  ipcRenderer.send('ping', { message: `${ 'a' } that's actually a pong !` })
  const goToNext = () => ipcRenderer.send('cavebot_goToNext')

  const [ tutorial, setTutorial ] = useState(-1)
  return (
    <Grid className="grid-cols-12">
      <Container className="col-start-8 col-span-4 space-y-4">
        <div className="w-full border-b-2 border-white p-2">
          <Text className="text-2xl" onClick={goToNext}>Cavebot</Text>
        </div>
        <TutorialCavebot tutorial={tutorial} setTutorial={setTutorial} />
        <FormCavebot />
      </Container>
    </Grid>
  )
}

export default Cavebot
