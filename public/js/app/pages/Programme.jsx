import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'reactstrap'
import { Link, LinkList, PageHeading } from '@kth/kth-reactstrap/dist/components/studinfo'

import Article from '../components/Article'
import FooterContent from '../components/FooterContent'

import { useStore } from '../mobx'
import translate from '../../../../domain/translate'
import { programTermLink } from '../util/links'
import { formatShortTerm, studyYear as calculateStudyYear, splitTerm } from '../../../../domain/term'
import { pageLink } from '../../../../domain/links'

function programmeTermLinkText(term) {
  const { language } = useStore()
  const t = translate(language)
  return `${t('programme_admitted_year')} ${formatShortTerm(term, language)}`
}

function ProgrammeTermsLinkListItem({ term }) {
  const { language, programmeCode, lengthInStudyYears } = useStore()
  const studyYear = calculateStudyYear(term, lengthInStudyYears)
  return (
    <Link key={term} href={programTermLink(programmeCode, term, `arskurs${studyYear}`, language)} target="_blank">
      {programmeTermLinkText(term)}
    </Link>
  )
}

function getFirstAdmissionYear(firstAdmissionTerm) {
  if (firstAdmissionTerm === null || !firstAdmissionTerm) {
    return null
  }
  const [year] = splitTerm(firstAdmissionTerm)
  if (!year) {
    return null
  }
  return Number(year)
}

function Programme() {
  const { firstAdmissionTerm, language, programmeCode, programmeName, programmeTerms } = useStore()
  const t = translate(language)
  const firstAdmissionYear = getFirstAdmissionYear(firstAdmissionTerm)
  return (
    <>
      <Row>
        <Col>
          <PageHeading subHeading={`${programmeName} (${programmeCode})`}>{t('programme_study_years')}</PageHeading>
        </Col>
      </Row>
      <Row>
        <Col>
          {programmeTerms.length === 0 ? (
            <p>{t('programme_study_years_syllabus_missing')}</p>
          ) : (
            <Article>
              <p>{t('programme_study_years_explanation')}</p>
              <LinkList>
                {programmeTerms.map(term => (
                  <ProgrammeTermsLinkListItem key={term} term={term} />
                ))}
              </LinkList>
            </Article>
          )}
        </Col>
      </Row>
      {(firstAdmissionYear === null || firstAdmissionYear < 2007) && (
        <Row>
          <Col>
            <h2>{t('programme_study_years_old')}</h2>
            <p>{t('programme_study_years_old_explanation')}</p>
            <p>
              <a href={pageLink(`/student/program/shb`, language)}>{t('main_menu_shb')}</a>
            </p>
          </Col>
        </Row>
      )}
      <Row>
        <Col>
          <FooterContent />
        </Col>
      </Row>
    </>
  )
}

ProgrammeTermsLinkListItem.propTypes = {
  term: PropTypes.string.isRequired,
}

export default Programme
