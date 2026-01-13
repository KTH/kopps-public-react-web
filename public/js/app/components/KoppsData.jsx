/* eslint-disable react/no-danger */
import React from 'react'
import PropTypes from 'prop-types'

import { useStore } from '../mobx'

function KoppsData({ html = null }) {
  const { browserConfig } = useStore()
  if (!html) return null
  const { markHtmlFromKopps } = browserConfig
  return markHtmlFromKopps ? (
    <div key="marked-data-from-kopps" data-from-kopps dangerouslySetInnerHTML={{ __html: html }} />
  ) : (
    <div key="data-from-kopps" dangerouslySetInnerHTML={{ __html: html }} />
  )
}

KoppsData.propTypes = {
  html: PropTypes.string,
}

export default KoppsData
