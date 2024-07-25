import React from 'react'

import { Col, Row } from 'reactstrap'
import { PageHeading } from '@kth/kth-reactstrap/dist/components/studinfo'

import { useStore } from '../mobx'
import i18n from '../../../../i18n'
import { Lead } from '../components'

const NewSearchPage = () => {
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
  return (
    <>
      <Row>
        <Col>
          <PageHeading>{searchHeading}</PageHeading>
          <h4>TODO: Här kommer resultat senare</h4>
        </Col>
      </Row>
    </>
  )
}

export default NewSearchPage
