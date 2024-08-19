import React from 'react'
import { useStore } from '../../mobx'
import i18n from '../../../../../i18n'
import { centralStudyCounselingUrl, koppsEmail } from '../../util/links'
import Footer from '../Footer'

function FooterContent() {
  const { language, languageIndex } = useStore()
  const { contentContact, centralStudyCounseling, applicationContact, koppsEmailText } =
    i18n.messages[languageIndex].footerContent

  const centralStudyCounselingAddress = centralStudyCounselingUrl(language)
  const koppsEmailAddress = koppsEmail()

  return (
    <Footer>
      <address>
        {`${contentContact}: `}
        <a href={centralStudyCounselingAddress}>{centralStudyCounseling}</a>
        <br />
        {`${applicationContact}: `}
        <a href={koppsEmailAddress}>{koppsEmailText}</a>
      </address>
    </Footer>
  )
}

export default FooterContent
