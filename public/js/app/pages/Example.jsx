import React from 'react'
import { Col, Row } from 'reactstrap'
import { PageHeading, Heading } from '@kth/kth-reactstrap/dist/components/studinfo'

import Lead from '../components/Lead'
import Article from '../components/Article'
import FooterContent from '../components/FooterContent'

import { useStore } from '../mobx'
import i18n from '../../../../i18n'
import translate from '../util/translate'

function Example() {
  const { language } = useStore()
  const t = translate(i18n, language)
  return (
    <>
      <Row>
        <Col>
          <PageHeading>{t('main_page_header_example')}</PageHeading>
          <Lead text={t('main_page_article_lead_example')} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Article>
            <Heading size="h2" text={t('main_page_article_header_example')} />
            <p>{t('main_page_article_first_paragraph_example')}</p>
            <p>{t('main_page_article_second_paragraph_example')}</p>
          </Article>
        </Col>
      </Row>
      <Row>
        <Col>
          {/** Use FooterContent, or roll your own with Footer component */}
          <FooterContent />
        </Col>
      </Row>
    </>
  )
}

export default Example
