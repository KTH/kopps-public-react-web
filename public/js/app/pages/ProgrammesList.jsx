import React from 'react'
import { Col, Row } from 'reactstrap'
import { PageHeading, Heading, LinkList, Link } from '@kth/kth-reactstrap/dist/components/studinfo'

import Lead from '../components/Lead'
import Footer from '../components/Footer'

import { useStore } from '../mobx'
import i18n from '../../../../i18n'
import translate from '../util/translate'
import { centralStudyCounselingUrl, koppsEmail, programmeLink } from '../util/links'

function Anchor({ href, text }) {
  return <a href={href}>{text}</a>
}

function MainArticle({ children }) {
  return <article className="article">{children}</article>
}

function Paragraphs({ children }) {
  return <div className="paragraphs">{children}</div>
}

function Section({ programmeTypeName, children }) {
  const id = `progGroup${programmeTypeName}`
  const ariaLabelledBy = `heading-${programmeTypeName}`
  return (
    <section id={id} aria-labelledby={ariaLabelledBy}>
      {children}
    </section>
  )
}

function ProgrammeDescription({ programme }) {
  // TODO: Is this really the most effective way to do this?
  // Or would prop drilling be better?
  const { language } = useStore()
  const t = translate(i18n, language)
  const { credits, creditUnitAbbr, firstAdmissionTerm } = programme
  const [year, semester] = firstAdmissionTerm.split(/([1|2])$/)
  const shortYear = year.slice(-2)
  const formattedTerm = `${t('semester')[semester]}${shortYear}`
  return <>{`, ${credits} ${creditUnitAbbr}, ${t('programmes_admitted_from')} ${formattedTerm}`}</>
}

function ProgrammesListItem({ programme }) {
  const { programmeCode, title } = programme
  return (
    <>
      <Link href={programmeLink(programmeCode)}>{`${title} (${programmeCode})`}</Link>
      <ProgrammeDescription programme={programme} />
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

function FooterContent() {
  const { language } = useStore()
  const t = translate(i18n, language)

  const {
    content_contact: contentContact,
    central_study_counseling: centralStudyCounseling,
    application_contact: applicationContact,
    kopps_email: koppsEmailText,
  } = t('programmes_list_footer')

  const centralStudyCounselingAddress = centralStudyCounselingUrl()
  const koppsEmailAddress = koppsEmail()

  return (
    <address>
      {`${contentContact}: `}
      <Anchor href={centralStudyCounselingAddress} text={centralStudyCounseling} />
      <br />
      {`${applicationContact}: `}
      <Anchor href={koppsEmailAddress} text={koppsEmailText} />
    </address>
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
        </Col>
      </Row>
      <Row>
        <Col>
          <MainArticle>
            <Paragraphs>
              <Lead text={t('programmes_list_lead')} />
              {programmes.map(programmeType => (
                <Section key={programmeType[0]} programmeTypeName={programmeType[0]}>
                  <Heading size="h2" text={t('programme_type')[programmeType[0]]} />
                  <CurrentProgrammesList programmes={programmeType[1].first} />
                </Section>
              ))}
            </Paragraphs>
          </MainArticle>
        </Col>
      </Row>
      <Row>
        <Col>
          <Footer>
            <FooterContent />
          </Footer>
        </Col>
      </Row>
    </>
  )
}

export default ProgrammesList
