import React from 'react'

import { Col, Row } from 'reactstrap'
import { PageHeading } from '@kth/kth-reactstrap/dist/components/studinfo'

import { useStore } from '../mobx'
import i18n from '../../../../i18n'

const NewSearchPage = () => {
  const {
    languageIndex
  } = useStore()

  const { bigSearch } = i18n.messages[languageIndex]
  const { searchHeading } = bigSearch
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
