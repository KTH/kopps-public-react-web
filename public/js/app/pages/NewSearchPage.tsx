import React, { useReducer } from 'react'

import { Col, Row } from 'reactstrap'
import { PageHeading } from '@kth/kth-reactstrap/dist/components/studinfo'
import SearchFilters from '../components/SearchFilters/SearchFilters'
import { stringifyUrlParams } from '../../../../domain/searchParams'

import { koppsCourseSearch, KoppsCourseSearchResult } from '../util/searchApi'
import { STATUS, ERROR_ASYNC, useCourseSearch } from '../hooks/useCourseSearch'

import { useStore } from '../mobx'
import i18n from '../../../../i18n'

import { formatShortTerm } from '../../../../domain/term'

import { MainContentProps, SearchParams } from './types/searchPageTypes'

const MainContent: React.FC<MainContentProps> = ({ children }) => {
  return (
    <Col tag="main" id="mainContent">
      {children}
    </Col>
  )
}

function _getThisHost(thisHostBaseUrl: string) {
  return thisHostBaseUrl.slice(-1) === '/' ? thisHostBaseUrl.slice(0, -1) : thisHostBaseUrl
}

function isKoppsCourseSearchResult(data: string | KoppsCourseSearchResult): data is KoppsCourseSearchResult {
  return (data as KoppsCourseSearchResult).searchHits !== undefined
}

const NewSearchPage = () => {
  const { browserConfig, language, languageIndex, textPattern, period, eduLevel, showOptions, departmentCodeOrPrefix } =
    useStore()

  const { bigSearch, messages } = i18n.messages[languageIndex]
  const { main_menu_search_all_new } = messages
  const { searchHeading } = bigSearch

  const paramsReducer = (state: SearchParams, action: Partial<SearchParams>) => ({ ...state, ...action })

  const [searchParameters, setSearchParameters] = useReducer(paramsReducer, {
    pattern: textPattern,
    period,
    eduLevel,
    showOptions,
    department: departmentCodeOrPrefix,
  })

  const searchStr = stringifyUrlParams(searchParameters)

  const asyncCallback = React.useCallback(() => {
    const proxyUrl = _getThisHost(browserConfig.proxyPrefixPath.uri)
    return koppsCourseSearch(language, proxyUrl, searchParameters)
  }, [searchParameters])

  const onlyPattern = searchParameters.pattern && Object.keys(searchParameters).length == 1
  const initialStatus = onlyPattern
    ? { status: textPattern ? STATUS.pending : STATUS.idle }
    : { status: searchStr ? STATUS.pending : STATUS.idle }

  const state1 = useCourseSearch(asyncCallback, initialStatus)

  const { data: searchResults, status: searchStatus, error: errorType } = state1

  function updateSearch(params: Partial<SearchParams>) {
    setSearchParameters({ ...params })
  }

  return (
    <Row>
      <SearchFilters
        ancestorItem={{ href: '/student/kurser/sokkurs-ny-design', label: main_menu_search_all_new }}
        updateSearch={updateSearch}
        disabled={searchStatus === STATUS.pending}
      />
      <MainContent>
        <PageHeading>{searchHeading}</PageHeading>
        <h3>search result for {textPattern}:</h3>
        {searchStatus === STATUS.resolved &&
          isKoppsCourseSearchResult(searchResults) &&
          searchResults.searchHits &&
          searchResults.searchHits.map(({ course }) => (
            <p key={course.courseCode}>
              <b>{course.title}</b> {course.courseCode}
            </p>
          ))}
        <h3>search result for "{textPattern}" and "period: 20242:1":</h3>
        {searchStatus === STATUS.resolved &&
          isKoppsCourseSearchResult(searchResults) &&
          searchResults.searchHits &&
          Object.keys(searchResults.searchHits[0]).length > 1 &&
          searchResults.searchHits.map(({ course, searchHitInterval }) => (
            <p key={`${course.courseCode}${searchHitInterval.startPeriod}${searchHitInterval.endPeriod}`}>
              <b>{course.title}</b> {course.courseCode} - {formatShortTerm(searchHitInterval.startTerm, language)}
            </p>
          ))}
      </MainContent>
    </Row>
  )
}

export default NewSearchPage
