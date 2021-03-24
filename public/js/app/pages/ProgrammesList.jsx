import React from 'react'
import { Col, Row } from 'reactstrap'
import { PageHeading, Heading } from '@kth/kth-reactstrap/dist/components/studinfo'

import Lead from '../components/Lead'
import Article from '../components/Article'
import Footer from '../components/Footer'

import { useStore } from '../mobx'
import i18n from '../../../../i18n'
import translate from '../util/translate'
import { centralStudyCounselingUrl, koppsEmail } from '../util/links'

function Anchor({ href, text }) {
  return <a href={href}>{text}</a>
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
  const { language } = useStore()
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
          <Heading size="h2" text={t('programme_type_tarku')} />
          <Article />
          <Heading size="h2" text={t('programme_type_cing')} />
          <Article />
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
