import React from 'react'
import './style.scss'
import { useStore } from '../../mobx'
import { SearchResultHeaderParams, VIEW } from './types'
import i18n from '../../../../../i18n'
import { STATUS } from '../../hooks/searchUseAsync'

const SearchResultHeader: React.FC<SearchResultHeaderParams> = ({ resultsLength, searchStatus, view, setView }) => {
  const { language, languageIndex } = useStore()

  const { searchLoading, toggleButton } = i18n.messages[languageIndex].generalSearch

  const handleChangeResultView = (current: string) => {
    switch (view) {
      case VIEW.table:
        if (current !== VIEW.table) setView(VIEW.list)
        break
      case VIEW.list:
        if (current !== VIEW.list) setView(VIEW.table)
        break
      default:
        break
    }
  }

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
          <div className="toggle-container">
            <button
              onClick={() => handleChangeResultView(VIEW.list)}
              className={`toggle-button list-btn ${view === VIEW.list ? 'active' : ''}`}
            >
              {toggleButton.list}
            </button>
            <button
              onClick={() => handleChangeResultView(VIEW.table)}
              className={`toggle-button table-btn ${view === VIEW.table ? 'active' : ''}`}
            >
              {toggleButton.table}
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default SearchResultHeader
