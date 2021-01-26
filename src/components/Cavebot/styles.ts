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
    align-items: center;
    justify-content: center;
`

export const ImageWP = styled.img`
    width: 50px;
`
export const Text = styled.p`
    margin-top: 35px;
    font-size: 20px;
    font-weight: bold;
`

export const Title = styled(Text)`
  @apply border-b-2 border-white;
`
