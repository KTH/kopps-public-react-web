import React from 'react'
import { Col, Row } from 'reactstrap'
import { PageHeading, Heading } from '@kth/kth-reactstrap/dist/components/studinfo'

import Lead from '../components/Lead'
import Article from '../components/Article'

import FooterContent from '../components/FooterContent'

import { useStore } from '../mobx'
import i18n from '../../../../i18n'
import translate from '../util/translate'

function StudyHandbook() {
  const { languageIndex } = useStore()
  const { pageHeading, content } = i18n.messages[languageIndex].shb

  return (
    <>
      <Row>
        <Col>
          <PageHeading>{pageHeading}</PageHeading>
        </Col>
      </Row>
      <Row>
        <Col>
          <Article>
            <p>{content}</p>
            <p>
              <a href="https://intra.kth.se/utbildning/utbildningsadministr/kopps/shb">{pageHeading}</a>
            </p>
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

export default StudyHandbook
