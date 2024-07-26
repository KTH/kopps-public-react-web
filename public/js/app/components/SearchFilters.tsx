import React, { useReducer } from 'react'
import SearchOptions from './SearchOptions'
import SearchDepartments from './SearchDepartments'

import { useStore } from '../mobx'
import i18n from '../../../../i18n'

interface IAncestorItem {
  href: string
  label: string
}

interface ISearchFiltersProps {
  title: string
  ancestorItem: IAncestorItem
}

interface PeriodParams {
  period: string[]
}

interface EduLevelParams {
  eduLevel: string[]
}

interface ShowOptionsParams {
  showOptions: string[]
}

type Params = PeriodParams | EduLevelParams | ShowOptionsParams

const paramsReducer = (state: Params, action) => ({ ...state, ...action })

const SearchFilters: React.FC<ISearchFiltersProps> = ({ title, ancestorItem }) => {
  const { languageIndex, textPattern: initialPattern = '' } = useStore()

  const { generalSearch } = i18n.messages[languageIndex]
  const { searchStartPeriodPrefix } = generalSearch
  const [state, setState] = useReducer(paramsReducer, { pattern: initialPattern })

  const currentYearDate = new Date().getFullYear()
  const currentYearLabel = `${searchStartPeriodPrefix} ${currentYearDate}`
  const nextYearLabel = `${searchStartPeriodPrefix} ${Number(currentYearDate) + 1}`

  const desktopId = 'local-navigation-title'

  function handleParamChange(params: Params) {
    console.log('params: ', params)
    setState(params)
  }

  // id="mainMenu" is not a correct id as the search filters aren't really a menu.
  // It puts everything in the correct position for now though.
  return (
    <>
      <div id="mainMenu" className="kth-local-navigation col">
        <a href={ancestorItem.href} className="kth-button back">
          {ancestorItem.label}
        </a>
        <h2 id={desktopId}>{title}</h2>
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
    </>
  )
}

export default SearchFilters
