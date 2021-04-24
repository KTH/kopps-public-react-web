import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'reactstrap'
import { Link, LinkList, PageHeading } from '@kth/kth-reactstrap/dist/components/studinfo'

import Article from '../components/Article'
import FooterContent from '../components/FooterContent'

import { useStore } from '../mobx'
import i18n from '../../../../i18n'
import translate from '../util/translate'
import { programTermLink } from '../util/links'
import { studyYear as calculateStudyYear } from '../util/terms'

// TODO: Move to util
function formatTerm(term) {
  const { language } = useStore()
  const t = translate(i18n, language)
  const [year, semester] = term.split(/([1|2])$/)
  const shortYear = year.slice(-2)
  return `${t('semester')[semester]}${language === 'en' ? ' ' : ''}${shortYear}`
}

function programmeTermLinkText(term) {
  const { language } = useStore()
  const t = translate(i18n, language)
  return `${t('programme_admitted_year')} ${formatTerm(term)}`
}

function ProgrammeTermsLinkListItem({ term }) {
  const { language, browserConfig, programmeCode, lengthInStudyYears } = useStore()
  const studyYear = calculateStudyYear(term, lengthInStudyYears)
  return (
    <Link
      href={programTermLink(browserConfig.proxyPrefixPath.uri, programmeCode, term, `arskurs${studyYear}`, language)}
    >
      {programmeTermLinkText(term)}
    </Link>
  )
}

function ProgrammeTermsLinkList() {
  const { programmeTerms } = useStore()
  return (
    <LinkList>
      {programmeTerms.map(term => (
        <ProgrammeTermsLinkListItem key={term} term={term} />
      ))}
    </LinkList>
  )
}

function Programme() {
  const { language, programmeCode, programmeName } = useStore()
  const t = translate(i18n, language)
  return (
    <>
      <Row>
        <Col>
          <PageHeading subHeading={`${programmeName} (${programmeCode})`}>{t('programme_study_years')}</PageHeading>
        </Col>
      </Row>
      <Row>
        <Col>
          <Article>
            <p>{t('programme_study_years_explanation')}</p>
            <ProgrammeTermsLinkList />
          </Article>
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

ProgrammeTermsLinkListItem.propTypes = {
  term: PropTypes.string.isRequired,
}

export default Programme
