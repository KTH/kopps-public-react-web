import React, { useState } from 'react'
import { Col, Row } from 'reactstrap'
import { CollapseDetails } from '@kth/kth-reactstrap/dist/components/utbildningsinfo'
import { PageHeading } from '@kth/kth-reactstrap/dist/components/studinfo'

import { useStore } from '../mobx'
import i18n from '../../../../i18n'
import { Lead, FooterContent, SearchResultDisplay, SearchFormFields, HelpTexts } from '../components/Lead'

import { getHelpText, hasValue } from '../util/searchHelper'

function _checkAndGetCollapseOptions({ department, eduLevel, period, showOptions }) {
  // clean params

  const optionsValues = {}

  if (hasValue(eduLevel)) optionsValues.eduLevel = eduLevel
  if (hasValue(showOptions)) optionsValues.showOptions = showOptions
  if (hasValue(period)) optionsValues.period = period
  if (hasValue(department)) optionsValues.department = department

  return optionsValues
}

function _checkAndGetResultValues({ department, eduLevel, pattern, period, showOptions }) {
  // clean params
  const optionsInCollapse = _checkAndGetCollapseOptions({ department, eduLevel, period, showOptions })

  const resultValues = optionsInCollapse
  if (hasValue(pattern)) resultValues.pattern = pattern

  return resultValues
}

const CourseSearch = () => {
  const {
    languageIndex,
    textPattern: storePattern,
    departmentCodeOrPrefix: storeDepartment,
    eduLevel: storeEduLevel,
    period: storePeriod,
    showOptions: storeShowOptions,
  } = useStore()
  const { bigSearch, searchInstructions } = i18n.messages[languageIndex]
  const { searchHeading, leadIntro, searchButton } = bigSearch
  const { search_help_collapse_header: collapseHeader, search_help_10: lastInstruction } = searchInstructions
  // const [loadStatus, setLoadStatus] = useState('firstLoad')
  const [params, setParams] = useState(
    _checkAndGetResultValues({
      department: storeDepartment,
      eduLevel: storeEduLevel,
      pattern: storePattern,
      period: storePeriod,
      showOptions: storeShowOptions,
    })
  )

  const helptexts = getHelpText(languageIndex, 'searchInstructions', [
    'search_help_1',
    'search_help_2',
    'search_help_3',
    'search_help_4',
    'search_help_5',
    'search_help_6',
    'search_help_7',
    'search_help_8',
    'search_help_9',
  ])

  function handleSubmit(props) {
    const finalSearchParams = _checkAndGetResultValues(props)

    setParams(finalSearchParams)
  }

  function _openOptionsInCollapse() {
    const hasChosenOptions = _checkAndGetCollapseOptions(params)
    if (Object.values(hasChosenOptions).length === 0) return false
    return true
  }

  return (
    <>
      <Row>
        <Col>
          <PageHeading>{searchHeading}</PageHeading>
          <Lead text={leadIntro} />
        </Col>
      </Row>
      <Row>
        <Col>
          <div id="alert-placeholder" />
        </Col>
      </Row>

      <Row>
        <Col>
          <SearchFormFields openOptions={_openOptionsInCollapse()} caption={searchButton} onSubmit={handleSubmit} />
        </Col>
      </Row>
      <Row>
        <Col>
          <SearchResultDisplay searchParameters={params} />
        </Col>
      </Row>
      <Row>
        <Col>
          <CollapseDetails title={collapseHeader}>
            <HelpTexts helptexts={helptexts} />
          </CollapseDetails>
        </Col>
      </Row>
      <Row>
        <Col>
          <FooterContent />
        </Col>
      </Row>
    </>
  )
}

export default CourseSearch
