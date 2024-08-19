/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import PropTypes from 'prop-types'
import { MobxStoreProvider } from '../mobx'
import NotFound from '../pages/NotFound'

function ElementWrapper({ component: Component, layout: Layout, createMenuData, initApplicationStoreCallback, props }) {
  const applicationStore = initApplicationStoreCallback()
  const menuData = createMenuData(applicationStore)
  const { statusCode } = applicationStore

  return (
    <MobxStoreProvider initCallback={initApplicationStoreCallback}>
      <Layout menuData={menuData}>{statusCode === 404 ? <NotFound /> : <Component {...props} />}</Layout>
    </MobxStoreProvider>
  )
}

ElementWrapper.propTypes = {
  component: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.elementType]).isRequired,
  layout: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  createMenuData: PropTypes.func.isRequired,
  initApplicationStoreCallback: PropTypes.func.isRequired,
}

export default ElementWrapper
