import React, { useState } from 'react'

import './style.scss'

import { VIEW, View } from './types'
import { State, STATUS } from '../../hooks/types/UseCourseSearchTypes'
import Article from '../Article'
import SearchAlert from '../SearchAlert'
import SearchResultHeader from './SearchResultHeader'
import SearchResultContent from './SearchResultContent'
import { useLanguage } from '../../hooks/useLanguage'

const SearchResultDisplay: React.FC<{
  searchState: State
}> = ({ searchState }) => {
  const { languageIndex } = useLanguage()
  const [view, setView] = useState<View>(VIEW.list)
  const { searchData, status: searchStatus, error: errorType } = searchState

  if (errorType) {
    return <SearchAlert alertType={errorType} languageIndex={languageIndex} />
  }

  return (
    <Article classNames={['course-search-results']}>
      <SearchResultHeader
        // TODO benni fix chaining
        resultsLength={searchData?.results?.length ?? undefined}
        searchStatus={searchStatus}
        view={view}
        setView={setView}
      />
      {searchStatus === STATUS.resolved && searchData?.results?.length > 0 && (
        <SearchResultContent searchData={searchData} view={view} />
      )}
    </Article>
  )
}

export default SearchResultDisplay
