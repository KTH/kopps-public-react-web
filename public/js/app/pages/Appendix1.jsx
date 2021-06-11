/* eslint-disable react/no-danger */
import React, { Fragment } from 'react'
import { Col, Row } from 'reactstrap'
import { Heading, Link, PageHeading } from '@kth/kth-reactstrap/dist/components/studinfo'

import { useStore } from '../mobx'

import translate from '../../../../domain/translate'
import { formatLongTerm } from '../../../../domain/term'
import { programSyllabusLink } from '../util/links'

import Article from '../components/Article'
import FooterContent from '../components/FooterContent'

function ArticleContent() {
  return <Article classNames={['paragraphs']} />
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

function Appendix1() {
  const { language, programmeName, programmeCode, term } = useStore()
  const t = translate(language)
  const pageHeading = t('programme_appendix1')
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

export default Appendix1
