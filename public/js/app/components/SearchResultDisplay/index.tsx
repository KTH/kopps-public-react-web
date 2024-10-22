import React, { useState } from 'react'

import './style.scss'

import { useStore } from '../../mobx'

import { SearchResultDisplayParams, CourseSearchResult, VIEW, View } from './types'
import { STATUS } from '../../hooks/types/UseCourseSearchTypes'
import Article from '../Article'
import SearchAlert from '../SearchAlert'
import SearchResultHeader from './SearchResultHeader'
import SearchResultComponent from './SearchResultComponent'
import { AlertType } from '../SearchAlert/types'

const isCourseSearchResult = (data: string | CourseSearchResult): data is CourseSearchResult => {
  return (data as CourseSearchResult).searchHits !== undefined
}
const SearchResultDisplay: React.FC<SearchResultDisplayParams> = ({ resultsState }) => {
  const { languageIndex } = useStore()
  const [view, setView] = useState<View>(VIEW.list)
  const { data: searchResults, status: searchStatus, error: errorType } = resultsState

  if (errorType) {
    return (
      <SearchAlert
        alertType={errorType}
        languageIndex={languageIndex}
      />
    )
  }

  return (
    <Article classNames={['course-search-results']}>
      <SearchResultHeader
        resultsLength={searchResults ? searchResults.searchHits.length : undefined}
        searchStatus={searchStatus}
        view={view}
        setView={setView}
      />
      {searchStatus === STATUS.resolved &&
        isCourseSearchResult(searchResults) &&
        searchResults.searchHits.length > 0 && <SearchResultComponent searchResults={searchResults} view={view} />}
    </Article>
  )
}

export default SearchResultDisplay
