import React from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'reactstrap'
import { PageHeading, Heading, LinkList, Link } from '@kth/kth-reactstrap/dist/components/studinfo'
import { CollapseDetails } from '@kth/kth-reactstrap/dist/components/utbildningsinfo'

import Lead from '../components/Lead'
import FooterContent from '../components/FooterContent'

import { useStore } from '../mobx'
import i18n from '../../../../i18n'
import translate from '../util/translate'
import { programmeLink } from '../util/links'
import Article from '../components/Article'

function Section({ programmeType, children }) {
  const id = `progGroup${programmeType}`
  const ariaLabelledBy = `heading-${programmeType}`
  return (
    <section id={id} aria-labelledby={ariaLabelledBy}>
      {children}
    </section>
  )
}

function formatTerm(term) {
  const { language } = useStore()
  const t = translate(i18n, language)
  const [year, semester] = term.split(/([1|2])$/)
  const shortYear = year.slice(-2)
  return `${t('semester')[semester]}${language === 'en' ? ' ' : ''}${shortYear}`
}

function CurrentProgrammeDescription({ programme }) {
  const { language } = useStore()
  const t = translate(i18n, language)
  const { credits, creditUnitAbbr, firstAdmissionTerm } = programme
  const formattedTerm = formatTerm(firstAdmissionTerm)
  return <>{`, ${credits} ${creditUnitAbbr}, ${t('programmes_admitted_from')} ${formattedTerm}`}</>
}

function ObsoleteProgrammeDescription({ programme }) {
  const { language } = useStore()
  const t = translate(i18n, language)
  const { credits, creditUnitAbbr, firstAdmissionTerm, lastAdmissionTerm } = programme
  const formattedLastTerm = formatTerm(lastAdmissionTerm)
  if (firstAdmissionTerm) {
    const formattedFirstTerm = formatTerm(firstAdmissionTerm)
    return (
      <>{`, ${credits} ${creditUnitAbbr}, ${t('programmes_admitted')} ${formattedFirstTerm}–${formattedLastTerm}`}</>
    )
  }
  return <>{`, ${credits} ${creditUnitAbbr}, ${t('programmes_admitted_until')} ${formattedLastTerm}`}</>
}

function ProgrammesListItem({ programme, variant }) {
  const { language } = useStore()
  const { programmeCode, title } = programme
  return (
    <>
      <Link href={programmeLink(programmeCode, language)}>{`${title} (${programmeCode})`}</Link>
      {variant === 'obsolete' ? (
        <ObsoleteProgrammeDescription programme={programme} />
      ) : (
        <CurrentProgrammeDescription programme={programme} />
      )}
    </>
  )
}

function CurrentProgrammesList({ programmes }) {
  return (
    <LinkList>
      {programmes.map(programme => (
        <ProgrammesListItem key={programme.title} programme={programme} />
      ))}
    </LinkList>
  )
}

function ObsololeteProgrammesList({ programmeType, programmes = [] }) {
  if (!programmes.length) return null
  const { language } = useStore()
  const t = translate(i18n, language)
  const title = `${t('programmes_older')} (${t('programme_type')[programmeType]})`
  return (
    <CollapseDetails title={title}>
      <LinkList>
        {programmes.map(programme => (
          <ProgrammesListItem key={programme.title} variant="obsolete" programme={programme} />
        ))}
      </LinkList>
    </CollapseDetails>
  )
}

function ProgrammesList() {
  const { language, programmes } = useStore()
  const t = translate(i18n, language)
  return (
    <>
      <Row>
        <Col>
          <PageHeading>{t('programmes_list_header')}</PageHeading>
          <Lead text={t('programmes_list_lead')} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Article>
            {programmes.map(programme => (
              <Section key={programme[0]} programmeType={programme[0]}>
                <Heading size="h2" text={t('programme_type')[programme[0]]} />
                <CurrentProgrammesList programmes={programme[1].first} />
                <ObsololeteProgrammesList programmeType={programme[0]} programmes={programme[1].second} />
              </Section>
            ))}
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

// TODO: Cleanup prop types: consolidate and rename
Section.propTypes = {
  programmeType: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.node), PropTypes.node]).isRequired,
}

CurrentProgrammeDescription.propTypes = {
  programme: PropTypes.shape({
    credits: PropTypes.string.isRequired,
    creditUnitAbbr: PropTypes.string.isRequired,
    firstAdmissionTerm: PropTypes.string.isRequired,
  }).isRequired,
}

ObsoleteProgrammeDescription.propTypes = {
  programme: PropTypes.shape({
    credits: PropTypes.string.isRequired,
    creditUnitAbbr: PropTypes.string.isRequired,
    firstAdmissionTerm: PropTypes.string.isRequired,
    lastAdmissionTerm: PropTypes.string.isRequired,
  }).isRequired,
}

ProgrammesListItem.propTypes = {
  programme: PropTypes.shape({
    programmeCode: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  variant: PropTypes.string.isRequired,
}

CurrentProgrammesList.propTypes = {
  programmes: PropTypes.arrayOf(
    PropTypes.shape({
      programmeCode: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ).isRequired,
}

ObsololeteProgrammesList.propTypes = {
  programmeType: PropTypes.string.isRequired,
  programmes: PropTypes.arrayOf(
    PropTypes.shape({
      programmeCode: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
    })
  ),
}

ObsololeteProgrammesList.defaultProps = {
  programmes: [],
}

export default ProgrammesList
