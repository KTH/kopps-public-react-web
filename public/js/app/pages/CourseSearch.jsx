import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { Col, Row } from 'reactstrap'
import { CollapseDetails } from '@kth/kth-kip-style-react-components'
import { useStore } from '../mobx'
import i18n from '../../../../i18n'
import { PageHeading, Heading } from '@kth/kth-reactstrap/dist/components/studinfo'
import Lead from '../components/Lead'
import { SearchFormFields, SearchResultDisplay } from '../components/index'
import { getHelpText } from '../../../../domain/searchParams'

const CourseSearch = () => {
  const { language: lang, languageIndex, textPattern: initialPattern } = useStore()
  const { thirdCycleSearch, searchInstructions } = i18n.messages[languageIndex]
  const { searchHeading, leadIntro, linkToUsualSearch, resultsHeading } = thirdCycleSearch
  const { search_help_collapse_header: collapseHeader, search_help_10: lastInstruction } = searchInstructions

  const [pattern, setPattern] = useState(initialPattern)

  const helptexts = getHelpText(languageIndex)

  function handleSubmit(pattern) {
    setPattern(pattern)
  }

  return (
    <main id="mainContent">
      <Row>
        <Col>
          <PageHeading>{searchHeading}</PageHeading>
          <Lead text={leadIntro} />
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
          <div id="alert-placeholder" />
        </Col>
      </Row>
      <Row>
        <Col>
          <SearchFormFields caption={searchHeading} pattern={pattern} onSubmit={handleSubmit} />
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
          <h2 id="results-heading">{resultsHeading}</h2>
          <SearchResultDisplay searchParameters={{ pattern, eduLevel: ['3'] }} />
        </Col>
      </Row>
    </main>
  )
}

export default observer(CourseSearch)
