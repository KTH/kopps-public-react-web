import React from 'react'
import { CollapseDetails } from '@kth/kth-reactstrap/dist/components/utbildningsinfo'

import { useStore } from '../../mobx'
import i18n from '../../../../../i18n'

import SearchDepartments from '../SearchDepartments'
import SearchOptions from '../SearchOptions'
import { FilterParams, SearchFilterStore, SearchFiltersProps, FILTER_MODES } from './types'
import {
  DepartmentCodeOrPrefix,
  EduLevel,
  Period,
  Semester,
  ShowOptions,
} from '../../stores/types/searchPageStoreTypes'
import { SEARCH_MODES } from '../../pages/types/searchPageTypes'
import { EducationalLevelCode } from '@kth/om-kursen-ladok-client'
const SearchFilters: React.FC<SearchFiltersProps> = ({
  disabled,
  courseSearchParams,
  setCourseSearchParams,
  collapsable = false,
  searchMode = SEARCH_MODES.default,
}) => {
  const { languageIndex }: SearchFilterStore = useStore()

  const filterMode = FILTER_MODES[searchMode]
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
      semesters: [],
      eduLevel: searchMode === SEARCH_MODES.thirdCycleCourses ? [EducationalLevelCode.Research] : [],
      showOptions: [],
      department: '',
    })
  }

  const hasActiveFilters = Object.entries(courseSearchParams).some(([key, value]) => {
    if (
      (searchMode !== SEARCH_MODES.thirdCycleCourses && key !== 'pattern') ||
      (searchMode === SEARCH_MODES.thirdCycleCourses && key !== 'pattern' && key !== 'eduLevel')
    ) {
      return Array.isArray(value) ? value.length > 0 : !!value
    }
    return false // Ignore the 'pattern' key
  })

  const renderFilterGroup = (
    <>
      {filterMode.includes('semesters') && (
        <div className={collapsable ? 'row' : ''}>
          <div className={collapsable ? 'col' : ''}>
            <SearchOptions
              paramName="semesters"
              selectedValues={courseSearchParams.semesters as Semester[]}
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
              <SearchOptions
                paramName="eduLevel"
                selectedValues={courseSearchParams.eduLevel as EduLevel[]}
                onChange={handleFilterValueChange}
                disabled={disabled}
              />
            </div>
          )}
          {filterMode.includes('eduLevel') && (
            <div className={collapsable ? 'col' : ''}>
              <SearchOptions
                paramName="showOptions"
                selectedValues={courseSearchParams.showOptions as ShowOptions[]}
                onChange={handleFilterValueChange}
                disabled={disabled}
              />
            </div>
          )}
          {filterMode.includes('onlyMHU') && (
            <SearchOptions
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
            <SearchDepartments
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
