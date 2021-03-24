import React from 'react'
import { Col, Row } from 'reactstrap'
import { PageHeading, Heading } from '@kth/kth-reactstrap/dist/components/studinfo'

import Lead from '../components/Lead'

import { useStore } from '../mobx'
import i18n from '../../../../i18n'
import translate from '../util/translate'

function Article({ children }) {
  return <article className="article paragraphs">{children}</article>
}

function Footer({ children }) {
  return (
    <footer id="articleFooter" className="border-top mt-4 pt-1">
      {children}
    </footer>
  )
}

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
          <Heading size="h2" text={t('main_page_article_header_example')} />
          <Article>
            <p>{t('main_page_article_first_paragraph_example')}</p>
            <p>{t('main_page_article_second_paragraph_example')}</p>
          </Article>
        </Col>
      </Row>
      <Row>
        <Col>
          <Footer>
            <address>{t('main_page_footer_example')}</address>
          </Footer>
        </Col>
      </Row>
    </>
  )
}

export default Example
