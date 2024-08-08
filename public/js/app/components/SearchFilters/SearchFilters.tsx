import React from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import SearchOptions from '../SearchOptions'
import SearchDepartments from '../SearchDepartments'

import { useStore } from '../../mobx'
import i18n from '../../../../../i18n'

import { SearchFiltersProps, FilterParams, FilterStore } from './searchFiltersTypes'

const SearchFilters: React.FC<SearchFiltersProps> = ({ ancestorItem, updateSearch }) => {
  const { languageIndex, clearStore }: FilterStore = useStore()

  const [searchParams, setSearchParams] = useSearchParams()

  const { generalSearch } = i18n.messages[languageIndex]
  const { filtersLabel } = generalSearch
  const { searchStartPeriodPrefix } = generalSearch
  const currentYearDate = new Date().getFullYear()
  const currentYearLabel = `${searchStartPeriodPrefix} ${currentYearDate}`
  const nextYearLabel = `${searchStartPeriodPrefix} ${Number(currentYearDate) + 1}`

  const updateURLSearchParameters = (paramName: string, paramValue: string[] | string) => {
    searchParams.delete(paramName)
    const appendValue = (value: string) => searchParams.append(paramName, value)
    if (paramValue && typeof paramValue === 'string') {
      appendValue(paramValue)
    } else if (Array.isArray(paramValue)) {
      paramValue.forEach(appendValue)
    }
    setSearchParams(searchParams)
  }

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
        />
        <SearchOptions
          overrideSearchHead={nextYearLabel}
          paramAliasName="nextYear"
          paramName="period"
          onChange={handleFilterValueChange}
        />
        <SearchOptions paramName="eduLevel" onChange={handleFilterValueChange} />
        <SearchOptions paramName="showOptions" onChange={handleFilterValueChange} />
        <SearchDepartments onChange={handleFilterValueChange} />
      </div>
    </>
  )
}

export default SearchFilters
