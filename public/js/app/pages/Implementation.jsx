/* eslint-disable react/no-danger */
import React, { Fragment } from 'react'
import { Col, Row } from 'reactstrap'
import { Heading, PageHeading } from '@kth/kth-reactstrap/dist/components/studinfo'

import { useStore } from '../mobx'

import translate from '../../../../domain/translate'
import { formatLongTerm } from '../../../../domain/term'

import Article from '../components/Article'
import FooterContent from '../components/FooterContent'
import LadokData from '../components/LadokData'
import Sidebar from '../components/Sidebar'

function ImplementationStructure() {
  const { language, studyProgramme } = useStore()
  const t = translate(language)
  const { utbildningensupplagg: structure } = studyProgramme
  return structure ? (
    <>
      <Heading size="h2" text={t('programme_structure')} />
      <LadokData html={structure} />
    </>
  ) : null
}

function ImplementationCourses() {
  const { language, studyProgramme } = useStore()
  const t = translate(language)
  const { kurser: courseRules } = studyProgramme
  return (
    <>
      <Heading size="h2" text={t('courses')} />
      <LadokData html={courseRules} />
    </>
  )
}

function ImplementationGradingSystem() {
  const { language, studyProgramme } = useStore()
  const t = translate(language)
  const { betygssystem: gradingSystem } = studyProgramme
  return (
    <>
      <Heading size="h2" text={t('programme_grading_system')} />
      <LadokData html={gradingSystem} />
    </>
  )
}

function ImplementationParticipation() {
  const { language, studyProgramme } = useStore()
  const t = translate(language)
  const { villkorForDeltagande: participation } = studyProgramme
  return (
    <>
      <Heading size="h2" text={t('programme_participation')} />
      <LadokData html={participation} />
    </>
  )
}

function ImplementationPreviousStudies() {
  const { language, studyProgramme } = useStore()
  const t = translate(language)
  const { tillgodoraknande: previousStudies } = studyProgramme
  return previousStudies ? (
    <>
      <Heading size="h2" text={t('programme_previous_studies')} />
      <LadokData html={previousStudies} />
    </>
  ) : null
}

function ImplementationStudiesAbroad() {
  const { language, studyProgramme } = useStore()
  const t = translate(language)
  const { utlandsstudier: studiesAbroad } = studyProgramme
  return studiesAbroad ? (
    <>
      <Heading size="h2" text={t('programme_studies_abroad')} />
      <LadokData html={studiesAbroad} />
    </>
  ) : null
}

function ImplementationDegreeProject() {
  const { language, studyProgramme } = useStore()
  const t = translate(language)
  const { examensarbete: degreeProject } = studyProgramme
  return degreeProject ? (
    <>
      <Heading size="h2" text={t('programme_degree_project')} />
      <LadokData html={degreeProject} />
    </>
  ) : null
}

function ImplementationDegree() {
  const { language, studyProgramme } = useStore()
  const t = translate(language)
  const { examen: degree } = studyProgramme
  return degree ? (
    <>
      <Heading size="h2" text={t('programme_degree')} />
      <LadokData html={degree} />
    </>
  ) : null
}

export function ArticleContent() {
  return (
    <Article>
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
          <Article>
            <div className="page-break-inside">
              <ImplementationStructure />
            </div>
            <div className="page-break-inside">
              <ImplementationCourses />
            </div>
            <div className="page-break-inside">
              <ImplementationGradingSystem />
            </div>
            <div className="page-break-inside">
              <ImplementationParticipation />
            </div>
            <div className="page-break-inside">
              <ImplementationPreviousStudies />
            </div>
            <div className="page-break-inside">
              <ImplementationStudiesAbroad />
            </div>
            <div className="page-break-inside">
              <ImplementationDegreeProject />
            </div>
            <div className="page-break-inside">
              <ImplementationDegree />
            </div>
            <div className="page-break-inside">
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
