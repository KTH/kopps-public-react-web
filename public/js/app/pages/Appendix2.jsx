/* eslint-disable react/no-danger */
import React, { Fragment } from 'react'
import { Col, Row } from 'reactstrap'
import { PageHeading } from '@kth/kth-reactstrap/dist/components/studinfo'

import { useStore } from '../mobx'

import translate from '../../../../domain/translate'
import { formatLongTerm } from '../../../../domain/term'

import Article from '../components/Article'
import FooterContent from '../components/FooterContent'
import KoppsData from '../components/KoppsData'
import Sidebar from '../components/Sidebar'

function Specializations() {
  const { language, specializations } = useStore()
  const t = translate(language)

  if (!specializations.length) return <p>{t('programme_appendix2_empty')}</p>

  return specializations.map(({ code, title, description }) => {
    const heading = `${title} (${code})`
    return (
      <div key={`div-${heading}`}>
        <h2 key={heading}>{heading}</h2>
        {description ? (
          <KoppsData key={`kopps-data-${heading}`} html={description} />
        ) : (
          <p key="empty" className="font-italic">
            {t('programme_appendix2_empty_description')}
          </p>
        )}
      </div>
    )
  })
}

export function Appendix2PDFExport() {
  return (
    <>
      <Row key="data-area-row">
        <Col key="article-specializations">
          <Article uiKey="article" classNames={['paragraphs', 'utbildningsplan']}>
            <Specializations key="specializations-appendix-2" />
          </Article>
        </Col>
      </Row>
    </>
  )
}

function Appendix2() {
  const { language, programmeName, programmeCode, term } = useStore()
  const t = translate(language)
  const pageHeading = t('programme_appendix2')
  const subHeading = `${t('programme_admitted_year')} ${formatLongTerm(
    term,
    language
  )}, ${programmeName} (${programmeCode})`

  return (
    <>
      <Row key="page-heading-row-appendix-2">
        <Col>
          <PageHeading subHeading={subHeading}>{pageHeading}</PageHeading>
        </Col>
      </Row>
      <Row key="data-area-row">
        <Col key="article-specializations">
          <Article uiKey="article" classNames={['paragraphs', 'utbildningsplan']}>
            <Specializations key="specializations-appendix-2" />
          </Article>
        </Col>
        <Col key="sidebar" xs="12" xl="3">
          <Sidebar />
        </Col>
      </Row>
      <Row key="footer-row">
        <Col>
          <FooterContent />
        </Col>
      </Row>
    </>
  )
}

export default Appendix2
