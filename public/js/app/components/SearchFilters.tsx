import React, { useReducer } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import SearchOptions from './SearchOptions'
import SearchDepartments from './SearchDepartments'

import { useStore } from '../mobx'
import i18n from '../../../../i18n'
import {
  SetEduLevels,
  SetPeriods,
  SetShowOptions,
  SetDepartmentCodeOrPrefix,
  EduLevel,
  ShowOptions,
} from '../stores/newSearchPageStore'

interface IAncestorItem {
  href: string
  label: string
}

interface ISearchFiltersProps {
  ancestorItem: IAncestorItem,
  updateState: any
}

interface PeriodParams {
  period: string[]
}

interface EduLevelParams {
  eduLevel: EduLevel[]
}

interface ShowOptionsParams {
  showOptions: ShowOptions[]
}

interface DepartmentParams {
  department: string
}

interface IStore {
  languageIndex: number
  textPattern: string
  setEduLevels: SetEduLevels
  setPeriods: SetPeriods
  setShowOptions: SetShowOptions
  setDepartmentCodeOrPrefix: SetDepartmentCodeOrPrefix
}

const SearchFilters: React.FC<ISearchFiltersProps> = ({ ancestorItem, updateState }) => {
  const {
    languageIndex,
  }: IStore = useStore()

  const [searchParams, setSearchParams] = useSearchParams()

  const { generalSearch } = i18n.messages[languageIndex]
  const { filtersLabel } = generalSearch
  const { searchStartPeriodPrefix } = generalSearch
  const currentYearDate = new Date().getFullYear()
  const currentYearLabel = `${searchStartPeriodPrefix} ${currentYearDate}`
  const nextYearLabel = `${searchStartPeriodPrefix} ${Number(currentYearDate) + 1}`

  const navigate = useNavigate()

  const updateSearchParameters = (paramName: string, paramValue: string[] | string) => {
    if (!paramValue) return
    searchParams.delete(paramName)
    if (typeof paramValue === 'string') {
      searchParams.append(paramValue, paramValue)
    } else {
      paramValue.forEach(value => searchParams.append(paramName, value))
    }
    setSearchParams(searchParams)
  }

  function handlePeriodChange(periods: PeriodParams) {
    updateSearchParameters('period', periods.period)
    updateState(periods)
  }

  function handleEduLevelChange(eduLevels: EduLevelParams) {
    updateSearchParameters('eduLevel', eduLevels.eduLevel)
    updateState(eduLevels)

  }

  function handleShowOptionsChange(showOptions: ShowOptionsParams) {
    updateSearchParameters('showOptions', showOptions.showOptions)
    updateState(showOptions)
  }

  function handleDepartmentCodeOrPrefixChange(departmentCodeOrPrefix: DepartmentParams) {
    updateSearchParameters('department', departmentCodeOrPrefix.department)
    updateState(departmentCodeOrPrefix)
  }

  function handleBackButton() {
    navigate({
      pathname: ancestorItem.href,
    })
  }

  // id="mainMenu" is not a correct id as the search filters aren't really a menu.
  // It puts everything in the correct position for now though.
  return (
    <>
      <div id="mainMenu" className="kth-local-navigation col">
        <a onClick={handleBackButton} className="kth-button back">
          {ancestorItem.label}
        </a>
        <h3>{filtersLabel}</h3>
        <SearchOptions
          overrideSearchHead={currentYearLabel}
          paramAliasName="currentYear"
          paramName="period"
          onChange={handlePeriodChange}
        />
        <SearchOptions
          overrideSearchHead={nextYearLabel}
          paramAliasName="nextYear"
          paramName="period"
          onChange={handlePeriodChange}
        />
        <SearchOptions paramName="eduLevel" onChange={handleEduLevelChange} />
        <SearchOptions paramName="showOptions" onChange={handleShowOptionsChange} />
        <SearchDepartments onChange={handleDepartmentCodeOrPrefixChange} />
      </div>
    </>
  )
}

export default SearchFilters
