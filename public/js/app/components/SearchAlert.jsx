import React from 'react'
import { Alert } from '@kth/kth-reactstrap/dist/components/studinfo'
import PropTypes from 'prop-types'
import i18n from '../../../../i18n'
import { ERROR_ASYNC } from '../hooks/searchUseAsync'

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

SearchAlert.propTypes = {
  alertType: PropTypes.oneOf([...Object.values(ERROR_ASYNC), null]).isRequired,
  languageIndex: PropTypes.oneOf([0, 1]).isRequired,
}

export default SearchAlert
