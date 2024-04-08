import React from 'react'
import { Col, Row } from 'reactstrap'
import { PageHeading } from '@kth/kth-reactstrap/dist/components/studinfo'

import Article from '../components/Article'
import FooterContent from '../components/FooterContent'

import { useStore } from '../mobx'
import translate from '../../../../domain/translate'

function NotFound() {
  const { language } = useStore()
  const t = translate(language)
  return (
    <>
      <Row>
        <Col>
          <PageHeading>{t('main_page_not_found_page_header')}</PageHeading>
        </Col>
      </Row>
      <Row>
        <Col>
          <Article>
            <p>{t('main_page_not_found_page_paragraph')}</p>
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

export default NotFound
