import React from 'react'

import { Col, Row } from 'reactstrap'
import { PageHeading } from '@kth/kth-reactstrap/dist/components/studinfo'
import { SearchFilters } from '../components'

import SearchInput from '../components/SearchInput'

import { courseSearch } from '../util/searchApi'
import { useCourseSearch } from '../hooks/useCourseSearch'

import { useStore } from '../mobx'
import i18n from '../../../../i18n'

import { MainContentProps, SEARCH_MODES, SearchPageProps } from './types/searchPageTypes'
import { useCourseSearchParams } from '../hooks/useCourseSearchParams'
import { STATUS } from '../hooks/types/UseCourseSearchTypes'
import SearchResultDisplay from '../components/SearchResultDisplay'
import { useLangHrefUpdate } from '../hooks/useLangHrefUpdate'
import { SidebarFilters } from '../components/SidebarFilters'

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

const SearchPage: React.FC<SearchPageProps> = ({ searchMode = SEARCH_MODES.default }) => {
  const [courseSearchParams, setCourseSearchParams] = useCourseSearchParams()
  useLangHrefUpdate(courseSearchParams)
  const { browserConfig, language, languageIndex } = useStore()
  const { bigSearch, generalSearch, messages } = i18n.messages[languageIndex]
  const { main_menu_search_all, main_menu_third_cycle_courses_search } = messages
  const { searchButton } = bigSearch
  const { resultsHeading, filtersLabel, searchLabel } = generalSearch

  let ancestorItemObj

  const asyncCallback = React.useCallback(() => {
    const proxyUrl = _getThisHost(browserConfig.proxyPrefixPath.uri)
    return courseSearch(language, proxyUrl, courseSearchParams)
  }, [courseSearchParams, language])

  const state = useCourseSearch(asyncCallback, { status: STATUS.idle })

  const { status: searchStatus } = state

  function handlePatternChange(pattern: string) {
    setCourseSearchParams({ pattern: pattern })
  }

  switch (searchMode) {
    case SEARCH_MODES.default:
      ancestorItemObj = { href: '/student/kurser/sokkurs', label: main_menu_search_all }
      break
    case SEARCH_MODES.thirdCycleCourses:
      ancestorItemObj = {
        href: '/utbildning/forskarutbildning/kurser/sok',
        label: main_menu_third_cycle_courses_search,
      }
    default:
      break
  }

  return (
    <Row>
      <SidebarFilters title={filtersLabel} ancestorItem={ancestorItemObj}>
        <SearchFilters
          courseSearchParams={courseSearchParams}
          setCourseSearchParams={setCourseSearchParams}
          disabled={searchStatus === STATUS.pending}
          searchMode={searchMode}
        />
      </SidebarFilters>
      <MainContent>
        <PageHeading>{resultsHeading}</PageHeading>
        <SearchInput
          caption={searchButton}
          onSubmit={handlePatternChange}
          searchLabel={searchLabel}
          disabled={searchStatus === STATUS.pending}
        />
        <SearchResultDisplay searchState={state} />
      </MainContent>
    </Row>
  )
}

export default SearchPage
