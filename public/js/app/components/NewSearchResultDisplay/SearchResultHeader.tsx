import React from 'react'
import './style.scss'
import { useStore } from '../../mobx'
import { SearchResultHeaderParams, VIEW } from './types'
import i18n from '../../../../../i18n'
import { STATUS } from '../../hooks/searchUseAsync'

const SearchResultHeader: React.FC<SearchResultHeaderParams> = ({ resultsLength, searchStatus, view, setView }) => {
  const { language, languageIndex } = useStore()

  const { searchLoading, toggleButton } = i18n.messages[languageIndex].generalSearch

  const handleChangeResultView = () => {
    switch (view) {
      case VIEW.table:
        setView(VIEW.list)
        break
      case VIEW.list:
        setView(VIEW.table)
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
            <button onClick={handleChangeResultView} className={`toggle-button ${view === VIEW.list ? 'active' : ''}`}>
              {toggleButton.list}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed"
              >
                <path d="M360-200v-80h480v80H360Zm0-240v-80h480v80H360Zm0-240v-80h480v80H360ZM200-160q-33 0-56.5-23.5T120-240q0-33 23.5-56.5T200-320q33 0 56.5 23.5T280-240q0 33-23.5 56.5T200-160Zm0-240q-33 0-56.5-23.5T120-480q0-33 23.5-56.5T200-560q33 0 56.5 23.5T280-480q0 33-23.5 56.5T200-400Zm0-240q-33 0-56.5-23.5T120-720q0-33 23.5-56.5T200-800q33 0 56.5 23.5T280-720q0 33-23.5 56.5T200-640Z" />
              </svg>
            </button>
            <button onClick={handleChangeResultView} className={`toggle-button ${view === VIEW.table ? 'active' : ''}`}>
              {toggleButton.table}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="24px"
                viewBox="0 -960 960 960"
                width="24px"
                fill="#e8eaed"
              >
                <path d="M120-640v-120q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v120H120Zm80 520q-33 0-56.5-23.5T120-200v-360h180v440H200Zm460 0v-440h180v360q0 33-23.5 56.5T760-120H660Zm-280 0v-440h200v440H380Z" />
              </svg>
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default SearchResultHeader
