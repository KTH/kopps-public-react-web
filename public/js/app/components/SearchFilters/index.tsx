import React from 'react'
import { Link } from 'react-router-dom'
import SearchOptions from '../SearchOptions'
import SearchDepartments from '../SearchDepartments'

import useUpdateURLSearchParameters from '../../hooks/useUpdateURLSearchParameters'

import { useStore } from '../../mobx'
import i18n from '../../../../../i18n'

import { SearchFiltersProps, FilterParams, FilterStore } from './types'

const SearchFilters: React.FC<SearchFiltersProps> = ({ ancestorItem, updateSearch, disabled }) => {
  const { languageIndex, clearStore }: FilterStore = useStore()

  const updateURLSearchParameters = useUpdateURLSearchParameters()

  const { generalSearch } = i18n.messages[languageIndex]
  const { filtersLabel } = generalSearch
  const { searchStartPeriodPrefix } = generalSearch
  const currentYearDate = new Date().getFullYear()
  const currentYearLabel = `${searchStartPeriodPrefix} ${currentYearDate}`
  const nextYearLabel = `${searchStartPeriodPrefix} ${Number(currentYearDate) + 1}`

  function handleFilterValueChange(filterValue: FilterParams) {
    const filterName = Object.keys(filterValue)[0]
    updateURLSearchParameters(filterName, filterValue[filterName])
    updateSearch(filterValue)
  }

  function handleBackButton() {
    clearStore()
  }

  // id="mainMenu" is not a correct id as the search filters aren't really a menu.
  // It puts everything in the correct position for now though.
  return (
    <>
      <div id="mainMenu" className="kth-local-navigation col">
        <Link to={ancestorItem.href} onClick={handleBackButton} className="kth-button back">
          {ancestorItem.label}
        </Link>
        <h3>{filtersLabel}</h3>
        <SearchOptions
          overrideSearchHead={currentYearLabel}
          paramAliasName="currentYear"
          paramName="period"
          onChange={handleFilterValueChange}
          disabled={disabled}
        />
        <SearchOptions
          overrideSearchHead={nextYearLabel}
          paramAliasName="nextYear"
          paramName="period"
          onChange={handleFilterValueChange}
          disabled={disabled}
        />
        <SearchOptions paramName="eduLevel" onChange={handleFilterValueChange} disabled={disabled} />
        <SearchOptions paramName="showOptions" onChange={handleFilterValueChange} disabled={disabled} />
        <SearchDepartments onChange={handleFilterValueChange} disabled={disabled} />
      </div>
    </>
  )
}

export default SearchFilters
