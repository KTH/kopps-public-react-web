/* eslint-disable react/no-danger */
import React from 'react'
import PropTypes from 'prop-types'

import { useStore } from '../mobx'

function KoppsData({ html }) {
  const { browserConfig } = useStore()
  const { markHtmlFromKopps } = browserConfig
  return markHtmlFromKopps ? (
    <div data-from-kopps dangerouslySetInnerHTML={{ __html: html }} />
  ) : (
    <div dangerouslySetInnerHTML={{ __html: html }} />
  )
}

KoppsData.propTypes = {
  html: PropTypes.string.isRequired,
}

export default KoppsData
