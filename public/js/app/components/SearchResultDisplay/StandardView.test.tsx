import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import StandardView from './StandardView'
import { useStore } from '../../mobx'
import { MIXED_SEARCH_DATA_EN, SEARCH_DATA_WITH_INSTANCE_RESULTS } from '../mocks/mockSearchData'
import { CourseInstanceResult } from 'kopps-public-react-web/shared/SearchTypes'

jest.mock('../../mobx')

describe('StandardView component', () => {
  beforeEach(() => {
    ;(useStore as jest.Mock).mockReturnValue({ language: 'en', languageIndex: 0 })
  })
  afterEach(() => {
    jest.clearAllMocks()
  })

  test('renders course cards correctly', () => {
    render(<StandardView searchData={SEARCH_DATA_WITH_INSTANCE_RESULTS} />)

    expect(screen.getByText(/AF1765/i)).toBeInTheDocument()
    expect(screen.getByText(/AI1178/i)).toBeInTheDocument()
  })

  test('renders a message when no rounds are available', () => {
    const modifiedResults: CourseInstanceResult = {
      ...SEARCH_DATA_WITH_INSTANCE_RESULTS,
      results: [
        {
          ...SEARCH_DATA_WITH_INSTANCE_RESULTS.results[0],
          courseHasNoInstances: true,
        },
      ],
    }

    render(<StandardView searchData={modifiedResults} />)

    expect(screen.getByText(/Course offerings are missing for current or upcoming semesters/i)).toBeInTheDocument()
  })

  test('renders course with multiple periods correctly', () => {
    render(<StandardView searchData={MIXED_SEARCH_DATA_EN} />)

    expect(screen.getByText(/P2 Autumn 25 - P3 Spring 26/i)).toBeInTheDocument()
  })
})
