import React from 'react'

import { Col, Row } from 'reactstrap'
import { PageHeading } from '@kth/kth-reactstrap/dist/components/studinfo'
import { SearchFilters, Lead } from '../components'

import SearchInput from '../components/SearchInput'

import { koppsCourseSearch } from '../util/searchApi'
import { useCourseSearch } from '../hooks/useCourseSearch'

import { useStore } from '../mobx'
import i18n from '../../../../i18n'

import { MainContentProps } from './types/searchPageTypes'
import { useCourseSearchParams } from '../hooks/useCourseSearchParams'
import { STATUS } from '../hooks/types/UseCourseSearchTypes'
import NewSearchResultDisplay from '../components/NewSearchResultDisplay'
import { KoppsCourseSearchResultState } from '../util/types/SearchApiTypes'

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

const NewSearchPage = () => {
  const [courseSearchParams, setCourseSearchParams] = useCourseSearchParams()
  const { pattern } = courseSearchParams
  const { browserConfig, language, languageIndex } = useStore()

  const { bigSearch, messages } = i18n.messages[languageIndex]
  const { main_menu_search_all_new } = messages
  const { resultsHeading, searchButton, leadIntro } = bigSearch

  const asyncCallback = React.useCallback(() => {
    const proxyUrl = _getThisHost(browserConfig.proxyPrefixPath.uri)
    return koppsCourseSearch(language, proxyUrl, courseSearchParams)
  }, [courseSearchParams])

  const state = useCourseSearch(asyncCallback, { status: STATUS.idle })

  const { status: searchStatus } = state

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
        <PageHeading>{resultsHeading}</PageHeading>
        <Lead text={leadIntro} />
        <SearchInput
          initialValue={pattern}
          caption={searchButton}
          onSubmit={handlePatternChange}
          disabled={searchStatus === STATUS.pending}
        />
        <NewSearchResultDisplay resultsState={state as KoppsCourseSearchResultState} />
      </MainContent>
    </Row>
  )
}

export default NewSearchPage
