import React from 'react'
import Row from './Row'
import { TransitButton } from './TransitButton'
import { Counter } from './Counter'

export interface IActions {
  onPlay: () => void
  onStop: () => void
}

export const Actions: React.FC<IActions> = ({
  onPlay, onStop
}) =>
  <>
    <Row className="justify-around">
      <TransitButton
        color={ { bg: 'green-500', text: 'white' } }
        onClick={onPlay}
      >
        <svg
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
        onClick={onStop}
      >
        <svg
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
  </>
