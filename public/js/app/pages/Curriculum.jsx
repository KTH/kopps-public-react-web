/* eslint-disable react/no-danger */
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'reactstrap'
import { CollapseDetails } from '@kth/kth-reactstrap/dist/components/utbildningsinfo'
import { Link, PageHeading } from '@kth/kth-reactstrap/dist/components/studinfo'

import Alert from '../components-shared/Alert'
import Article from '../components/Article'
import FooterContent from '../components/FooterContent'
import KoppsData from '../components/KoppsData'

import { useStore } from '../mobx'

import translate from '../../../../domain/translate'
import { formatCredits } from '../../../../domain/credits'
import { formatLongTerm, getCurrentTerm } from '../../../../domain/term'
import { formatAcademicYear, calculateStartTerm } from '../../../../domain/academicYear'
import { ELECTIVE_CONDITIONS } from '../../../../domain/curriculum'
import { ORDINARY_PERIODS } from '../../../../domain/periods'
import { courseLink, programSyllabusLink, programmeWebLink } from '../util/links'

function CourseTablePeriodCols({ language, creditsPerPeriod, courseCode }) {
  return ORDINARY_PERIODS.map(period => {
    const creditsThisPeriod = creditsPerPeriod.length ? creditsPerPeriod[period] : []
    return Math.abs(creditsThisPeriod) ? (
      <td key={`${courseCode}-${period}`} className="text-right active-period">
        {formatCredits(language, creditsThisPeriod)}
      </td>
    ) : (
      <td key={`${courseCode}-${period}`} />
    )
  })
}

function CourseTableRow({
  courseCode,
  courseNameCellData,
  applicationCodeCellData,
  credits,
  creditUnitAbbr,
  creditsPerPeriod,
}) {
  const { language } = useStore()
  return (
    <tr>
      <td>{courseNameCellData}</td>
      <td className="text-center">{applicationCodeCellData}</td>
      <td className="text-right credits">{`${formatCredits(language, credits)} ${creditUnitAbbr}`}</td>
      <CourseTablePeriodCols language={language} creditsPerPeriod={creditsPerPeriod} courseCode={courseCode} />
    </tr>
  )
}

function CourseTableRows({ participations }) {
  const { language } = useStore()

  return participations.map(participation => {
    const { course, applicationCodes, term, creditsPerPeriod } = participation

    const { courseCode, title, credits, creditUnitAbbr, comment } = course
    const currentTerm = getCurrentTerm()
    const courseNameCellData = (
      <>
        <a href={courseLink(courseCode, language, { term })}>{`${courseCode} ${title}`}</a>
        {comment && <b className="course-comment">{comment}</b>}
      </>
    )
    const applicationCodeCellData = currentTerm <= term ? applicationCodes.join(', ') : ''
    return (
      <CourseTableRow
        key={courseCode}
        courseCode={courseCode}
        courseNameCellData={courseNameCellData}
        applicationCodeCellData={applicationCodeCellData}
        credits={credits}
        creditUnitAbbr={creditUnitAbbr}
        creditsPerPeriod={creditsPerPeriod}
      />
    )
  })
}

