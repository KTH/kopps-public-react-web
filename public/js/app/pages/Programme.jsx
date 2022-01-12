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
    <Link key={term} href={programTermLink(programmeCode, term, `arskurs${studyYear}`, language)}>
      {programmeTermLinkText(term)}
    </Link>
  )
}

function Programme() {
  const { lastAdmissionTerm, language, programmeCode, programmeName, programmeTerms } = useStore()
  const t = translate(language)
  return (
    <>
      <Row key="programme-syllabus-heading">
        <Col>
          <PageHeading subHeading={`${programmeName} (${programmeCode})`}>{t('programme_study_years')}</PageHeading>
        </Col>
      </Row>
      <Row key="programme-syllabus-list">
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
      {lastAdmissionTerm && (
        <Row key="programme-syllabus-old">
          <Col>
            <h2>{t('programme_study_years_old')}</h2>
            <p>{t('programme_study_years_old_explanation')}</p>
            <p>
              <Link href={pageLink(`/student/program/shb`, language)}>{t('main_menu_shb')}</Link>
            </p>
          </Col>
        </Row>
      )}
      <Row key="footer">
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
