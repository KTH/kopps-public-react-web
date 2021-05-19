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
import { getHelpText } from '../../../../domain/searchParams'

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
