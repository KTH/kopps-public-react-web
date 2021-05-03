import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { observer } from 'mobx-react'
import { useStore } from '../mobx'
import { Link, PageHeading, SortableTable } from '@kth/kth-reactstrap/dist/components/studinfo'
import Article from './Article'
import SearchTableView from './SearchTableView'

import i18n from '../../../../i18n'
import { courseLink } from '../util/links'

function _getThisHost(thisHostBaseUrl) {
  return thisHostBaseUrl.slice(-1) === '/' ? thisHostBaseUrl.slice(0, -1) : thisHostBaseUrl
}
async function koppsCourseSearch(language, proxyUrl, textPattern) {
  try {
    const result = await axios.get(`${proxyUrl}/intern-api/sok/${language}?pattern=${textPattern}`)
    if (result) {
      if (result.status >= 400) {
        return 'ERROR-koppsCourseSearch-' + result.status
      }
      const { data } = result
      return data
    }
    return
  } catch (error) {
    if (error.response) {
      throw new Error('Unexpected error from koppsCourseSearch-' + error.message)
    }
    throw error
  }
  // this.koppsCourseData = await kopps.get('/courses/search', {
  //   params: {
  //     text_pattern: textPattern,
  //     educational_level: 'BASIC',
  //   },
  // })
  // console.log(this.koppsCourseData)
}

function asyncReducer(state, action) {
  switch (action.type) {
    case 'pending': {
      return { status: 'pending', data: null, error: null }
    }
    case 'resolved': {
      return { status: 'resolved', data: action.data, error: null }
    }
    case 'overflow': {
      return { status: 'overflow', data: null, error: null }
    }
    case 'noHits': {
      return { status: 'noHits', data: null, error: null }
    }
    case 'rejected': {
      // TODO: specify error unknown
      return { status: 'rejected', data: null, error: action.error }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function useAsync(asyncCallback, initialState) {
  const [state, dispatch] = React.useReducer(asyncReducer, {
    status: 'idle',
    data: null,
    error: null,
    ...initialState,
  })
  useEffect(() => {
    const promise = asyncCallback()
    if (!promise) return
    dispatch({ type: 'pending' })
    promise.then(
      data => {
        console.log('data', data)
        const { searchHits, errorCode } = data
        if (errorCode && errorCode === 'search-error-overflow') dispatch({ type: 'overflow' })
        else if (searchHits && searchHits.length === 0) dispatch({ type: 'noHits' })
        else dispatch({ type: 'resolved', data })
      },
      error => dispatch({ type: 'rejected', error }) //'search-error-unknown'
    )
  }, [asyncCallback])

  return state
}
// errorCode: "search-error-overflow",
// errorMessage: "search-error-overflow"

function SearchResultDisplay({ caption = 'N/A', pattern }) {
  const { browserConfig, language } = useStore()

  const proxyUrl = _getThisHost(browserConfig.proxyPrefixPath.uri)

  const asyncCallback = React.useCallback(() => {
    if (!pattern) return
    return koppsCourseSearch(language, proxyUrl, pattern)
  }, [pattern])

  const state = useAsync(asyncCallback, { status: pattern ? 'pending' : 'idle' })

  const { data: searchResults, status, error } = state
  if (status === 'idle' || !pattern) return null
  else if (status === 'pending') return <p>Loading...</p>
  else if (status === 'rejected') return <p>{error}</p>
  //throw error
  else if (status === 'resolved') return <SearchTableView unsortedSearchResults={searchResults} />

  return null
}

export default observer(SearchResultDisplay)
