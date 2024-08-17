import React from 'react'
import { CollapseDetails } from '@kth/kth-reactstrap/dist/components/utbildningsinfo'
import { Link } from 'react-router-dom'

import { useStore } from '../../mobx'
import i18n from '../../../../../i18n'

import NewSearchDepartments from '../NewSearchDepartments'
import NewSearchOptions from '../NewSearchOptions'
import { FilterParams, SearchFilterStore, SearchFiltersProps } from './types'
import { DepartmentCodeOrPrefix, EduLevel, Period, ShowOptions } from '../../stores/types/searchPageStoreTypes'

const SearchFilters: React.FC<SearchFiltersProps> = ({
  ancestorItem,
  disabled,
  courseSearchParams,
  setCourseSearchParams,
  collapsable = false,
}) => {
  const { languageIndex }: SearchFilterStore = useStore()

  const { generalSearch } = i18n.messages[languageIndex]
  const { searchStartPeriodPrefix, collapseHeaderOtherSearchOptions, filtersLabel } = generalSearch

  const currentYearDate = new Date().getFullYear()
  const currentYearLabel = `${searchStartPeriodPrefix} ${currentYearDate}`
  const nextYearLabel = `${searchStartPeriodPrefix} ${Number(currentYearDate) + 1}`

  function handleFilterValueChange(filterValue: FilterParams) {
    setCourseSearchParams(filterValue)
  }

  const renderFilterGroup = (
    <>
      <div className={collapsable ? 'row' : ''}>
        <div className={collapsable ? 'col' : ''}>
          <NewSearchOptions
            overrideSearchHead={currentYearLabel}
            paramAliasName="currentYear"
            paramName="period"
            selectedValues={courseSearchParams.period as Period[]}
            onChange={handleFilterValueChange}
            disabled={disabled}
          />
        </div>
        <div className={collapsable ? 'col' : ''}>
          <NewSearchOptions
            overrideSearchHead={nextYearLabel}
            paramAliasName="nextYear"
            paramName="period"
            selectedValues={courseSearchParams.period as Period[]}
            onChange={handleFilterValueChange}
            disabled={disabled}
          />
        </div>
      </div>

      {/* Education Level and Show Options */}
      <div className={collapsable ? 'row' : ''}>
        <div className={collapsable ? 'col' : ''}>
          <NewSearchOptions
            paramName="eduLevel"
            selectedValues={courseSearchParams.eduLevel as EduLevel[]}
            onChange={handleFilterValueChange}
            disabled={disabled}
          />
        </div>
        <div className={collapsable ? 'col' : ''}>
          <NewSearchOptions
            paramName="showOptions"
            selectedValues={courseSearchParams.showOptions as ShowOptions[]}
            onChange={handleFilterValueChange}
            disabled={disabled}
          />
        </div>
      </div>

      {/* Departments */}
      <div className={collapsable ? 'row' : ''}>
        <div className={collapsable ? 'col' : ''}>
          <NewSearchDepartments
            departmentCode={courseSearchParams.department as DepartmentCodeOrPrefix}
            onChange={handleFilterValueChange}
            disabled={disabled}
          />
        </div>
      </div>
    </>
  )

  return collapsable ? (
    <CollapseDetails title={collapseHeaderOtherSearchOptions}>{renderFilterGroup}</CollapseDetails>
  ) : (
    <div id="mainMenu" className="kth-local-navigation col">
      <Link to={ancestorItem.href} className="kth-button back">
        {ancestorItem.label}
      </Link>
      <h3>{filtersLabel}</h3>
      {renderFilterGroup}
    </div>
  )
}

export default SearchFilters
