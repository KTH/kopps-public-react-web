import React, { useEffect, useReducer, Dispatch } from 'react'
import { Action, ERROR_ASYNC, STATUS, SearchResponse, State } from './types/UseCourseSearchTypes'
import { SearchErrorCode } from '@kth/om-kursen-ladok-client'
import { ResultType } from '../../../../shared/dist/ResultType'

function asyncReducer<T>(state: State, action: Action): State {
  switch (action.type) {
    case 'pending':
      return { status: STATUS.pending, searchData: null, error: null }
    case 'resolved':
      return { status: STATUS.resolved, searchData: action.data, error: null }
    case 'overflow':
      return { status: STATUS.overflow, searchData: null, error: ERROR_ASYNC.overflow }
    case 'noQueryProvided':
      return { status: STATUS.noQueryProvided, searchData: null, error: ERROR_ASYNC.noQueryProvided }
    case 'noHits':
      return { status: STATUS.noHits, searchData: null, error: ERROR_ASYNC.noHits }
    case 'rejected':
      return { status: STATUS.rejected, searchData: null, error: ERROR_ASYNC.rejected }
    default:
      throw new Error(`Unhandled action type: ${(action as Action).type}`)
  }
}

const noHitsDispatch = (dispatch: Dispatch<Action>) => dispatch({ type: 'noHits' })

const errorDispatch = (errorCode: string, dispatch: Dispatch<Action>) => {
  switch (errorCode) {
    case SearchErrorCode.OVERFLOW:
      dispatch({ type: 'overflow' })
      break
    case SearchErrorCode.NO_RESTRICTIONS:
      dispatch({ type: 'noQueryProvided' })
      break

    default:
      console.error(errorCode) // TODO Benni fix logging
      dispatch({ type: 'rejected' })
      break
  }
}

function useCourseSearch(asyncCallback: () => Promise<SearchResponse>, initialState?: Partial<State>): State {
  const [state, dispatch] = useReducer<React.Reducer<State, Action>>(asyncReducer, {
    status: STATUS.idle,
    searchData: {
      results: [],
      type: ResultType.VERSION,
    },
    error: null,
    ...initialState,
  })

  useEffect(() => {
    const promise = asyncCallback()
    if (!promise) return
    dispatch({ type: 'pending' })
    promise.then(
      response => {
        const { searchData, errorCode } = response as SearchResponse
        if (errorCode) errorDispatch(errorCode, dispatch)
        else if (searchData.results && searchData.results.length === 0) noHitsDispatch(dispatch)
        // else if (!searchHits && typeof data === 'string' && data.includes('ERROR-courseSearch-'))
        //   // TODO Benni Fix this ERROR-courseSearch- searchApi.ts
        //   dispatch({ type: 'rejected', error: data })
        else dispatch({ type: 'resolved', data: response.searchData })
      },
      () => dispatch({ type: 'rejected' })
    )
  }, [asyncCallback])

  return state
}

export { useCourseSearch }
