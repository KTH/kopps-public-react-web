import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import SearchResultDisplay from './index'
import { useStore } from '../../mobx'
import {
  TEST_API_ANSWER_NO_HITS,
  TEST_API_ANSWER_RESOLVED,
  TEST_API_ANSWER_UNKNOWN_ERROR,
} from '../mocks/mockKoppsCourseSearch'
import { ERROR_ASYNC, STATUS } from '../../hooks/types/UseCourseSearchTypes'
jest.mock('../../mobx')
describe('SearchResultDisplay component', () => {
  beforeEach(() => {
    ;(useStore as jest.Mock).mockReturnValue({ languageIndex: 0 })
  })

  test('displays SearchResultComponent when status is resolved and results are available', async () => {
    const resultsState = {
      data: TEST_API_ANSWER_RESOLVED,
      status: STATUS.resolved,
      error: null as any,
    }

    render(<SearchResultDisplay resultsState={resultsState} />)

    await waitFor(() => {
      expect(screen.getByText('Standard')).toBeInTheDocument()
    })
  })

  test('displays SearchAlert when an error occurs', async () => {
    const resultsState = {
      data: TEST_API_ANSWER_UNKNOWN_ERROR,
      status: STATUS.rejected,
      error: ERROR_ASYNC.rejected,
    }

    render(<SearchResultDisplay resultsState={resultsState} />)
    await waitFor(() => {
      expect(screen.getByText(/An unknown error occurred - failed to retrieve course data/i)).toBeInTheDocument()
    })
  })

  test('displays loading state when status is loading', () => {
    const resultsState = {
      data: null as any,
      status: STATUS.pending,
      error: null as any,
    }

    render(<SearchResultDisplay resultsState={resultsState} />)

    expect(screen.getByText('Searching ...')).toBeInTheDocument()
  })

  test('displays no results message when status is resolved but no results', () => {
    const resultsState = {
      data: TEST_API_ANSWER_NO_HITS,
      status: STATUS.noHits,
      error: ERROR_ASYNC.noHits,
    }

    render(<SearchResultDisplay resultsState={resultsState} />)

    expect(screen.getByText('Your search returned no results')).toBeInTheDocument()
  })

  test('displays no search params message', () => {
    const resultsState = { data: null as null, status: STATUS.noQueryProvided, error: ERROR_ASYNC.noQueryProvided }

    render(<SearchResultDisplay resultsState={resultsState} />)

    expect(screen.getByText('No query restriction was specified')).toBeInTheDocument()
  })
})
