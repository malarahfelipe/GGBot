import styled, { keyframes } from 'styled-components'

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`

export const Container = styled.div`
    height: 100vh;
    padding: 25px;
    display: flex;
    flex-direction: column;
`

export const ImageWP = styled.img`
  max-width: 25px;
  min-width: 25px;
`
export const Text = styled.p`
  font-weight: bold;
`

export const Title = styled(Text)`
  @apply border-b-2 border-white;
`
