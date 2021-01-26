import React from 'react'

import { Container, ImageWP, Title } from './styles'
import { ipcRenderer } from 'electron'
import { Utils } from '../../../common/Utils'
import Row from '../base/Row'
import Grid from '../base/Grid'

const Cavebot: React.FC = () => {
  ipcRenderer.on('repong', (_, args) => console.log('args', args))
  ipcRenderer.on('capture', (_, args) => console.log('capture args', args))
  ipcRenderer.send('ping', { message: `${'a'} that's actually a pong !` })
  const goToNext = () => ipcRenderer.send('cavebot_goToNext')
  return (
    <Grid className="grid-cols-12">
      <Container className="col-start-8">
        <Title onClick={goToNext}>Cavebot</Title>
        <Row className="space-x-3">
          {
            Utils.getAlphabet()
              .map((alpha, index) =>
                <ImageWP
                  key={index}
                  // eslint-disable-next-line @typescript-eslint/no-var-requires
                  src={require(`../../assets/${alpha}.png`).default}
                  alt={`Wp-${index}`}
                />
              )
          }
        </Row>
      </Container>
    </Grid>
  )
}

export default Cavebot
