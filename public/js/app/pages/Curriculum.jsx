/* eslint-disable react/no-danger */
import React, { Fragment } from 'react'
import { Col, Row } from 'reactstrap'
import { Heading, PageHeading } from '@kth/kth-reactstrap/dist/components/studinfo'

import Article from '../components/Article'
import FooterContent from '../components/FooterContent'

import { useStore } from '../mobx'

import translate from '../../../../domain/translate'
import { formatLongTerm } from '../../../../domain/term'
import { format as formatAcademicYear } from '../../../../domain/academicYear'

function getArticleContent({ language, owningSchoolCode, isMissingAdmission, studyYear, term }) {
  const t = translate(language)
  const formattedAcademicYear = formatAcademicYear(term)
  return isMissingAdmission ? (
    <>
      <p>{t('curriculums_missing_admission_text')(owningSchoolCode)}</p>
    </>
  ) : (
    <>
      <p>{t('curriculums_studyyear_explanation_1')(studyYear)}</p>
      <p dangerouslySetInnerHTML={{ __html: t('curriculums_studyyear_explanation_2')(formattedAcademicYear) }} />
      <Heading size="h2" text={t('curriculums_common_courses')} />
    </>
  )
}

function Curriculum() {
  const { programmeCode, programmeName, term, studyYear, language, isMissingAdmission, owningSchoolCode } = useStore()
  const t = translate(language)
  const pageHeading = isMissingAdmission
    ? `${t('curriculums_missing_admission')}`
    : `${t('curriculums_admitted_year_long')} ${studyYear}`
  const subHeading = `${t('programme_admitted_year')} ${formatLongTerm(
    term,
    language
  )}, ${programmeName} (${programmeCode})`
  const articleContent = getArticleContent({ language, owningSchoolCode, isMissingAdmission, studyYear, term })

  return (
    <>
      <Row>
        <Col>
          <PageHeading subHeading={subHeading}>{pageHeading}</PageHeading>
        </Col>
      </Row>
      <Row>
        <Col>
          <Article>{articleContent}</Article>
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
