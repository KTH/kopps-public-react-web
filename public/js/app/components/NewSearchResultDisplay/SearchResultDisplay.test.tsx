import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import NewSearchResultDisplay from './index'
import { useStore } from '../../mobx'
import {
  TEST_API_ANSWER_ALGEBRA,
  TEST_API_ANSWER_EMPTY_PARAMS,
  TEST_API_ANSWER_NO_HITS,
  TEST_API_ANSWER_UNKNOWN_ERROR,
} from '../mocks/mockKoppsCourseSearch'
import { Status, ErrorAsync, ERROR_ASYNC, STATUS } from '../../hooks/types/UseCourseSearchTypes'
import SearchAlert from '../SearchAlert'

jest.mock('../../mobx')
describe('NewSearchResultDisplay component', () => {
  beforeEach(() => {
    ;(useStore as jest.Mock).mockReturnValue({ languageIndex: 0 })
  })

  test('displays SearchResultComponent when status is resolved and results are available', async () => {
    const resultsState = {
      data: TEST_API_ANSWER_ALGEBRA,
      status: STATUS.resolved,
      error: null as any,
    }

    render(<NewSearchResultDisplay resultsState={resultsState} />)

    await waitFor(() => {
      expect(screen.getByText('Standard')).toBeInTheDocument()
    })
  })

  test('displays SearchAlert when an error occurs', async () => {
    const resultsState = {
      data: null as any,
      status: STATUS.rejected as any,
      error: ERROR_ASYNC.rejected as any,
    }

    render(<NewSearchResultDisplay resultsState={resultsState} />)
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

    render(<NewSearchResultDisplay resultsState={resultsState} />)

    expect(screen.getByText('Searching ...')).toBeInTheDocument()
  })

  test('displays no results message when status is resolved but no results', () => {
    const resultsState = {
      data: null as any,
      status: STATUS.noHits,
      error: ERROR_ASYNC.noHits as any,
    }

    render(<NewSearchResultDisplay resultsState={resultsState} />)

    expect(screen.getByText('Your search returned no results')).toBeInTheDocument()
  })
})
