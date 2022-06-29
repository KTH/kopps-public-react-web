/* eslint-disable react/no-danger */
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'reactstrap'
import { PageHeading } from '@kth/kth-reactstrap/dist/components/studinfo'

import { useStore } from '../mobx'

import translate from '../../../../domain/translate'
import { formatCredits } from '../../../../domain/credits'
import { formatLongTerm } from '../../../../domain/term'
import { ELECTIVE_CONDITIONS } from '../../../../domain/curriculum'

import Article from '../components/Article'
import FooterContent from '../components/FooterContent'
import KoppsData from '../components/KoppsData'
import Sidebar from '../components/Sidebar'

import { courseLink } from '../util/links'

function CourseListTableRow({ course }) {
  const { language } = useStore()
  const t = translate(language)
  const { code, name, comment, credits, creditAbbr, level } = course

  const courselink = courseLink(code, language)
  return (
    <tr>
      <td className="code">
        <a href={courselink}>{code}</a>
      </td>
      <td className="name">
        <a href={courselink}>{name}</a>
        {comment && <b className="course-comment">{comment}</b>}
      </td>
      <td className="credits">{`${formatCredits(language, credits)} ${creditAbbr}`}</td>
      <td className="level">{`${t('programme_edulevel')[level]}`}</td>
    </tr>
  )
}

const courseType = PropTypes.shape({
  code: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  comment: PropTypes.oneOfType([PropTypes.string, undefined]).isRequired,
  credits: PropTypes.number.isRequired,
  creditAbbr: PropTypes.string.isRequired,
  level: PropTypes.string.isRequired,
})

CourseListTableRow.propTypes = {
  course: courseType.isRequired,
}

function CourseListTable({ courses }) {
  const { language } = useStore()
  const t = translate(language)
  return Array.isArray(courses) && courses.length ? (
    <table className="table courseList">
      <thead>
        <tr>
          <th key="programme_list_code" scope="col">
            {t('course_code')}
          </th>
          <th key="programme_list_name" scope="col">
            {t('course_name')}
          </th>
          <th key="programme_list_credits" scope="col">
            {t('course_credits')}
          </th>
          <th key="programme_list_edulevel" scope="col">
            {t('course_educational_level_abbr')}
          </th>
        </tr>
      </thead>
      <tbody>
        {courses.map(course => (
          <CourseListTableRow key={course.code} course={course} />
        ))}
      </tbody>
    </table>
  ) : null
}

CourseListTable.propTypes = {
  courses: PropTypes.arrayOf(courseType),
}

CourseListTable.defaultProps = {
  courses: [],
}

function ElectiveCondition({ studyYear, electiveCondition, code, isExport }) {
  const { language, studyYearCourses, creditUnitAbbr } = useStore()
  const t = translate(language)
  if (!studyYearCourses[code] || !studyYearCourses[code][studyYear]) return null
  const electiveConditionCourses = studyYearCourses[code][studyYear]
  if (!electiveConditionCourses[electiveCondition]) return null
  const credits = electiveConditionCourses[electiveCondition].reduce(
    (accCredits, course) => accCredits + course.credits,
    0
  )

  const formattedCredits = ` (${formatCredits(language, credits)} ${isExport ? t('creditUnitAbbr') : creditUnitAbbr})`
  const heading = `${t('elective_condition')[electiveCondition]} ${t('courses').toLowerCase()}${
    electiveCondition === 'O' ? formattedCredits : ''
  }`
  return (
    <Fragment key={electiveCondition}>
      <div className="elective-container">
        <h4>{heading}</h4>
        <CourseListTable courses={electiveConditionCourses[electiveCondition]} />
      </div>
    </Fragment>
  )
}

ElectiveCondition.propTypes = {
  studyYear: PropTypes.number.isRequired,
  electiveCondition: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
  isExport: PropTypes.boolean,
}

function SupplementaryInfo({ studyYear, code }) {
  const { language, supplementaryInfo } = useStore()
  const t = translate(language)
  return supplementaryInfo[code] && supplementaryInfo[code][studyYear] ? (
    <>
      <div className="supplementary-container">
        <h4>{t('programme_supplementary_information')}</h4>
        <KoppsData html={supplementaryInfo[code][studyYear]} />
      </div>
    </>
  ) : null
}

SupplementaryInfo.propTypes = {
  studyYear: PropTypes.number.isRequired,
  code: PropTypes.string.isRequired,
}

function ConditionallyElectiveCoursesInfo({ studyYear, code }) {
  const { language, conditionallyElectiveCoursesInfo } = useStore()
  const t = translate(language)
  return conditionallyElectiveCoursesInfo[code] && conditionallyElectiveCoursesInfo[code][studyYear] ? (
    <>
      <h4>{t('programme_conditionally_elective_courses_info')}</h4>
      <KoppsData html={conditionallyElectiveCoursesInfo[code][studyYear]} />
    </>
  ) : null
}

ConditionallyElectiveCoursesInfo.propTypes = {
  studyYear: PropTypes.number.isRequired,
  code: PropTypes.string.isRequired,
}

function StudyYear({ studyYear, code, isExport }) {
  const { language } = useStore()
  const t = translate(language)

  const studyYearHeader = `${t('study_year')} ${studyYear}`
  return (
    <Fragment key={studyYear}>
      <h3>{studyYearHeader}</h3>
      {ELECTIVE_CONDITIONS.map(electiveCondition => (
        <ElectiveCondition
          key={electiveCondition}
          studyYear={studyYear}
          electiveCondition={electiveCondition}
          isExport={isExport}
          code={code}
        />
      ))}
      <SupplementaryInfo studyYear={studyYear} code={code} />
      <ConditionallyElectiveCoursesInfo studyYear={studyYear} code={code} />
    </Fragment>
  )
}

StudyYear.propTypes = {
  studyYear: PropTypes.number.isRequired,
  code: PropTypes.string.isRequired,
  isExport: PropTypes.boolean,
}

function CommonCourses({ isExport }) {
  // TODO: Only get study years for common courses
  const { language, studyYears } = useStore()
  const t = translate(language)
  return studyYears.length ? (
    <>
      <h2>{t('curriculums_common_courses')}</h2>
      {studyYears.map(studyYear => (
        <StudyYear key={studyYear} studyYear={studyYear} code="Common" isExport={isExport} />
      ))}
    </>
  ) : null
}

CommonCourses.propTypes = {
  isExport: PropTypes.boolean,
}

function Specialisations({ isExport }) {
  // TODO: Only get study years for specialisations
  const { specializations } = useStore()
  // TODO: Retrieve proper specialisations
  return (
    <>
      {specializations.map(({ code, title, studyYears }) => (
        <Fragment key={code}>
          <h2>{`${title} (${code})`}</h2>
          {studyYears.map(studyYear => (
            <StudyYear key={studyYear} studyYear={studyYear} code={code} isExport={isExport} />
          ))}
        </Fragment>
      ))}
    </>
  )
}

Specialisations.propTypes = {
  isExport: PropTypes.boolean,
}

export function Appendix1PDFExport() {
  return (
    <>
      <Row>
        <Col>
          <Article classNames={['paragraphs']}>
            <CommonCourses isExport={true} />
            <Specialisations isExport={true} />
          </Article>
        </Col>
      </Row>
    </>
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
          <Article classNames={['paragraphs']}>
            <CommonCourses />
            <Specialisations />
          </Article>
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
