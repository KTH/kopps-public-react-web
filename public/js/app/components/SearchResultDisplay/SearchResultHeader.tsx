import React from 'react'
import './style.scss'
import { useStore } from '../../mobx'
import { SearchResultHeaderParams, VIEW } from './types'
import i18n from '../../../../../i18n'
import { STATUS } from '../../hooks/types/UseCourseSearchTypes'

const SearchResultHeader: React.FC<SearchResultHeaderParams> = ({ resultsLength, searchStatus, view, setView }) => {
  const { language, languageIndex } = useStore()

  const { searchLoading, toggleButton } = i18n.messages[languageIndex].generalSearch

  // TODO Benni switch to list view if there are many results?
  const handleChangeResultView = (current: string) => {
    switch (view) {
      case VIEW.table:
        if (current !== VIEW.table) setView(VIEW.standard)
        break
      case VIEW.standard:
        if (current !== VIEW.standard) setView(VIEW.table)
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
            {/* TODO benni fix language */}
            {language === 'en' ? `Your search returned ` : `Din sökning gav `}
            <b>{resultsLength}</b>
            {language === 'en' ? ` result(s).` : ` resultat.`}
          </p>
          <div className="toggle-container">
            <button
              onClick={() => handleChangeResultView(VIEW.standard)}
              className={`toggle-button standard-btn ${view === VIEW.standard ? 'active' : ''}`}
            >
              {toggleButton.standard}
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
