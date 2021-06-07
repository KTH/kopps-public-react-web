/* eslint-disable react/no-danger */
import React, { Fragment } from 'react'
import { Col, Row } from 'reactstrap'
import { Heading, Link, PageHeading } from '@kth/kth-reactstrap/dist/components/studinfo'

import { useStore } from '../mobx'

import translate from '../../../../domain/translate'
import { formatLongTerm } from '../../../../domain/term'
import { formatISODate } from '../../../../domain/date'
import { programSyllabusLink } from '../util/links'

import Article from '../components/Article'
import FooterContent from '../components/FooterContent'
import KoppsData from '../components/KoppsData'

function ExtentDates() {
  const { language, studyProgramme } = useStore()
  const t = translate(language)
  const { approvedAt, changedAt } = studyProgramme
  return (
    <p>
      {`${t('programme_objectives_changed')}: ${formatISODate(changedAt, language)}`}
      <br />
      {`${t('programme_objectives_approved')}: ${formatISODate(approvedAt, language)}`}
      <br />
    </p>
  )
}

function ExtentContent() {
  const { studyProgramme } = useStore()
  const { extent } = studyProgramme
  return <KoppsData html={extent} />
}

function ArticleContent() {
  return (
    <Article classNames={['paragraphs']}>
      <ExtentDates />
      <ExtentContent />
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

function Extent() {
  const { language, programmeName, programmeCode, term } = useStore()
  const t = translate(language)
  const pageHeading = t('programme_extent_and_content')
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

export default Extent
