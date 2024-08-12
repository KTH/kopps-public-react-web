import React from 'react'
import { Link } from 'react-router-dom'
import NewSearchOptions from '../NewSearchOptions'
import NewSearchDepartments from '../NewSearchDepartments'

import { useStore } from '../../mobx'
import i18n from '../../../../../i18n'

import { SearchFiltersProps, SearchFilterParams, SearchFilterStore } from './types'
import { DepartmentCodeOrPrefix, EduLevel, Period, ShowOptions } from '../../stores/types/searchPageStoreTypes'

const SearchFilters: React.FC<SearchFiltersProps> = ({
  ancestorItem,
  disabled,
  courseSearchParams,
  setCourseSearchParams,
}) => {
  const { languageIndex }: SearchFilterStore = useStore()

  const { generalSearch } = i18n.messages[languageIndex]
  const { filtersLabel } = generalSearch
  const { searchStartPeriodPrefix } = generalSearch
  const currentYearDate = new Date().getFullYear()
  const currentYearLabel = `${searchStartPeriodPrefix} ${currentYearDate}`
  const nextYearLabel = `${searchStartPeriodPrefix} ${Number(currentYearDate) + 1}`

  function handleFilterValueChange(filterValue: SearchFilterParams) {
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
        <NewSearchOptions
          overrideSearchHead={currentYearLabel}
          paramAliasName="currentYear"
          paramName="period"
          selectedValues={courseSearchParams.period}
          onChange={handleFilterValueChange}
          disabled={disabled}
        />
        <NewSearchOptions
          overrideSearchHead={nextYearLabel}
          paramAliasName="nextYear"
          paramName="period"
          selectedValues={courseSearchParams.period as Period[]}
          onChange={handleFilterValueChange}
          disabled={disabled}
        />
        <NewSearchOptions
          paramName="eduLevel"
          selectedValues={courseSearchParams.eduLevel as EduLevel[]}
          onChange={handleFilterValueChange}
          disabled={disabled}
        />
        <NewSearchOptions
          paramName="showOptions"
          selectedValues={courseSearchParams.showOptions as ShowOptions[]}
          onChange={handleFilterValueChange}
          disabled={disabled}
        />
        <NewSearchDepartments
          departmentCode={courseSearchParams.department as DepartmentCodeOrPrefix}
          onChange={handleFilterValueChange}
          disabled={disabled}
        />
      </div>
    </>
  )
}

export default SearchFilters
