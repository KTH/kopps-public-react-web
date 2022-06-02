import React from 'react'
import PropTypes from 'prop-types'
import { MobxStoreProvider } from '../mobx'

// eslint-disable-next-line react/prop-types
function ElementWrapperForPDF({ component: Component, applicationStore }) {
  return (
    <MobxStoreProvider initCallback={() => applicationStore}>
      <Component />
    </MobxStoreProvider>
  )
}

ElementWrapperForPDF.prototypes = {
  component: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.elementType]).isRequired,
  applicationStore: PropTypes.oneOfType([PropTypes.object, PropTypes.func, PropTypes.elementType]).isRequired,
}

export default ElementWrapperForPDF
