import React, { useEffect, useState } from 'react'

import axios from 'axios'
import { observer } from 'mobx-react'
import ReactDOM from 'react-dom'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'

import { useStore } from '../mobx'
import SearchTableView, { searchHitsPropsShape } from './SearchTableView'

import i18n from '../../../../i18n'
import { stringifyUrlParams, CLIENT_EDU_LEVELS, CLIENT_SHOW_OPTIONS } from '../../../../domain/searchParams'
// eslint-disable-next-line import/no-cycle
import { SearchAlert } from './index'

function _getThisHost(thisHostBaseUrl) {
  return thisHostBaseUrl.slice(-1) === '/' ? thisHostBaseUrl.slice(0, -1) : thisHostBaseUrl
}

// eslint-disable-next-line consistent-return
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
  } catch (error) {
    if (error.response) {
      throw new Error('Unexpected error from koppsCourseSearch-' + error.message)
    }
    throw error
  }
}
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

function renderAlertToTop(errorType, languageIndex) {
  const alertContainer = document.getElementById('alert-placeholder')
  if (alertContainer) {
    ReactDOM.render(<SearchAlert alertType={errorType} languageIndex={languageIndex} />, alertContainer)
  }
}
function dismountTopAlert() {
  const alertContainer = document.getElementById('alert-placeholder')
  if (alertContainer) ReactDOM.unmountComponentAtNode(alertContainer)
}

const errorItalicParagraph = (errorType, languageIndex) => {
  const errorText = i18n.messages[languageIndex].generalSearch[errorType]
  if (!errorText)
    throw new Error(
      `Missing translations for errorType: ${errorType}. Allowed types: ${Object.values(ERROR_ASYNC).join(', ')}`
    )

  return (
    <p>
      <i>{errorText}</i>
    </p>
  )
}

function DisplayResult({ languageIndex, status, errorType, searchResults }) {
  if (status === STATUS.resolved) {
    return <SearchTableView unsortedSearchResults={searchResults} />
  }

  if (status === STATUS.idle) return null
  if (status === STATUS.pending) {
    const { searchLoading } = i18n.messages[languageIndex].generalSearch
    return <p>{searchLoading}</p>
  }
  if (errorType) return errorItalicParagraph(errorType, languageIndex)

  return null
}

DisplayResult.propTypes = {
  languageIndex: PropTypes.oneOf([0, 1]),
  status: PropTypes.oneOf(Object.values(STATUS)).isRequired,
  errorType: PropTypes.oneOf([...Object.values(ERROR_ASYNC), '']),
  searchResults: PropTypes.shape(searchHitsPropsShape),
}

DisplayResult.defaultProps = {
  languageIndex: 0,
  errorType: '',
  searchResults: {},
}

function SearchResultDisplay({ searchParameters, onlyPattern = false }) {
  const { browserConfig, language, languageIndex } = useStore()
  const history = useHistory()
  const { pattern } = searchParameters
  const searchStr = stringifyUrlParams(searchParameters)
  const [loadStatus, setLoadStatus] = useState('firstLoad')
  const { resultsHeading } = i18n.messages[languageIndex].generalSearch

  const asyncCallback = React.useCallback(() => {
    if (onlyPattern && !pattern) return
    if (!searchStr && loadStatus === 'firstLoad') {
      setLoadStatus('afterLoad')
      return
    }
    const proxyUrl = _getThisHost(browserConfig.proxyPrefixPath.uri)
    // eslint-disable-next-line consistent-return
    return koppsCourseSearch(language, proxyUrl, searchParameters)
  }, [searchParameters])

  const initialStatus = onlyPattern
    ? { status: pattern ? STATUS.pending : STATUS.idle }
    : { status: searchStr ? STATUS.pending : STATUS.idle }

  const state = useAsync(asyncCallback, initialStatus)

  const { data: searchResults, status, error: errorType } = state

  useEffect(() => {
    if (errorType && errorType !== null) {
      renderAlertToTop(errorType, languageIndex)
    } else dismountTopAlert()
  }, [status])

  useEffect(() => {
    if ((onlyPattern && pattern) || !onlyPattern) {
      if (status === STATUS.pending) {
        history.push({ search: searchStr })
      }
    }
  }, [status])

  return (
    <>
      {status !== STATUS.idle && <h2 id="results-heading">{resultsHeading}</h2>}
      <DisplayResult
        status={status}
        errorType={errorType}
        languageIndex={languageIndex}
        searchResults={searchResults}
      />
    </>
  )
}

SearchResultDisplay.propTypes = {
  onlyPattern: PropTypes.bool,
  searchParameters: PropTypes.shape({
    eduLevel: PropTypes.arrayOf(PropTypes.oneOf(CLIENT_EDU_LEVELS)),
    pattern: PropTypes.string,
    // eslint-disable-next-line consistent-return
    period: PropTypes.arrayOf((propValue, key, componentName, location, propFullName) => {
      if (!/\b\d{5}\b:(\b\d)/.test(propValue[key]) && !/\b\d{4}\b:(summer)/.test(propValue[key])) {
        return new Error(
          `Prop ${propFullName} of a component ${componentName} has incorrect prop value ${propValue[key]}`
        )
      }
    }),
    showOptions: PropTypes.arrayOf(PropTypes.oneOf(CLIENT_SHOW_OPTIONS)),
    // eslint-disable-next-line consistent-return
    department: (propValue, key, componentName, location, propFullName) => {
      if (!/[A-Za-zÅÄÖåäö]{1,4}/.test(propValue[key])) {
        return new Error(
          `Prop ${propFullName} of a component ${componentName} has incorrect prop value ${propValue[key]}`
        )
      }
    },
  }),
}

SearchResultDisplay.defaultProps = {
  onlyPattern: false,
  searchParameters: {},
}

export default observer(SearchResultDisplay)
