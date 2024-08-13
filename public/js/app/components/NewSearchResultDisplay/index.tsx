import React, { useState } from 'react'

import './style.scss'

import { useStore } from '../../mobx'

import {
  SearchResultDisplayParams,
  KoppsCourseSearchResult,
  VIEW,
  View,
  SearchResultHeaderParams,
  SearchResultComponentParams,
} from './types'
import { STATUS } from '../../hooks/types/UseCourseSearchTypes'
import ListView from './ListView'
import TableView from './TableView'
import Article from '../Article'
import SearchAlert from '../SearchAlert'

const isKoppsCourseSearchResult = (data: string | KoppsCourseSearchResult): data is KoppsCourseSearchResult => {
  return (data as KoppsCourseSearchResult).searchHits !== undefined
}

const SearchResultHeader: React.FC<SearchResultHeaderParams> = ({ resultsLength, language }) => (
  <div className="search-result-header">
    <p>
      {language === 'en' ? `Your search returned ` : `Din sökning gav `}
      <b>{resultsLength}</b>
      {language === 'en' ? ` result(s).` : ` resultat.`}
    </p>
    <div className="toggle-view">
      {/* This section will be completed in a future task */}
      <span>Link</span>
      <span>Table</span>
    </div>
  </div>
)

const SearchResultComponent: React.FC<SearchResultComponentParams> = ({ searchResults, view }) => {
  switch (view) {
    case VIEW.list:
      return <ListView results={searchResults.searchHits} />
    case VIEW.table:
      return <TableView />
    default:
      return null
  }
}

const NewSearchResultDisplay: React.FC<SearchResultDisplayParams> = ({ resultsState }) => {
  const { language, languageIndex } = useStore()

  const [view, setView] = useState<View>(VIEW.list)
  const { data: searchResults, status: searchStatus, error: errorType } = resultsState

  if (errorType) {
    return <SearchAlert alertType={errorType} languageIndex={languageIndex} />
  }

  if (
    searchStatus === STATUS.resolved &&
    isKoppsCourseSearchResult(searchResults) &&
    searchResults.searchHits.length > 0
  ) {
    return (
      <Article>
        <SearchResultHeader resultsLength={searchResults.searchHits.length} language={language} />
        <SearchResultComponent searchResults={searchResults} view={view} />
      </Article>
    )
  }

  return null
}

export default NewSearchResultDisplay
