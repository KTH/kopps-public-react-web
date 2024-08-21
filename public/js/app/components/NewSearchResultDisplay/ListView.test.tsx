import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ListView from './ListView'
import { useStore } from '../../mobx'
import { TEST_API_ANSWER_ALGEBRA } from '../mocks/mockKoppsCourseSearch'

jest.mock('../../mobx')

describe('ListView component', () => {
  beforeEach(() => {
    ;(useStore as jest.Mock).mockReturnValue({ language: 'en', languageIndex: 0 })
  })

  test('renders course cards correctly', () => {
    render(<ListView results={TEST_API_ANSWER_ALGEBRA.searchHits as any} />)

    expect(screen.getByText(/IX1303/i)).toBeInTheDocument()
    expect(screen.getByText(/SF1624/i)).toBeInTheDocument()
  })

  test.only('renders a message when no rounds are available', () => {
    const modifiedResults = {
      ...TEST_API_ANSWER_ALGEBRA,
      searchHits: [
        {
          ...TEST_API_ANSWER_ALGEBRA.searchHits[0],
          searchHitInterval: {
            startPeriod: null as any,
            endPeriod: null as any,
          },
        },
      ],
    }

    render(<ListView results={modifiedResults.searchHits as any} />)

    expect(screen.getByText(/Course offerings are missing for current or upcoming semesters/i)).toBeInTheDocument()
  })
})
