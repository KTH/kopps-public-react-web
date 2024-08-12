import React from 'react'
import Alert from '../../components-shared/Alert'
import i18n from '../../../../../i18n'

import { SearchAlertProps } from './types'

const SearchAlert: React.FC<SearchAlertProps> = ({ alertType: externalAlertType, languageIndex }) => {
  const { searchAlarms } = i18n.messages[languageIndex]
  const { header, help, text } = searchAlarms[externalAlertType]

  return (
    <Alert type="info" header={header}>
      {text && <p>{text}</p>}
      {help && <p>{help}</p>}
    </Alert>
  )
}

export default SearchAlert
