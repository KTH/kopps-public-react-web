/* eslint-disable react/no-danger */
import React, { Fragment } from 'react'
import { Col, Row } from 'reactstrap'
import { PageHeading } from '@kth/kth-reactstrap/dist/components/studinfo'

import { useStore } from '../mobx'

import translate from '../../../../domain/translate'
import { formatLongTerm } from '../../../../domain/term'
import { formatISODate } from '../../../../domain/date'

import Article from '../components/Article'
import FooterContent from '../components/FooterContent'
import KoppsData from '../components/KoppsData'
import Sidebar from '../components/Sidebar'

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

export function ExtentContentForPDF() {
  const { language } = useStore()
  const t = translate(language)
  const pageHeading = t('programme_extent_and_content')
  return (
    <>
      <Row>
        <Col>
          <PageHeading>{pageHeading}</PageHeading>
        </Col>
      </Row>
      <Row>
        <Col>
          <Article classNames={['paragraphs']}>
            <ExtentContent />
          </Article>
        </Col>
      </Row>
    </>
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
