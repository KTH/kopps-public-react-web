import React from 'react'
import { Col, Row } from 'reactstrap'
import { CollapseDetails } from '@kth/kth-reactstrap/dist/components/utbildningsinfo'

import { useStore } from '../../mobx'
import i18n from '../../../../../i18n'

import NewSearchDepartments from '../NewSearchDepartments'
import NewSearchOptions from '../NewSearchOptions'
import { CollapsableFiltersProps, FilterParams, SearchFilterStore } from './types'
import { DepartmentCodeOrPrefix, EduLevel, Period, ShowOptions } from '../../stores/types/searchPageStoreTypes'

const CollapsableFilters: React.FC<CollapsableFiltersProps> = ({ courseSearchParams, setCourseSearchParams }) => {
  const { languageIndex }: SearchFilterStore = useStore()

  const { generalSearch } = i18n.messages[languageIndex]
  const { searchStartPeriodPrefix, collapseHeaderOtherSearchOptions } = generalSearch

  const currentYearDate = new Date().getFullYear()
  const currentYearLabel = `${searchStartPeriodPrefix} ${currentYearDate}`
  const nextYearLabel = `${searchStartPeriodPrefix} ${Number(currentYearDate) + 1}`

  function handleFilterValueChange(filterValue: FilterParams) {
    setCourseSearchParams(filterValue)
  }

  return (
    <>
      <CollapseDetails title={collapseHeaderOtherSearchOptions}>
        <Row>
          <Col>
            <NewSearchOptions
              overrideSearchHead={currentYearLabel}
              paramAliasName="currentYear"
              paramName="period"
              selectedValues={courseSearchParams.period as Period[]}
              onChange={handleFilterValueChange}
            />
          </Col>
          <Col>
            <NewSearchOptions
              overrideSearchHead={nextYearLabel}
              paramAliasName="nextYear"
              paramName="period"
              selectedValues={courseSearchParams.period as Period[]}
              onChange={handleFilterValueChange}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <NewSearchOptions
              paramName="eduLevel"
              selectedValues={courseSearchParams.eduLevel as EduLevel[]}
              onChange={handleFilterValueChange}
            />
          </Col>
          <Col>
            <NewSearchOptions
              paramName="showOptions"
              selectedValues={courseSearchParams.showOptions as ShowOptions[]}
              onChange={handleFilterValueChange}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <NewSearchDepartments
              departmentCode={courseSearchParams.department as DepartmentCodeOrPrefix}
              onChange={handleFilterValueChange}
            />
          </Col>
        </Row>
      </CollapseDetails>
    </>
  )
}

export default CollapsableFilters
