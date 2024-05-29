import React, { useState } from 'react'
import { Col, Row } from 'reactstrap'
import { CollapseDetails } from '@kth/kth-reactstrap/dist/components/utbildningsinfo'
import { PageHeading, Link } from '@kth/kth-reactstrap/dist/components/studinfo'

import { useStore } from '../mobx'
import i18n from '../../../../i18n'
import { Lead, HelpTexts, FooterContent, SearchResultDisplay, ThirdCycleStudySearchFormFields } from '../components'

import { replaceSiteLinkForThirdCyclePages, courseSearchLiink } from '../util/links'
import { getHelpText, hasValue } from '../util/searchHelper'

function _checkAndGetCollapseOptions({ department, showOptions }) {
  // clean params

  const optionsValues = {}

  if (hasValue(showOptions)) optionsValues.showOptions = showOptions
  if (hasValue(department)) optionsValues.department = department

  return optionsValues
}

function _checkAndGetResultValues({ department, pattern, showOptions }) {
  // clean params
  const optionsInCollapse = _checkAndGetCollapseOptions({ department, showOptions })

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

  const helptexts = getHelpText(languageIndex, 'thirdCycleSearchInstructions', [
    'search_research_help_1',
    'search_research_help_2',
    'search_research_help_3',
    'search_research_help_4',
    'search_research_help_5',
    'search_research_help_6',
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
            <HelpTexts helptexts={helptexts} />
          </CollapseDetails>
        </Col>
      </Row>
      <Row>
        <Col>
          <Link href={courseSearchLiink('sokkurs', lang)}>{linkToUsualSearch}</Link>
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
