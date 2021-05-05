import React, { useEffect, useLayoutEffect, useState } from 'react'

import axios from 'axios'
import { observer } from 'mobx-react'
import ReactDOM from 'react-dom'
import { useHistory } from 'react-router-dom'

import { useStore } from '../mobx'
import { Link, PageHeading, SortableTable } from '@kth/kth-reactstrap/dist/components/studinfo'
import Article from './Article'
import SearchTableView from './SearchTableView'

import i18n from '../../../../i18n'
import { courseLink } from '../util/links'
import { stringifyUrlParams } from '../../../../domain/searchParams'
import { SearchAlert } from '../components/index'

function _getThisHost(thisHostBaseUrl) {
  return thisHostBaseUrl.slice(-1) === '/' ? thisHostBaseUrl.slice(0, -1) : thisHostBaseUrl
}

async function koppsCourseSearch(language, proxyUrl, params) {
  try {
    const result = await axios.get(`${proxyUrl}/intern-api/sok/${language}`, {
      params,
    })
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
      return { status: 'overflow', data: null, error: 'errorOverflow' }
    }
    case 'noHits': {
      return { status: 'noHits', data: null, error: 'errorEmpty' }
    }
    case 'rejected': {
      // TODO: specify error unknown
      return { status: 'rejected', data: null, error: 'errorUnknown' } //action.error
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

function renderAlertToTop(errorType, languageIndex) {
  const alertContainer = document.getElementById('alert-placeholder')
  if (alertContainer) {
    ReactDOM.render(<SearchAlert alertType={errorType} languageIndex={languageIndex} />, alertContainer)
  }
}
function dismountTopAlert(errorType, languageIndex) {
  const alertContainer = document.getElementById('alert-placeholder')
  if (alertContainer) ReactDOM.unmountComponentAtNode(alertContainer)
}

function DisplayResult({ languageIndex, status, searchResults }) {
  const { searchLoading, errorEmpty, errorUnknown, errorOverflow } = i18n.messages[languageIndex].generalSearch
  if (status === 'idle') return null
  else if (status === 'pending') return <p>{searchLoading}</p>
  else if (status === 'noHits')
    return (
      <p>
        <i>{errorEmpty}</i>
      </p>
    )
  else if (status === 'overflow')
    return (
      <p>
        <i>{errorOverflow}</i>
      </p>
    )
  else if (status === 'resolved') return <SearchTableView unsortedSearchResults={searchResults} />
  else if (status === 'rejected')
    //  //throw error with error boundaries
    return (
      <p>
        <i>{errorUnknown}</i>
      </p>
    )

  return null
}

function SearchResultDisplay({ caption = 'N/A', searchParameters, onlyPattern = false }) {
  const { browserConfig, language, languageIndex } = useStore()
  const history = useHistory()

  const { pattern } = searchParameters

  const { resultsHeading } = i18n.messages[languageIndex].generalSearch

  const asyncCallback = React.useCallback(() => {
    if (onlyPattern && !pattern) return
    if (!searchParameters) return

    const proxyUrl = _getThisHost(browserConfig.proxyPrefixPath.uri)
    return koppsCourseSearch(language, proxyUrl, searchParameters)
  }, [searchParameters])

  const initialStatus = onlyPattern
    ? { status: pattern ? 'pending' : 'idle' }
    : { status: searchParameters ? 'pending' : 'idle' }

  const state = useAsync(asyncCallback, initialStatus)

  const { data: searchResults, status, error } = state

  useEffect(() => {
    if (error && error !== null) {
      renderAlertToTop(error, languageIndex)
    } else dismountTopAlert()
  }, [status])

  useEffect(() => {
    if ((onlyPattern && pattern) || !onlyPattern) {
      if (status === 'pending') {
        const search = stringifyUrlParams(searchParameters)
        history.push({ search })
      }
    }
  }, [status])

  return (
    <>
      {status !== 'idle' && <h2 id="results-heading">{resultsHeading}</h2>}
      <DisplayResult status={status} languageIndex={languageIndex} searchResults={searchResults} />
    </>
  )
}

export default observer(SearchResultDisplay)
