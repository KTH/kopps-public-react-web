import React, { Fragment } from 'react'
import { Col, Row } from 'reactstrap'
import { PageHeading } from '@kth/kth-reactstrap/dist/components/studinfo'

import Article from '../components/Article'
import FooterContent from '../components/FooterContent'

import { useStore } from '../mobx'

function Curriculum() {
  const { programmeCode, programmeName, term, studyYear } = useStore()

  return (
    <>
      <Row>
        <Col>
          <PageHeading subHeading={`${term}, ${programmeName} (${programmeCode})`}>{studyYear}</PageHeading>
        </Col>
      </Row>
      <Row>
        <Col>
          <Article>
            <div />
          </Article>
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

export default Curriculum
