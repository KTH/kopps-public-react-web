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

function EligibilityContent() {
  const { studyProgramme } = useStore()
  const { behorighetOchUrval: eligibility } = studyProgramme
  return <LadokData html={eligibility} />
}

function ArticleContent() {
  return (
    <Article>
      <EligibilityContent />
    </Article>
  )
}

export function EligilbiltyContentForPDF() {
  const { language } = useStore()
  const t = translate(language)
  const pageHeading = t('programme_eligibility_and_selection')
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
            <EligibilityContent />
          </Article>
        </Col>
      </Row>
    </>
  )
}

function Eligibility() {
  const { language, programmeName, programmeCode, term } = useStore()
  const t = translate(language)
  const pageHeading = t('programme_eligibility_and_selection')
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

export default Eligibility
