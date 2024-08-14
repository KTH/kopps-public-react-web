import React, { useState } from 'react'

import './style.scss'

import { useStore } from '../../mobx'

import { SearchResultDisplayParams, KoppsCourseSearchResult, VIEW, View } from './types'
import { STATUS } from '../../hooks/types/UseCourseSearchTypes'
import Article from '../Article'
import SearchAlert from '../SearchAlert'
import SearchResultHeader from './SearchResultHeader'
import SearchResultComponent from './SearchResultComponent'

const isKoppsCourseSearchResult = (data: string | KoppsCourseSearchResult): data is KoppsCourseSearchResult => {
  return (data as KoppsCourseSearchResult).searchHits !== undefined
}
const NewSearchResultDisplay: React.FC<SearchResultDisplayParams> = ({ resultsState }) => {
  const { languageIndex } = useStore()
  const [view, setView] = useState<View>(VIEW.table)
  const { data: searchResults, status: searchStatus, error: errorType } = resultsState

  if (errorType) {
    return <SearchAlert alertType={errorType} languageIndex={languageIndex} />
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
        isKoppsCourseSearchResult(searchResults) &&
        searchResults.searchHits.length > 0 && <SearchResultComponent searchResults={searchResults} view={view} />}
    </Article>
  )
}

export default NewSearchResultDisplay
