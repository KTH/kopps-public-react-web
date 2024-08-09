import React from 'react'
import { Link } from 'react-router-dom'
import SearchDepartments from '../SearchDepartments'
import SearchOptions from '../SearchOptions'

import i18n from '../../../../../i18n'
import { useStore } from '../../mobx'

import { FilterParams, FilterStore, SearchFiltersProps } from './searchFiltersTypes'

const SearchFilters: React.FC<SearchFiltersProps> = ({
  courseSearchParams,
  setCourseSearchParams,
  ancestorItem,
  disabled,
}) => {
  const { languageIndex }: FilterStore = useStore()

  const { generalSearch } = i18n.messages[languageIndex]
  const { filtersLabel } = generalSearch
  const { searchStartPeriodPrefix } = generalSearch
  const currentYearDate = new Date().getFullYear()
  const currentYearLabel = `${searchStartPeriodPrefix} ${currentYearDate}`
  const nextYearLabel = `${searchStartPeriodPrefix} ${Number(currentYearDate) + 1}`

  function handleFilterValueChange(filterValue: FilterParams) {
    setCourseSearchParams(filterValue)
  }

  // id="mainMenu" is not a correct id as the search filters aren't really a menu.
  // It puts everything in the correct position for now though.
  return (
    <>
      <div id="mainMenu" className="kth-local-navigation col">
        <Link to={ancestorItem.href} className="kth-button back">
          {ancestorItem.label}
        </Link>
        <h3>{filtersLabel}</h3>
        <SearchOptions
          overrideSearchHead={currentYearLabel}
          paramAliasName="currentYear"
          paramName="period"
          selectedValues={courseSearchParams.period}
          onChange={handleFilterValueChange}
          disabled={disabled}
        />
        <SearchOptions
          overrideSearchHead={nextYearLabel}
          paramAliasName="nextYear"
          paramName="period"
          selectedValues={courseSearchParams.period}
          onChange={handleFilterValueChange}
          disabled={disabled}
        />
        <SearchOptions
          paramName="eduLevel"
          selectedValues={courseSearchParams.eduLevel}
          onChange={handleFilterValueChange}
          disabled={disabled}
        />
        <SearchOptions
          paramName="showOptions"
          selectedValues={courseSearchParams.showOptions}
          onChange={handleFilterValueChange}
          disabled={disabled}
        />
        <SearchDepartments
          onChange={handleFilterValueChange}
          disabled={disabled}
          departmentCode={courseSearchParams.department}
        />
      </div>
    </>
  )
}

export default SearchFilters
