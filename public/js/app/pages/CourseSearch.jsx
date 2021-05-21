import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { Col, Row } from 'reactstrap'
import { CollapseDetails } from '@kth/kth-kip-style-react-components'
import { useStore } from '../mobx'
import i18n from '../../../../i18n'
import { PageHeading, Heading } from '@kth/kth-reactstrap/dist/components/studinfo'
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

const CourseSearch = () => {
  const { language: lang, languageIndex } = useStore()
  const { bigSearch, searchInstructions } = i18n.messages[languageIndex]
  const { searchHeading, leadIntro } = bigSearch
  const { search_help_collapse_header: collapseHeader, search_help_10: lastInstruction } = searchInstructions

  const [params, setParams] = useState({})
  console.log('top params', params)
  const helptexts = getHelpText(languageIndex)

  function handleSubmit(params) {
    // clean params
    setParams(params)
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

export default observer(CourseSearch)
