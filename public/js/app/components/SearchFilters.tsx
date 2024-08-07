import React, { useReducer } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import SearchOptions from './SearchOptions'
import SearchDepartments from './SearchDepartments'

import { useStore } from '../mobx'
import i18n from '../../../../i18n'

interface IAncestorItem {
  href: string
  label: string
}

interface ISearchFiltersProps {
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

interface IStore {
  languageIndex: number
  textPattern: string
}

const paramsReducer = (state: Params, action: any) => ({ ...state, ...action })

const SearchFilters: React.FC<ISearchFiltersProps> = ({ ancestorItem }) => {
  const { languageIndex, textPattern: initialPattern = '' }: IStore = useStore()

  const { generalSearch } = i18n.messages[languageIndex]
  const { filtersLabel } = generalSearch
  const { searchStartPeriodPrefix } = generalSearch
  const [state, setState] = useReducer(paramsReducer, { pattern: initialPattern })

  const currentYearDate = new Date().getFullYear()
  const currentYearLabel = `${searchStartPeriodPrefix} ${currentYearDate}`
  const nextYearLabel = `${searchStartPeriodPrefix} ${Number(currentYearDate) + 1}`

  const desktopId = 'local-navigation-title'

  const navigate = useNavigate()

  function handleParamChange(params: Params) {
    console.log('params: ', params)
    setState(params)
  }


  // id="mainMenu" is not a correct id as the search filters aren't really a menu.
  // It puts everything in the correct position for now though.
  return (
    <>
      <div id="mainMenu" className="kth-local-navigation col">
        <Link to={ancestorItem.href} className="kth-button back">
          {ancestorItem.label}
        </Link>
        <h2 id={desktopId}>{filtersLabel}</h2>
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
