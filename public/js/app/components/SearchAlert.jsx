import React from 'react'
import i18n from '../../../../i18n'
import { Alert } from '@kth/kth-reactstrap/dist/components/studinfo'

const SearchAlert = ({ alertType: externalAlertType, languageIndex }) => {
  const { searchAlarms } = i18n.messages[languageIndex]
  const { header, help, text } = searchAlarms[externalAlertType]

  return (
    <Alert type="info">
      {header && <h5>{header}</h5>}
      {text && <p>{text}</p>}
      {help && <p>{help}</p>}
    </Alert>
  )
}

export default SearchAlert
