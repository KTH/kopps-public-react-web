/* eslint-disable react/no-danger */
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'reactstrap'
import { Link, PageHeading } from '@kth/kth-reactstrap/dist/components/studinfo'

import { useStore } from '../mobx'

import translate from '../../../../domain/translate'
import { programSyllabusLink } from '../util/links'
import { formatLongTerm } from '../../../../domain/term'
import { ELECTIVE_CONDITIONS } from '../../../../domain/curriculum'

import Article from '../components/Article'
import FooterContent from '../components/FooterContent'
import KoppsData from '../components/KoppsData'

// TODO: Duplicated, move to domain functions
function formatCredits(language, credits) {
  const creditsStr = typeof credits === 'number' ? credits.toString() : credits
  if (language === 'sv') {
    return creditsStr.includes('.') ? creditsStr.replace('.', ',') : `${creditsStr},0`
  }
  return creditsStr.includes('.') ? creditsStr : `${creditsStr}.0`
}
function CourseListTableRow({ course }) {
  const { language } = useStore()
  const t = translate(language)
  const { code, name, comment, credits, creditAbbr, level } = course
  const languageParam = language === 'en' ? '?l=en' : ''
  const courseLink = `https://www.kth.se/student/kurser/kurs/${code}${languageParam}`
  return (
    <tr>
      <td className="code">
        <a href={courseLink}>{code}</a>
      </td>
      <td className="name">
        <a href={courseLink}>{name}</a>
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
  comment: PropTypes.string.isRequired,
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
          <th scope="col">{t('programme_list_code')}</th>
          <th scope="col">{t('programme_list_name')}</th>
          <th scope="col">{t('programme_list_credits')}</th>
          <th scope="col">{t('programme_list_edulevel')}</th>
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

function ElectiveCondition({ studyYear, electiveCondition, code }) {
  const { language, studyYearCourses, creditUnitAbbr } = useStore()
  const t = translate(language)
  if (!studyYearCourses[code] || !studyYearCourses[code][studyYear]) return null
  const electiveConditionCourses = studyYearCourses[code][studyYear]
  if (!electiveConditionCourses[electiveCondition]) return null
  const credits = electiveConditionCourses[electiveCondition].reduce(
    (accCredits, course) => accCredits + course.credits,
    0
  )

  const formattedCredits = ` (${formatCredits(language, credits)} ${creditUnitAbbr})`
  const heading = `${t('elective_condition')[electiveCondition]} ${t('curriculums_courses')}${
    electiveCondition === 'O' ? formattedCredits : ''
  }`
  return (
    <Fragment key={electiveCondition}>
      <h4>{heading}</h4>
      <CourseListTable courses={electiveConditionCourses[electiveCondition]} />
    </Fragment>
  )
}

ElectiveCondition.propTypes = {
  studyYear: PropTypes.number.isRequired,
  electiveCondition: PropTypes.string.isRequired,
  code: PropTypes.string.isRequired,
}

function SupplementaryInfo({ studyYear, code }) {
  const { language, supplementaryInfo } = useStore()
  const t = translate(language)
  return supplementaryInfo[code] && supplementaryInfo[code][studyYear] ? (
    <>
      <h4>{t('programme_supplementary_information')}</h4>
      <KoppsData html={supplementaryInfo[code][studyYear]} />
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

function StudyYear({ studyYear, code }) {
  const { language } = useStore()
  const t = translate(language)

  const studyYearHeader = `${t('programme_year')} ${studyYear}`
  return (
    <Fragment key={studyYear}>
      <h3>{studyYearHeader}</h3>
      {ELECTIVE_CONDITIONS.map(electiveCondition => (
        <ElectiveCondition
          key={electiveCondition}
          studyYear={studyYear}
          electiveCondition={electiveCondition}
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
}

function CommonCourses() {
  // TODO: Only get study years for common courses
  const { language, studyYears } = useStore()
  const t = translate(language)
  return studyYears.length ? (
    <>
      <h2>{t('curriculums_common_courses')}</h2>
      {studyYears.map(studyYear => (
        <StudyYear key={studyYear} studyYear={studyYear} code="Common" />
      ))}
    </>
  ) : null
}

function Specialisations() {
  // TODO: Only get study years for specialisations
  const { specializations } = useStore()
  // TODO: Retrieve proper specialisations
  return (
    <>
      {specializations.map(({ code, title, studyYears }) => (
        <Fragment key={code}>
          <h2>{`${title} (${code})`}</h2>
          {studyYears.map(studyYear => (
            <StudyYear key={studyYear} studyYear={studyYear} code={code} />
          ))}
        </Fragment>
      ))}
    </>
  )
}

function ArticleContent() {
  return (
    <Article classNames={['paragraphs']}>
      <CommonCourses />
      <Specialisations />
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
