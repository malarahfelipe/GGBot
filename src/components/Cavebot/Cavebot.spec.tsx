import React from 'react'
import { render } from '@testing-library/react'

import Greetings from './index'

test('Cavebot should renders', () => {
  const { getByText, getByAltText } = render(<Greetings />)

  expect(
    getByText('Start cavebot')
  ).toBeTruthy()
  expect(getByAltText('WpImage-0')).toBeTruthy()
})
