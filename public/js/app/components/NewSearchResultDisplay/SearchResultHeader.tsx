import React from 'react'
import './style.scss'
import { useStore } from '../../mobx'
import { SearchResultHeaderParams, VIEW } from './types'
import i18n from '../../../../../i18n'
import { STATUS } from '../../hooks/searchUseAsync'

import ListIcon from './icons/format_list_bulleted.svg'
import TableIcon from './icons/table_chart.svg'

const SearchResultHeader: React.FC<SearchResultHeaderParams> = ({ resultsLength, searchStatus, view, setView }) => {
  const { language, languageIndex } = useStore()

  const { searchLoading, toggleButton } = i18n.messages[languageIndex].generalSearch

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
            <button className={`toggle-button ${view === VIEW.list}`}>
              {toggleButton.list}
              <ListIcon />
              
            </button>
            <button className={`toggle-button ${view === VIEW.table}`}>
              {toggleButton.table}
              <TableIcon />
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default SearchResultHeader
