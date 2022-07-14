/* eslint-disable react/no-danger */
import React, { Fragment } from 'react'
import { Col, Row } from 'reactstrap'
import { Heading, Link, PageHeading } from '@kth/kth-reactstrap/dist/components/studinfo'

import { useStore } from '../mobx'

import translate from '../../../../domain/translate'
import { formatLongTerm } from '../../../../domain/term'
import { formatISODate } from '../../../../domain/date'
import { appendix1Link } from '../util/links'

import Article from '../components/Article'
import FooterContent from '../components/FooterContent'
import KoppsData from '../components/KoppsData'
import Sidebar from '../components/Sidebar'

function ImplementationDates() {
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

function ImplementationStructure() {
  const { language, studyProgramme } = useStore()
  const t = translate(language)
  const { structure } = studyProgramme
  return structure ? (
    <>
      <Heading size="h2" text={t('programme_structure')} />
      <KoppsData html={structure} />
    </>
  ) : null
}

function ImplementationCourses() {
  const { language, studyProgramme, programmeCode, term } = useStore()
  const t = translate(language)
  const { courseRules } = studyProgramme
  return (
    <>
      <Heading size="h2" text={t('courses')} />
      <p>
        {`${t('programme_implementation_courses_intro')} `}
        <Link href={appendix1Link(programmeCode, term)}>{t('programme_appendix1')}</Link>
      </p>
      <KoppsData html={courseRules} />
    </>
  )
}

function ImplementationGradingSystem() {
  const { language, studyProgramme } = useStore()
  const t = translate(language)
  const { gradingSystem } = studyProgramme
  return (
    <>
      <Heading size="h2" text={t('programme_grading_system')} />
      <p>{`${t('programme_grading_system_intro')} `}</p>
      <KoppsData html={gradingSystem} />
    </>
  )
}

function ImplementationParticipation() {
  const { language, studyProgramme } = useStore()
  const t = translate(language)
  const { participation } = studyProgramme
  return (
    <>
      <Heading size="h2" text={t('programme_participation')} />
      <KoppsData html={participation} />
    </>
  )
}

function ImplementationPreviousStudies() {
  const { language, studyProgramme } = useStore()
  const t = translate(language)
  const { previousStudies } = studyProgramme
  return previousStudies ? (
    <>
      <Heading size="h2" text={t('programme_previous_studies')} />
      <KoppsData html={previousStudies} />
    </>
  ) : null
}

function ImplementationStudiesAbroad() {
  const { language, studyProgramme } = useStore()
  const t = translate(language)
  const { studiesAbroad } = studyProgramme
  return studiesAbroad ? (
    <>
      <Heading size="h2" text={t('programme_studies_abroad')} />
      <KoppsData html={studiesAbroad} />
    </>
  ) : null
}

function ImplementationDegreeProject() {
  const { language, studyProgramme } = useStore()
  const t = translate(language)
  const { degreeProject } = studyProgramme
  return degreeProject ? (
    <>
      <Heading size="h2" text={t('programme_degree_project')} />
      <KoppsData html={degreeProject} />
    </>
  ) : null
}

function ImplementationDegree() {
  const { language, studyProgramme } = useStore()
  const t = translate(language)
  const { degree } = studyProgramme
  return degree ? (
    <>
      <Heading size="h2" text={t('programme_degree')} />
      <KoppsData html={degree} />
    </>
  ) : null
}

export function ArticleContent() {
  return (
    <Article classNames={['paragraphs']}>
      <ImplementationDates />
      <ImplementationStructure />
      <ImplementationCourses />
      <ImplementationGradingSystem />
      <ImplementationParticipation />
      <ImplementationPreviousStudies />
      <ImplementationStudiesAbroad />
      <ImplementationDegreeProject />
      <ImplementationDegree />
    </Article>
  )
}

export function ImplementationContentForPDF() {
  const { language } = useStore()
  const t = translate(language)
  const pageHeading = t('programme_implementation')
  const appendix1 = t('programme_appendix1')
  const appendix2 = t('programme_appendix2')
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
            <div className="implementation-container">
              <ImplementationStructure />
            </div>
            <div className="implementation-container">
              <ImplementationCourses />
            </div>
            <div className="implementation-container">
              <ImplementationGradingSystem />
            </div>
            <div className="implementation-container">
              <ImplementationParticipation />
            </div>
            <div className="implementation-container">
              <ImplementationPreviousStudies />
            </div>
            <div className="implementation-container">
              <ImplementationStudiesAbroad />
            </div>
            <div className="implementation-container">
              <ImplementationDegreeProject />
            </div>
            <div className="implementation-container">
              <ImplementationDegree />
            </div>
            <div className="implementation-container">
              {appendix1}
              <br />
              <br />
              {appendix2}
            </div>
          </Article>
        </Col>
      </Row>
    </>
  )
}

function Implementation() {
  const { language, programmeName, programmeCode, term } = useStore()
  const t = translate(language)
  const pageHeading = t('programme_implementation')
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

export default Implementation
