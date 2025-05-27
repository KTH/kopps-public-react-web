/* eslint-disable react/no-danger */
import React from 'react'
import PropTypes from 'prop-types'

import { useStore } from '../mobx'

function LadokData({ html }) {
  if (!html) return null
  const { browserConfig } = useStore()
  const { markHtmlFromLadok } = browserConfig
  return markHtmlFromLadok ? (
    <div key="marked-data-from-ladok" data-from-ladok dangerouslySetInnerHTML={{ __html: html }} />
  ) : (
    <div key="data-from-ladok" dangerouslySetInnerHTML={{ __html: html }} />
  )
}

LadokData.propTypes = {
  html: PropTypes.string,
}

LadokData.defaultProps = {
  html: null,
}

export default LadokData
