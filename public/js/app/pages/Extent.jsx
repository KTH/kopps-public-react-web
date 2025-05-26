/* eslint-disable react/no-danger */
import React, { Fragment } from 'react'
import { Col, Row } from 'reactstrap'
import { PageHeading } from '@kth/kth-reactstrap/dist/components/studinfo'

import { useStore } from '../mobx'

import translate from '../../../../domain/translate'
import { formatLongTerm } from '../../../../domain/term'

import Article from '../components/Article'
import FooterContent from '../components/FooterContent'
import LadokData from '../components/LadokData'
import Sidebar from '../components/Sidebar'

function ExtentContent() {
  const { studyProgramme } = useStore()
  const { utbildningensOmfattningOchInnehall: extent } = studyProgramme
  return <LadokData html={extent} />
}

function ArticleContent() {
  return (
    <Article>
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
          <Article>
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
