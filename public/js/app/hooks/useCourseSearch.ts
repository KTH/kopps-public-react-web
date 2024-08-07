import React, { useEffect, useReducer, Dispatch } from 'react'

const STATUS = {
  pending: 'pending',
  resolved: 'resolved',
  overflow: 'overflow',
  noQueryProvided: 'noQueryProvided',
  noHits: 'noHits',
  rejected: 'rejected',
  idle: 'idle',
} as const

const ERROR_ASYNC = {
  overflow: 'errorOverflow',
  noQueryProvided: 'noQueryProvided',
  noHits: 'errorEmpty',
  rejected: 'errorUnknown',
} as const

type Status = (typeof STATUS)[keyof typeof STATUS]
// This is equivalent to => type Status = 'pending' | 'resolved' | 'overflow' | 'noQueryProvided' | 'noHits' | 'rejected' | 'idle';

type ErrorAsync = (typeof ERROR_ASYNC)[keyof typeof ERROR_ASYNC]
// This is equivalent to => type ErrorAsync = 'errorOverflow' | 'noQueryProvided' | 'errorEmpty' | 'errorUnknown';

interface State<T> {
  status: Status
  data: T | null
  error: ErrorAsync | string | null
}

type Action<T> =
  | { type: 'pending' }
  | { type: 'resolved'; data: T }
  | { type: 'overflow' }
  | { type: 'noQueryProvided' }
  | { type: 'noHits' }
  | { type: 'rejected'; error: ErrorAsync | string }

function asyncReducer<T>(state: State<T>, action: Action<T>): State<T> {
  switch (action.type) {
    case 'pending':
      return { status: STATUS.pending, data: null, error: null }
    case 'resolved':
      return { status: STATUS.resolved, data: action.data, error: null }
    case 'overflow':
      return { status: STATUS.overflow, data: null, error: ERROR_ASYNC.overflow }
    case 'noQueryProvided':
      return { status: STATUS.noQueryProvided, data: null, error: ERROR_ASYNC.noQueryProvided }
    case 'noHits':
      return { status: STATUS.noHits, data: null, error: ERROR_ASYNC.noHits }
    case 'rejected':
      return { status: STATUS.rejected, data: null, error: action.error }
    default:
      throw new Error(`Unhandled action type: ${(action as Action<T>).type}`)
  }
}

const overflowDispatch = (dispatch: Dispatch<Action<any>>) => dispatch({ type: 'overflow' })
const noHitsDispatch = (dispatch: Dispatch<Action<any>>) => dispatch({ type: 'noHits' })
const noQueryProvidedDispatch = (dispatch: Dispatch<Action<any>>) => dispatch({ type: 'noQueryProvided' })

function useCourseSearch<T>(asyncCallback: () => Promise<T>, initialState?: Partial<State<T>>): State<T> {
  const [state, dispatch] = useReducer<React.Reducer<State<T>, Action<T>>>(asyncReducer, {
    status: STATUS.idle,
    data: null,
    error: null,
    ...initialState,
  } as State<T>)

  useEffect(() => {
    const promise = asyncCallback()
    if (!promise) return
    dispatch({ type: 'pending' })
    promise.then(
      data => {
        const { searchHits, errorCode } = data as any
        if (errorCode && errorCode === 'search-error-overflow') overflowDispatch(dispatch)
        else if (errorCode) dispatch({ type: 'rejected', error: errorCode })
        else if (searchHits && searchHits.length === 0) noHitsDispatch(dispatch)
        else if (!searchHits && typeof data === "string" && data.includes("ERROR-koppsCourseSearch-")) dispatch({ type: 'rejected', error: data })
        else if (!searchHits || data === 'No query restriction was specified') noQueryProvidedDispatch(dispatch)
        else dispatch({ type: 'resolved', data })
      },
      error => dispatch({ type: 'rejected', error: ERROR_ASYNC.rejected })
    )
  }, [asyncCallback])

  return state
}

export { STATUS, ERROR_ASYNC, useCourseSearch }
