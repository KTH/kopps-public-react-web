import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { Col, Row } from 'reactstrap'
import { CollapseDetails } from '@kth/kth-kip-style-react-components'
import { useStore } from '../mobx'
import i18n from '../../../../i18n'
import { PageHeading, Heading } from '@kth/kth-reactstrap/dist/components/studinfo'
import Lead from '../components/Lead'
import { SearchInputField, SearchResultDisplay } from '../components/index'

const CourseSearchResearch = props => {
  const { language: lang, languageIndex, textPattern: initialPattern } = useStore()
  const { thirdCycleSearch, searchInstructions } = i18n.messages[languageIndex]
  const { searchHeading, leadIntro, linkToUsualSearch, resultsHeading } = thirdCycleSearch
  const { search_help_collapse_header: collapseHeader } = searchInstructions
  const [pattern, setPattern] = useState(initialPattern)

  const helptexts = [
    'search_help_1',
    'search_help_2',
    'search_help_3',
    'search_help_4',
    'search_help_5',
    'search_help_7',
    'search_help_8',
    'search_help_9',
  ].map(s => searchInstructions[s])

  // useEffect(() => {
  //   const { history } = props
  //   console.log('history', history)
  //   // if (history) {
  //   //   history.push({
  //   //     search: '',
  //   //   })
  //   // }
  // }, [pattern])

  function handleSubmit(pattern) {
    //Todo: mimic as in old kopps-public after submit changes url
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
            </ul>
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
          <a href="/student/kurser/sokkurs">{linkToUsualSearch}</a>
        </Col>
      </Row>
      <Row>
        <Col>
          <h2 id="results-heading">{resultsHeading}</h2>
          <SearchResultDisplay searchParameters={{ pattern, eduLevels: ['3'] }} />
        </Col>
      </Row>
    </main>
  )
}

export default observer(CourseSearchResearch)
