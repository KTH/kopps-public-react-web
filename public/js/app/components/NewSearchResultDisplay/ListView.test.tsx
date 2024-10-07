import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import ListView from './ListView'
import { useStore } from '../../mobx'
import { TEST_API_ANSWER_RESOLVED } from '../mocks/mockCourseSeasrch'

jest.mock('../../mobx')

describe('ListView component', () => {
  beforeEach(() => {
    ;(useStore as jest.Mock).mockReturnValue({ language: 'en', languageIndex: 0 })
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders course cards correctly', () => {
    render(<ListView results={TEST_API_ANSWER_RESOLVED.searchHits} />)

    expect(screen.getByText(/AF2402/i)).toBeInTheDocument()
    expect(screen.getByText(/AH2905/i)).toBeInTheDocument()
  })

  test('renders a message when no rounds are available', () => {
    const modifiedResults = {
      ...TEST_API_ANSWER_RESOLVED,
      searchHits: [
        {
          ...TEST_API_ANSWER_RESOLVED.searchHits[0],
          period: [
            {
              forstaUndervisningsdatum: {
                period: null as any,
              },
            },
          ],
        },
      ],
    }

    render(<ListView results={modifiedResults.searchHits} />)

    expect(screen.getByText(/Course offerings are missing for current or upcoming semesters/i)).toBeInTheDocument()
  })

  test('renders course with multiple periods correctly', () => {
    const modifiedResults = {
      ...TEST_API_ANSWER_RESOLVED,
      searchHits: [
        {
          ...TEST_API_ANSWER_RESOLVED.searchHits[0],
          searchHitInterval: {
            startTerm: '20212',
            endTerm: '20221',
            startPeriod: 1,
            endPeriod: 3,
          },
        },
      ],
    }

    render(<ListView results={modifiedResults.searchHits} />)

    expect(screen.getByText(/P1 Autumn 21 - P3 Spring 22/i)).toBeInTheDocument()
  })
})
