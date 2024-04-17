import React, { useState } from 'react'
import { Col, Row } from 'reactstrap'
import { CollapseDetails } from '@kth/kth-reactstrap/dist/components/utbildningsinfo'
import { PageHeading } from '@kth/kth-reactstrap/dist/components/studinfo'

import { useStore } from '../mobx'
import i18n from '../../../../i18n'
import Lead from '../components/Lead'
import FooterContent from '../components/FooterContent'

import { SearchInputField } from '../components/index'
import SearchResultDisplay from '../components/SearchResultDisplay'
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
    'search_research_help_7',
  ].map(s => thirdCycleSearchInstructions[s])

  if (langAbbr === 'en') instructionsTexts.push(thirdCycleSearchInstructions.search_research_help_8)

  return instructionsTexts
}

const CourseSearchThirdCycleStudy = () => {
  const { language: lang, languageIndex, textPattern: initialPattern } = useStore()
  const { thirdCycleSearch, thirdCycleSearchInstructions, messages } = i18n.messages[languageIndex]
  const { searchHeading, leadIntro, linkToUsualSearch } = thirdCycleSearch
  const { search_help_collapse_header: collapseHeader, search_research_help_9: lastInstruction } =
    thirdCycleSearchInstructions

  const [pattern, setPattern] = useState(initialPattern)

  const helptexts = getHelpText(lang, languageIndex)

  function handleSubmit(patternValue) {
    setPattern(patternValue)
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
          <CollapseDetails title={collapseHeader}>
            <div className="article">
              <ul>
                {helptexts.map(value => (
                  <li key={value}>{value}</li>
                ))}
                {/* eslint-disable-next-line react/no-danger */}
                <li key="lastInstruction" dangerouslySetInnerHTML={{ __html: lastInstruction }} />
              </ul>
            </div>
          </CollapseDetails>
        </Col>
      </Row>
      <Row>
        <Col>
          <SearchInputField caption={searchHeading} pattern={pattern} onSubmit={handleSubmit} />
        </Col>
      </Row>
      <Row>
        <Col>
          <p style={{ marginTop: '50px' }}>
            <a href={`/student/kurser/sokkurs?l=${lang}`}>{linkToUsualSearch}</a>
          </p>
        </Col>
      </Row>
      <Row>
        <Col>
          <SearchResultDisplay searchParameters={{ pattern, eduLevel: ['3'] }} onlyPattern />
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
