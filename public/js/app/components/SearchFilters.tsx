import React, { useReducer } from 'react'
import SearchOptions from './SearchOptions'
import SearchDepartments from './SearchDepartments'

import { useStore } from '../mobx'
import i18n from '../../../../i18n'

const paramsReducer = (state, action) => ({ ...state, ...action })

const SearchFilters = () => {
  const { languageIndex, textPattern: initialPattern = '' } = useStore()

  const { generalSearch } = i18n.messages[languageIndex]
  const { searchLabel, searchStartPeriodPrefix, collapseHeaderOtherSearchOptions } = generalSearch
  const [state, setState] = useReducer(paramsReducer, { pattern: initialPattern })
  const { pattern } = state

  const currentYearDate = new Date().getFullYear()
  const currentYearLabel = `${searchStartPeriodPrefix} ${currentYearDate}`
  const nextYearLabel = `${searchStartPeriodPrefix} ${Number(currentYearDate) + 1}`

  function handleParamChange(params) {
    setState(params)
  }
  return (
    <div id="mainMenu" className="kth-local-navigation col">
      <SearchOptions
        overrideSearchHead={currentYearLabel}
        paramAliasName="currentYear"
        paramName="period"
        onChange={handleParamChange}
      />

      <SearchOptions
        overrideSearchHead={nextYearLabel}
        paramAliasName="nextYear"
        paramName="period"
        onChange={handleParamChange}
      />
      <SearchOptions paramName="eduLevel" onChange={handleParamChange} />
      <SearchOptions paramName="showOptions" onChange={handleParamChange} />
      <SearchDepartments onChange={handleParamChange} />
    </div>
  )
}

export default SearchFilters
