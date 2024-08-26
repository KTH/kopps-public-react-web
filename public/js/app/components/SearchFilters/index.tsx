import React from 'react'
import { CollapseDetails } from '@kth/kth-reactstrap/dist/components/utbildningsinfo'

import { useStore } from '../../mobx'
import i18n from '../../../../../i18n'

import NewSearchDepartments from '../NewSearchDepartments'
import NewSearchOptions from '../NewSearchOptions'
import { FilterParams, SearchFilterStore, SearchFiltersProps, FILTER_MODES } from './types'
import { DepartmentCodeOrPrefix, EduLevel, Period, ShowOptions } from '../../stores/types/searchPageStoreTypes'
const SearchFilters: React.FC<SearchFiltersProps> = ({
  disabled,
  courseSearchParams,
  setCourseSearchParams,
  collapsable = false,
  filterMode = FILTER_MODES.default,
}) => {
  const { languageIndex }: SearchFilterStore = useStore()

  const { generalSearch, bigSearch } = i18n.messages[languageIndex]
  const { searchStartPeriodPrefix, collapseHeaderOtherSearchOptions } = generalSearch
  const { onlyMHULabel, clearFilters } = bigSearch

  const currentYearDate = new Date().getFullYear()
  const currentYearLabel = `${searchStartPeriodPrefix} ${currentYearDate}`
  const nextYearLabel = `${searchStartPeriodPrefix} ${Number(currentYearDate) + 1}`

  function handleFilterValueChange(filterValue: FilterParams) {
    setCourseSearchParams(filterValue)
  }

  function handleClearFilters() {
    setCourseSearchParams({
      period: [],
      eduLevel: [],
      showOptions: [],
      department: '',
    })
  }

  const hasActiveFilters = Object.entries(courseSearchParams).some(([key, value]) => {
    if (key !== 'pattern') {
      return Array.isArray(value) ? value.length > 0 : !!value
    }
    return false // Ignore the 'pattern' key
  })

  const renderFilterGroup = (
    <>
      {filterMode.includes('period') && (
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
      )}

      {/* Education Level and Show Options */}
      {(filterMode.includes('eduLevel') || filterMode.includes('showOptions') || filterMode.includes('onlyMHU')) && (
        <div className={collapsable ? 'row' : ''}>
          {filterMode.includes('eduLevel') && (
            <div className={collapsable ? 'col' : ''}>
              <NewSearchOptions
                paramName="eduLevel"
                selectedValues={courseSearchParams.eduLevel as EduLevel[]}
                onChange={handleFilterValueChange}
                disabled={disabled}
              />
            </div>
          )}
          {filterMode.includes('eduLevel') && (
            <div className={collapsable ? 'col' : ''}>
              <NewSearchOptions
                paramName="showOptions"
                selectedValues={courseSearchParams.showOptions as ShowOptions[]}
                onChange={handleFilterValueChange}
                disabled={disabled}
              />
            </div>
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
        </div>
      )}

      {filterMode.includes('department') && (
        <div className={collapsable ? 'row' : ''}>
          <div className={collapsable ? 'col' : ''}>
            <NewSearchDepartments
              departmentCode={courseSearchParams.department as DepartmentCodeOrPrefix}
              onChange={handleFilterValueChange}
              disabled={disabled}
            />
          </div>
        </div>
      )}
      {hasActiveFilters && !collapsable && (
        <button onClick={handleClearFilters} className="kth-button secondary clear-filters">
          {clearFilters}
        </button>
      )}
    </>
  )

  return collapsable ? (
    <CollapseDetails title={collapseHeaderOtherSearchOptions}>{renderFilterGroup}</CollapseDetails>
  ) : (
    <>{renderFilterGroup}</>
  )
}

export default SearchFilters
