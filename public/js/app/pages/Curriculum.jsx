import React, { Fragment } from 'react'
import { Col, Row } from 'reactstrap'
import { PageHeading } from '@kth/kth-reactstrap/dist/components/studinfo'

import Article from '../components/Article'
import FooterContent from '../components/FooterContent'

import { useStore } from '../mobx'

import translate from '../../../../domain/translate'
import { formatLongTerm } from '../../../../domain/term'

function Curriculum() {
  const { programmeCode, programmeName, term, studyYear, language } = useStore()
  const t = translate(language, language)
  const pageHeading = `${t('curriculums_admitted_year_long')} ${studyYear}`
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
          <Article>
            <div />
          </Article>
        </Col>
        <Col xs="12" xl="3">
          <aside>
            <div />
          </aside>
          <aside>
            <div />
          </aside>
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

export default Curriculum