function CourseTable({ curriculumInfo, participations, electiveCondition }) {
  const { language } = useStore()
  const t = translate(language)
  const { code } = curriculumInfo
  return (
    <table
      className="table programme-syllabus-year"
      aria-labelledby={`heading-${code || 'common'}-${electiveCondition}`}
    >
      <thead>
        <tr>
          <th scope="col">{t('coursesbyprogramme_labels_course')}</th>
          <th scope="col">
            <abbr title={t('coursesbyprogramme_labels_code')}>{t('coursesbyprogramme_labels_code_abbr')}</abbr>
          </th>
          <th scope="col">
            <abbr title={t('course_scope')}>{t('course_scope_abbr')}</abbr>
          </th>
          {ORDINARY_PERIODS.map(period => (
            <th scope="col" key={`P${period}`}>
              <abbr title={t('coursesbyprogramme_labels_period')(period)}>
                {t('coursesbyprogramme_labels_period_abbr')(period)}
              </abbr>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        <CourseTableRows participations={participations} />
      </tbody>
    </table>
  )
}

function Courses({ curriculumInfo }) {
  const { language } = useStore()
  const t = translate(language)
  const { code, participations: allParticipations } = curriculumInfo
  return (
    <>
      <KoppsData html={curriculumInfo.supplementaryInformation} />
      {ELECTIVE_CONDITIONS.map(electiveCondition => {
        const participations = allParticipations[electiveCondition] || []
        return (
          participations.length !== 0 && (
            <Fragment key={electiveCondition}>
              {/* Information about conditionally elective courses for this study year, only if there are such courses to display */}
              {electiveCondition === 'VV' && (
                <div className="conditionallyElectiveInfo">
                  <KoppsData html={curriculumInfo.conditionallyELectiveCoursesInformation} />
                </div>
              )}
              {code ? (
                <h4 id={`heading-${code}-${electiveCondition}`}>
                  {`${t('elective_condition')[electiveCondition]} ${t('courses').toLowerCase()}`}
                </h4>
              ) : (
                <h3 id={`heading-common-${electiveCondition}`}>
                  {`${t('elective_condition')[electiveCondition]} ${t('courses').toLowerCase()}`}
                </h3>
              )}
              <CourseTable
                curriculumInfo={curriculumInfo}
                participations={participations}
                electiveCondition={electiveCondition}
              />
            </Fragment>
          )
        )
      })}
    </>
  )
}

function SpecializationCourses({ curriculumInfo }) {
  const { language } = useStore()
  const t = translate(language)
  const { code, specializationName } = curriculumInfo
  return (
    <>
      <h3 id={`heading-${code}`}>{`${specializationName} (${code})`}</h3>
      <CollapseDetails color="white" title={t('programme_courses')(code)}>
        <Courses curriculumInfo={curriculumInfo} />
      </CollapseDetails>
    </>
  )
}

function CurriculumInfo() {
  const { language, owningSchoolCode, curriculumInfos } = useStore()
  const t = translate(language)
  return Array.isArray(curriculumInfos) && curriculumInfos.length ? (
    <>
      {curriculumInfos.map(
        info =>
          info.isCommon && (
            <Fragment key="common">
              <h2 id="heading-common">{t('curriculums_common_courses')}</h2>
              <Courses curriculumInfo={info} />
            </Fragment>
          )
      )}
      {curriculumInfos.map(
        info =>
          !info.isCommon && (
            <Fragment key={info.code}>
              {info.isFirstSpec && <h2 id="heading-specialisations">{t('coursesbyprogramme_specialisations')}</h2>}
              <SpecializationCourses curriculumInfo={info} />
            </Fragment>
          )
      )}
    </>
  ) : (
    <Alert header={t('coursesbyprogramme_studyyear_noinfofound_header')}>
      <p>{t('coursesbyprogramme_studyyear_noinfofound')(owningSchoolCode)}</p>
    </Alert>
  )
}

function ArticleContent() {
  const { language, owningSchoolCode, isMissingAdmission, studyYear, term } = useStore()
  const t = translate(language)
  const calculatedStartTerm = calculateStartTerm(term, studyYear)
  const formattedAcademicYear = formatAcademicYear(calculatedStartTerm)
  return isMissingAdmission() ? (
    <Article>
      <p>{t('curriculums_missing_admission_text')(owningSchoolCode)}</p>
    </Article>
  ) : (
    <Article>
      <p>{t('curriculums_studyyear_explanation_1')(studyYear)}</p>
      <p dangerouslySetInnerHTML={{ __html: t('curriculums_studyyear_explanation_2')(formattedAcademicYear) }} />
      <CurriculumInfo />
    </Article>
  )
}

function Sidebar() {
  const { language, programmeCode, term } = useStore()
  const t = translate(language)
  const syllabusLink = programSyllabusLink(programmeCode, term, language)
  const webLink = programmeWebLink(programmeCode, language)

  return (
    <div id="sidebarContainer">
      <aside id="pdfSidebar" className="info-box" aria-labelledby="pdf-sidebar-heading">
        <h2 id="pdf-sidebar-heading">{t('programme_plan_pdf_header')}</h2>
        <p>{t('programme_plan_pdf_text')}</p>
        <Link href={syllabusLink} type="pdf-link" target="_blank">
          {t('programme_plan_pdf')(programmeCode, formatLongTerm(term, language))}
        </Link>
      </aside>
      <aside id="programwebbSidebar" className="info-box" aria-labelledby="programwebb-sidebar-heading">
        <h2 id="programwebb-sidebar-heading">{t('programme_programwebb_heading')}</h2>
        <p>
          {t('programme_programwebb_text')}
          <br />
        </p>
      </aside>
    </div>
  )
}

function Curriculum() {
  const { programmeCode, programmeName, term, studyYear, language, isMissingAdmission } = useStore()
  const t = translate(language)
  const pageHeading = isMissingAdmission() ? `${t('curriculums_missing_admission')}` : `${t('study_year')} ${studyYear}`
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

const curriculumInfo = PropTypes.shape({
  code: PropTypes.string,
  specializationName: PropTypes.string,
  isCommon: PropTypes.bool,
  supplementaryInformation: PropTypes.string,
  conditionallyELectiveCoursesInformation: PropTypes.string,
  // eslint-disable-next-line react/forbid-prop-types
  participations: PropTypes.object,
  isFirstSpec: PropTypes.bool,
  hasInfo: PropTypes.bool,
})

Courses.propTypes = {
  curriculumInfo: curriculumInfo.isRequired,
}

SpecializationCourses.propTypes = {
  curriculumInfo: curriculumInfo.isRequired,
}

CourseTableRow.propTypes = {
  courseCode: PropTypes.string.isRequired,
  courseNameCellData: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
  applicationCodeCellData: PropTypes.string.isRequired,
  credits: PropTypes.number.isRequired,
  creditUnitAbbr: PropTypes.string.isRequired,
  creditsPerPeriod: PropTypes.arrayOf(PropTypes.number).isRequired,
}

CourseTable.propTypes = {
  curriculumInfo: curriculumInfo.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  participations: PropTypes.arrayOf(PropTypes.object).isRequired,
  electiveCondition: PropTypes.string.isRequired,
}

export default Curriculum
