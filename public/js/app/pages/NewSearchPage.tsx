import React, { useReducer } from 'react'

import { Col, Row } from 'reactstrap'
import { PageHeading } from '@kth/kth-reactstrap/dist/components/studinfo'
import { SearchFilters, Lead } from '../components'

import SearchInput from '../components/SearchInput'

import { koppsCourseSearch, KoppsCourseSearchResult } from '../util/searchApi'
import { STATUS, ERROR_ASYNC, useCourseSearch } from '../hooks/useCourseSearch'

import { useStore } from '../mobx'
import i18n from '../../../../i18n'

import { formatShortTerm } from '../../../../domain/term'

import { MainContentProps } from './types/searchPageTypes'
import { useCourseSearchParams } from '../hooks/useCourseSearchParams'

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
  const [courseSearchParams, setCourseSearchParams] = useCourseSearchParams()
  const { pattern } = courseSearchParams
  const { browserConfig, language, languageIndex } = useStore()

  const { bigSearch, messages } = i18n.messages[languageIndex]
  const { main_menu_search_all_new } = messages
  const { searchHeading, searchButton, leadIntro } = bigSearch

  const asyncCallback = React.useCallback(() => {
    const proxyUrl = _getThisHost(browserConfig.proxyPrefixPath.uri)
    return koppsCourseSearch(language, proxyUrl, courseSearchParams)
  }, [courseSearchParams])

  const state = useCourseSearch(asyncCallback, { status: STATUS.idle })

  const { data: searchResults, status: searchStatus, error: errorType } = state

  function handlePatternChange(pattern: string) {
    setCourseSearchParams({ pattern: pattern })
  }

  return (
    <Row>
      <SearchFilters
        courseSearchParams={courseSearchParams}
        setCourseSearchParams={setCourseSearchParams}
        ancestorItem={{ href: '/student/kurser/sokkurs-ny-design', label: main_menu_search_all_new }}
        disabled={searchStatus === STATUS.pending}
      />
      <MainContent>
        <PageHeading>{searchHeading}</PageHeading>
        <Lead text={leadIntro} />
        <SearchInput
          initialValue={pattern}
          caption={searchButton}
          onSubmit={handlePatternChange}
          disabled={searchStatus === STATUS.pending}
        />
        {searchStatus === STATUS.resolved &&
          isKoppsCourseSearchResult(searchResults) &&
          searchResults.searchHits &&
          searchResults.searchHits.length > 0 &&
          searchResults.searchHits.map(({ course, searchHitInterval }, index) => {
            const { courseCode, title } = course
            const startTerm = searchHitInterval ? formatShortTerm(searchHitInterval.startTerm, language) : ''
            return (
              <p key={`${courseCode}${index}`}>
                <b>{title}</b> {courseCode} {startTerm && `- ${startTerm}`}
              </p>
            )
          })}
      </MainContent>
    </Row>
  )
}

export default NewSearchPage
