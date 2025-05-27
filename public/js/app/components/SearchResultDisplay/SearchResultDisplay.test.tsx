import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import SearchResultDisplay from './index'
import { useStore } from '../../mobx'
import { ERROR_ASYNC, State, STATUS } from '../../hooks/types/UseCourseSearchTypes'
import { SEARCH_DATA_EMPTY_RESULT, SEARCH_DATA_WITH_INSTANCE_RESULTS } from '../mocks/mockSearchData'
jest.mock('../../mobx')

describe('SearchResultDisplay component', () => {
  beforeEach(() => {
    ;(useStore as jest.Mock).mockReturnValue({ language: 'en', languageIndex: 0 })
  })

  test('displays SearchResultComponent when status is resolved and results are available', async () => {
    const resultsState: State = {
      searchData: SEARCH_DATA_WITH_INSTANCE_RESULTS,
      status: STATUS.resolved,
      error: null as any,
    }

    render(<SearchResultDisplay searchState={resultsState} />)

    await waitFor(() => {
      expect(screen.getByText('Standard')).toBeInTheDocument()
    })
  })

  test('displays SearchAlert when an error occurs', async () => {
    const resultsState: State = {
      searchData: SEARCH_DATA_EMPTY_RESULT,
      status: STATUS.rejected,
      error: ERROR_ASYNC.rejected,
    }

    render(<SearchResultDisplay searchState={resultsState} />)
    await waitFor(() => {
      expect(screen.getByText(/An unknown error occurred - failed to retrieve course data/i)).toBeInTheDocument()
    })
  })

  test('displays loading state when status is loading', () => {
    const resultsState: State = {
      searchData: null as any,
      status: STATUS.pending,
      error: null as any,
    }

    render(<SearchResultDisplay searchState={resultsState} />)

    expect(screen.getByText('Searching ...')).toBeInTheDocument()
  })

  test('displays no results message when status is resolved but no results', () => {
    const resultsState: State = {
      searchData: SEARCH_DATA_EMPTY_RESULT,
      status: STATUS.noHits,
      error: ERROR_ASYNC.noHits,
    }

    render(<SearchResultDisplay searchState={resultsState} />)

    expect(screen.getByText('Your search returned no results')).toBeInTheDocument()
  })

  test('displays no search params message', () => {
    const resultsState: State = {
      searchData: null as null,
      status: STATUS.noQueryProvided,
      error: ERROR_ASYNC.noQueryProvided,
    }

    render(<SearchResultDisplay searchState={resultsState} />)

    expect(screen.getByText('No query restriction was specified')).toBeInTheDocument()
  })
})
