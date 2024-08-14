import React from 'react'
import { useStore } from '../../mobx'
import { SearchResultHeaderParams } from './types'
import i18n from '../../../../../i18n'
import { STATUS } from '../../hooks/searchUseAsync'
const SearchResultHeader: React.FC<SearchResultHeaderParams> = ({ resultsLength, searchStatus }) => {
  const { language, languageIndex } = useStore()

  const { searchLoading } = i18n.messages[languageIndex].generalSearch

  return (
    <div className="search-result-header">
      {searchStatus === STATUS.pending && <p>{searchLoading}</p>}
      {searchStatus === STATUS.resolved && (
        <>
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
        </>
      )}
    </div>
  )
}

export default SearchResultHeader
