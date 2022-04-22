import React, { useEffect, useState } from 'react'

import ReactDOM from 'react-dom'
import { useNavigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import koppsCourseSearch from '../util/internApi'
import { useStore } from '../mobx'

import i18n from '../../../../i18n'
import { stringifyUrlParams } from '../../../../domain/searchParams'
import { CLIENT_EDU_LEVELS } from '../../../../domain/eduLevels'
import { CLIENT_SHOW_OPTIONS } from '../../../../domain/courseOptions'

import { STATUS, ERROR_ASYNC, useAsync } from '../hooks/searchUseAsync'
import SearchTableView, { searchHitsPropsShape } from './SearchTableView'
import { SearchAlert } from './index'

function _getThisHost(thisHostBaseUrl) {
  return thisHostBaseUrl.slice(-1) === '/' ? thisHostBaseUrl.slice(0, -1) : thisHostBaseUrl
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

function DisplayResult({ languageIndex, searchStatus, errorType, searchResults }) {
  if (searchStatus === STATUS.resolved) {
    return <SearchTableView unsortedSearchResults={searchResults} />
  }

  if (searchStatus === STATUS.idle) return null
  if (searchStatus === STATUS.pending) {
    const { searchLoading } = i18n.messages[languageIndex].generalSearch
    return <p>{searchLoading}</p>
  }
  if (errorType) return errorItalicParagraph(errorType, languageIndex)

  return null
}

DisplayResult.propTypes = {
  languageIndex: PropTypes.oneOf([0, 1]),
  searchStatus: PropTypes.oneOf([...Object.values(STATUS), null]),
  errorType: PropTypes.oneOf([...Object.values(ERROR_ASYNC), '']),
  searchResults: PropTypes.shape(searchHitsPropsShape),
}

DisplayResult.defaultProps = {
  languageIndex: 0,
  errorType: '',
  searchResults: {},
  searchStatus: null,
}

function SearchResultDisplay({ searchParameters, onlyPattern = false }) {
  const { browserConfig, language, languageIndex } = useStore()
  const navigate = useNavigate()
  const { pattern } = searchParameters
  const searchStr = stringifyUrlParams(searchParameters)
  const [loadStatus, setLoadStatus] = useState('firstLoad')
  const { resultsHeading } = i18n.messages[languageIndex].generalSearch

  const asyncCallback = React.useCallback(() => {
    if (onlyPattern && !pattern) return
    if (loadStatus === 'firstLoad') {
      setLoadStatus('afterLoad')

      if (!searchStr) return
    }

    const proxyUrl = _getThisHost(browserConfig.proxyPrefixPath.uri)
    // eslint-disable-next-line consistent-return
    return koppsCourseSearch(language, proxyUrl, searchParameters)
  }, [searchParameters])

  const initialStatus = onlyPattern
    ? { status: pattern ? STATUS.pending : STATUS.idle }
    : { status: searchStr ? STATUS.pending : STATUS.idle }

  const state = useAsync(asyncCallback, initialStatus)

  const { data: searchResults, status: searchStatus, error: errorType } = state

  useEffect(() => {
    let isMounted = true
    if (isMounted) {
      if (errorType && errorType !== null) {
        renderAlertToTop(errorType, languageIndex)
      } else dismountTopAlert()
    }
    return () => (isMounted = false)
  }, [searchStatus])

  useEffect(() => {
    if (!navigate) return
    if ((onlyPattern && pattern) || !onlyPattern) {
      if (searchStatus === STATUS.pending) {
        navigate({ search: searchStr }, { replace: true })
      }
    }
  }, [searchStatus])

  return (
    <>
      {searchStatus !== STATUS.idle && <h2 id="results-heading">{resultsHeading}</h2>}
      <DisplayResult
        searchStatus={searchStatus}
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
    // eslint-disable-next-line no-shadow
    period: PropTypes.arrayOf((propValue, key, componentName, location, propFullName) => {
      if (!/\b\d{5}\b:(\b\d)/.test(propValue[key]) && !/\b\d{4}\b:(summer)/.test(propValue[key])) {
        return new Error(
          `Prop ${propFullName} of a component ${componentName} has incorrect prop value ${propValue[key]}`
        )
      }
    }),
    showOptions: PropTypes.arrayOf(PropTypes.oneOf(CLIENT_SHOW_OPTIONS)),
    // eslint-disable-next-line consistent-return
    // eslint-disable-next-line no-shadow
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

export default SearchResultDisplay
