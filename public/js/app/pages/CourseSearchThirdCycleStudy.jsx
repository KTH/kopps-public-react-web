import React, { useState } from 'react'
import { Col, Row } from 'reactstrap'
import { CollapseDetails } from '@kth/kth-reactstrap/dist/components/utbildningsinfo'
import { PageHeading } from '@kth/kth-reactstrap/dist/components/studinfo'

import { useStore } from '../mobx'
import i18n from '../../../../i18n'
import Lead from '../components/Lead'
import FooterContent from '../components/FooterContent'

import SearchResultDisplay from '../components/SearchResultDisplay'
import ThirdCycleStudySearchFormFields from '../components/ThirdCycleStudySearchFormFields'

import { replaceSiteLinkForThirdCyclePages } from '../util/links'

function getHelpText(langAbbr, langIndex) {
  const { thirdCycleSearchInstructions } = i18n.messages[langIndex]
  const instructionsTexts = [
    'search_research_help_1',
    'search_research_help_2',
    'search_research_help_3',
    'search_research_help_4',
    'search_research_help_5',
    'search_research_help_6',
  ].map(s => thirdCycleSearchInstructions[s])

  return instructionsTexts
}

function hasValue(param) {
  if (!param || param === null || param === '') return false
  if (typeof param === 'object' && param.length === 0) return false
  if (typeof param === 'string' && param.trim().length === 0) return false
  return true
}

function _checkAndGetOtherOptions({ department, showOptions }) {
  // clean params

  const optionsValues = {}

  if (hasValue(showOptions)) optionsValues.showOptions = showOptions
  if (hasValue(department)) optionsValues.department = department

  return optionsValues
}

function _checkAndGetResultValues({ department, pattern, showOptions }) {
  // clean params
  const optionsInCollapse = _checkAndGetOtherOptions({ department, showOptions })

  const resultValues = optionsInCollapse
  if (hasValue(pattern)) resultValues.pattern = pattern
  if (hasValue(pattern) || Object.keys(optionsInCollapse).length !== 0) resultValues.eduLevel = ['3']

  return resultValues
}

const CourseSearchThirdCycleStudy = () => {
  const {
    language: lang,
    languageIndex,
    textPattern: storePattern,
    departmentCodeOrPrefix: storeDepartment,
    showOptions: storeShowOptions,
  } = useStore()
  const { thirdCycleSearch, thirdCycleSearchInstructions, messages } = i18n.messages[languageIndex]
  const { searchHeading, leadIntro, linkToUsualSearch } = thirdCycleSearch
  const { search_help_collapse_header: collapseHeader } = thirdCycleSearchInstructions

  const [params, setParams] = useState(
    _checkAndGetResultValues({
      department: storeDepartment,
      pattern: storePattern,
      showOptions: storeShowOptions,
    })
  )

  const helptexts = getHelpText(lang, languageIndex)

  function handleSubmit(props) {
    const finalSearchParams = _checkAndGetResultValues(props)

    setParams(finalSearchParams)
  }

  function _openOptionsInCollapse() {
    const hasChosenOptions = _checkAndGetOtherOptions(params)
    if (Object.values(hasChosenOptions).length === 0) return false
    return true
  }

  React.useEffect(() => {
    let isMounted = true
    if (isMounted) {
      const { third_cycle_courses_by_school: siteName } = messages
      replaceSiteLinkForThirdCyclePages(siteName, lang)
    }
    return () => (isMounted = false)
  })

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
          <ThirdCycleStudySearchFormFields
            openOptions={_openOptionsInCollapse()}
            caption={searchHeading}
            onSubmit={handleSubmit}
          />
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
            <div className="article">
              <ul>
                {helptexts.map(value => (
                  <li key={value}>{value}</li>
                ))}
              </ul>
            </div>
          </CollapseDetails>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>
            <a href={`/student/kurser/sokkurs?l=${lang}`}>{linkToUsualSearch}</a>
          </p>
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

export default CourseSearchThirdCycleStudy
