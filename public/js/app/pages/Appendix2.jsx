/* eslint-disable react/no-danger */
import React, { Fragment } from 'react'
import { Col, Row } from 'reactstrap'
import { Link, PageHeading } from '@kth/kth-reactstrap/dist/components/studinfo'

import { useStore } from '../mobx'

import translate from '../../../../domain/translate'
import { programSyllabusLink } from '../util/links'
import { formatLongTerm } from '../../../../domain/term'

import Article from '../components/Article'
import FooterContent from '../components/FooterContent'
import KoppsData from '../components/KoppsData'

function Specializations() {
  const { language, specializations } = useStore()
  const t = translate(language)

  return specializations.length ? (
    specializations.map(({ code, title, description }) => {
      const heading = `${title} (${code})`
      return (
        <>
          <h2>{heading}</h2>
          {description ? (
            <KoppsData html={description} />
          ) : (
            <p className="font-italic">{t('programme_appendix2_empty_description')}</p>
          )}
        </>
      )
    })
  ) : (
    <p>{t('programme_appendix2_empty')}</p>
  )
}

function ArticleContent() {
  return (
    <Article classNames={['paragraphs', 'utbildningsplan']}>
      <Specializations />
    </Article>
  )
}

function Sidebar() {
  const { language, programmeCode, term } = useStore()
  const t = translate(language)
  const syllabusLink = programSyllabusLink(programmeCode, term, language)

  return (
    <div id="sidebarContainer">
      <aside id="pdfSidebar" className="sidebar" aria-labelledby="pdf-sidebar-heading">
        <h2 id="pdf-sidebar-heading" className="sidebar-heading mb-2 mt-0">
          {t('programme_plan_pdf_header')}
        </h2>
        <p>{t('programme_plan_pdf_text')}</p>
        <Link href={syllabusLink} type="pdf-post-link">
          {t('programme_plan_pdf')(programmeCode, formatLongTerm(term, language))}
        </Link>
      </aside>
    </div>
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
      <Row>
        <Col>
          <PageHeading subHeading={subHeading}>{pageHeading}</PageHeading>
        </Col>
      </Row>
      <Row>
        <Col>
          <ArticleContent />
        </Col>
        <Col xs="12" xl="3">
          <Sidebar />
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

export default Appendix2
