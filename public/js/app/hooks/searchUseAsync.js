import React, { useEffect } from 'react'

const STATUS = {
  pending: 'pending',
  resolved: 'resolved',
  overflow: 'overflow',
  noQueryProvided: 'noQueryProvided',
  noHits: 'noHits',
  rejected: 'rejected',
}
const ERROR_ASYNC = {
  overflow: 'errorOverflow',
  noQueryProvided: 'noQueryProvided',
  noHits: 'errorEmpty',
  rejected: 'errorUnknown',
}

function asyncReducer(state, action) {
  switch (action.type) {
    case 'pending': {
      return { status: STATUS.pending, data: null, error: null }
    }
    case 'resolved': {
      return { status: STATUS.resolved, data: action.data, error: null }
    }
    case 'overflow': {
      return { status: STATUS.overflow, data: null, error: ERROR_ASYNC.overflow }
    }
    case 'noQueryProvided': {
      return { status: STATUS.noQueryProvided, data: null, error: ERROR_ASYNC.noQueryProvided }
    }
    case 'noHits': {
      return { status: STATUS.noHits, data: null, error: ERROR_ASYNC.noHits }
    }
    case 'rejected': {
      return { status: STATUS.rejected, data: null, error: ERROR_ASYNC.rejected } // for debug use: action.error
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function useAsync(asyncCallback, initialState) {
  const [state, dispatch] = React.useReducer(asyncReducer, {
    status: STATUS.idle,
    data: null,
    error: null,
    ...initialState,
  })
  useEffect(() => {
    const promise = asyncCallback()
    if (!promise) return
    dispatch({ type: STATUS.pending })
    promise.then(
      data => {
        const { searchHits, errorCode } = data
        if (errorCode && errorCode === 'search-error-overflow') dispatch({ type: STATUS.overflow })
        else if (searchHits && searchHits.length === 0) dispatch({ type: STATUS.noHits })
        else if (!searchHits && data === 'No query restriction was specified')
          dispatch({ type: STATUS.noQueryProvided })
        else dispatch({ type: STATUS.resolved, data })
      },
      error => dispatch({ type: STATUS.rejected, error }) // 'search-error-unknown'
    )
  }, [asyncCallback])

  return state
}

export { STATUS, ERROR_ASYNC, useAsync }
