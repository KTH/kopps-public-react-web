import React, { useState } from 'react'
import { Col, Row } from 'reactstrap'
import { CollapseDetails } from '@kth/kth-kip-style-react-components'
import { PageHeading } from '@kth/kth-reactstrap/dist/components/studinfo'

import { useStore } from '../mobx'
import i18n from '../../../../i18n'
import Lead from '../components/Lead'
import FooterContent from '../components/FooterContent'

import { SearchFormFields, SearchResultDisplay } from '../components/index'

function getHelpText(langIndex) {
  const { searchInstructions } = i18n.messages[langIndex]

  return [
    'search_help_1',
    'search_help_2',
    'search_help_3',
    'search_help_4',
    'search_help_5',
    'search_help_7',
    'search_help_8',
    'search_help_9',
  ].map(s => searchInstructions[s])
}

function hasValue(param) {
  if (!param || param === null) return false
  if (typeof param === 'object' && param.length === 0) return false
  return true
}

function _checkAndGetResultValues({ department, eduLevel, pattern, period, showOptions }) {
  // clean params

  const resultValues = {}

  if (hasValue(eduLevel)) resultValues.eduLevel = eduLevel
  if (hasValue(pattern)) resultValues.pattern = pattern
  if (hasValue(showOptions)) resultValues.showOptions = showOptions
  if (hasValue(period)) resultValues.period = period
  if (hasValue(department)) resultValues.department = department

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
  const { searchHeading, leadIntro } = bigSearch
  const { search_help_collapse_header: collapseHeader, search_help_10: lastInstruction } = searchInstructions

  const [params, setParams] = useState(
    _checkAndGetResultValues({
      department: storeDepartment,
      eduLevel: storeEduLevel,
      pattern: storePattern,
      period: storePeriod,
      showOptions: storeShowOptions,
    })
  )

  const helptexts = getHelpText(languageIndex)

  function handleSubmit(props) {
    const finalSearchParams = _checkAndGetResultValues(props)

    setParams(finalSearchParams)
  }

  return (
    <main id="mainContent">
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
          <CollapseDetails color="white" title={collapseHeader}>
            <ul>
              {helptexts.map(value => (
                <li key={value}>{value}</li>
              ))}
              <li key="lastInstruction" dangerouslySetInnerHTML={{ __html: lastInstruction }} />
            </ul>
          </CollapseDetails>
        </Col>
      </Row>
      <Row>
        <Col>
          <SearchFormFields caption={searchHeading} onSubmit={handleSubmit} />
        </Col>
      </Row>
      <Row>
        <Col>
          <SearchResultDisplay searchParameters={params} />
        </Col>
      </Row>
      <Row>
        <Col>
          <FooterContent />
        </Col>
      </Row>
    </main>
  )
}

export default CourseSearch
