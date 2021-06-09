import React from 'react'
import PropTypes from 'prop-types'
import translate from '../../../../domain/translate'

function LanguageControl({ language }) {
  const otherLang = language === 'sv' ? 'en' : 'sv'
  const t = translate(otherLang)
  return (
    <div className="col-auto text-right">
      <a href={`?l=${otherLang}`} lang={language} hrefLang={language}>
        {t('other_lang')}
      </a>
    </div>
  )
}

LanguageControl.propTypes = {
  language: PropTypes.string.isRequired,
}

export default LanguageControl
