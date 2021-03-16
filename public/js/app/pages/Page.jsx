import React from 'react'
import { useParams } from 'react-router-dom'
import { Col, Row } from 'reactstrap'

import { useStore } from '../mobx'

const Page = () => {
  const { language } = useStore()
  const { page: pageName } = useParams()

  return (
    <main id="mainContent">
      <Row>
        <Col>
          <h1>{`Page ${pageName} in language ${language}`}</h1>
        </Col>
      </Row>
    </main>
  )
}

export default Page
