import React from 'react'
import { Link } from 'react-router-dom'
import NewSearchOptions from '../NewSearchOptions'
import NewSearchDepartments from '../NewSearchDepartments'

import { useStore } from '../../mobx'
import i18n from '../../../../../i18n'

import { SidebarFiltersProps, FilterParams, SearchFilterStore, FILTER_MODES } from './types'
import { DepartmentCodeOrPrefix, EduLevel, Period, ShowOptions } from '../../stores/types/searchPageStoreTypes'

const SidebarFilters: React.FC<SidebarFiltersProps> = ({
  ancestorItem,
  disabled,
  courseSearchParams,
  setCourseSearchParams,
  filterMode = FILTER_MODES.default,
}) => {
  const { languageIndex }: SearchFilterStore = useStore()

  const { generalSearch, bigSearch } = i18n.messages[languageIndex]
  const { filtersLabel } = generalSearch
  const { onlyMHULabel } = bigSearch
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
        {filterMode.includes('period') && (
          <NewSearchOptions
            overrideSearchHead={currentYearLabel}
            paramAliasName="currentYear"
            paramName="period"
            selectedValues={courseSearchParams.period as Period[]}
            onChange={handleFilterValueChange}
            disabled={disabled}
          />
        )}
        {filterMode.includes('period') && (
          <NewSearchOptions
            overrideSearchHead={nextYearLabel}
            paramAliasName="nextYear"
            paramName="period"
            selectedValues={courseSearchParams.period as Period[]}
            onChange={handleFilterValueChange}
            disabled={disabled}
          />
        )}
        {filterMode.includes('eduLevel') && (
          <NewSearchOptions
            paramName="eduLevel"
            selectedValues={courseSearchParams.eduLevel as EduLevel[]}
            onChange={handleFilterValueChange}
            disabled={disabled}
          />
        )}
        {filterMode.includes('showOptions') && (
          <NewSearchOptions
            paramName="showOptions"
            selectedValues={courseSearchParams.showOptions as ShowOptions[]}
            onChange={handleFilterValueChange}
            disabled={disabled}
          />
        )}
        {filterMode.includes('onlyMHU') && (
          <NewSearchOptions
            paramName="showOptions"
            paramAliasName="onlyMHU"
            selectedValues={courseSearchParams.showOptions as ShowOptions[]}
            onChange={handleFilterValueChange}
            overrideSearchHead={onlyMHULabel}
          />
        )}
        {filterMode.includes('department') && (
          <NewSearchDepartments
            departmentCode={courseSearchParams.department as DepartmentCodeOrPrefix}
            onChange={handleFilterValueChange}
            disabled={disabled}
          />
        )}
      </div>
    </>
  )
}

export default SidebarFilters
