import React from 'react'

import { Col, Row } from 'reactstrap'
import { PageHeading } from '@kth/kth-reactstrap/dist/components/studinfo'
import SearchFilters from '../components/SearchFilters'
import { stringifyUrlParams } from '../../../../domain/searchParams'

import { koppsCourseSearch, KoppsCourseSearchResult} from '../util/newSeachApi'
import { STATUS, ERROR_ASYNC, useAsync } from '../hooks/newSearchUseAsync'

import { useStore } from '../mobx'
import i18n from '../../../../i18n'

import { formatShortTerm } from '../../../../domain/term'

interface MainContentProps {
  children: React.ReactNode
}

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

function isKoppsCourseSearchResult(
  data: string | KoppsCourseSearchResult
): data is KoppsCourseSearchResult {
  return (data as KoppsCourseSearchResult).searchHits !== undefined;
}

const NewSearchPage = () => {
  const { browserConfig, language, languageIndex, textPattern } = useStore()

  const { bigSearch, messages } = i18n.messages[languageIndex]
  const { main_menu_search_all_new } = messages
  const { searchHeading } = bigSearch
  const searchParameters1 = {
    pattern: textPattern
  }
  const searchParameters2 = {
    period: ['20242:1'],
    pattern: textPattern,
  }
  const searchStr1 = stringifyUrlParams(searchParameters1)
  const searchStr2 = stringifyUrlParams(searchParameters2)

  const asyncCallback1 = React.useCallback(() => {
    const proxyUrl = _getThisHost(browserConfig.proxyPrefixPath.uri)
    return koppsCourseSearch(language, proxyUrl, searchParameters1)
  }, [])

  const asyncCallback2 = React.useCallback(() => {
    const proxyUrl = _getThisHost(browserConfig.proxyPrefixPath.uri)
    return koppsCourseSearch(language, proxyUrl, searchParameters2)
  }, [])

  const onlyPattern1 = searchParameters1.pattern && Object.keys(searchParameters1).length == 1
  const initialStatus1 = onlyPattern1
    ? { status: textPattern ? STATUS.pending : STATUS.idle }
    : { status: searchStr1 ? STATUS.pending : STATUS.idle }

  const state1 = useAsync(asyncCallback1, initialStatus1)

  // the second call is only for testing the period filter
  const onlyPattern2 = searchParameters1.pattern && Object.keys(searchParameters2).length == 1
  const initialStatus = onlyPattern2
    ? { status: textPattern ? STATUS.pending : STATUS.idle }
    : { status: searchStr1 ? STATUS.pending : STATUS.idle }

  const state2 = useAsync(asyncCallback2, initialStatus)

  const { data: searchResults1, status: searchStatus1, error: errorType1 } = state1
  const { data: searchResults2, status: searchStatus2, error: errorType2 } = state2


  return (
    <Row>
      <SearchFilters ancestorItem={{ href: '/student/kurser/sokkurs-ny-design', label: main_menu_search_all_new }} />
      <MainContent>
        <PageHeading>{searchHeading}</PageHeading>
        <h3>search result for {textPattern}:</h3>
        {searchStatus1 === STATUS.resolved && isKoppsCourseSearchResult(searchResults1) && searchResults1.searchHits && searchResults1.searchHits.map(
          ({course}) => (<p key={course.courseCode}><b>{course.title}</b> {course.courseCode}</p>)
        )}
        <h3>search result for "{textPattern}" and "period: 20242:1":</h3>
        {searchStatus2 === STATUS.resolved && isKoppsCourseSearchResult(searchResults2) && searchResults2.searchHits && searchResults2.searchHits.map(
          ({course, searchHitInterval}) => (<p key={course.courseCode}><b>{course.title}</b> {course.courseCode} - {formatShortTerm(searchHitInterval.startTerm, language)}</p>)
        )}
      </MainContent>
    </Row>
  )
}

export default NewSearchPage
