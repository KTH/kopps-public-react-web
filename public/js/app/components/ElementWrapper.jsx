/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import PropTypes from 'prop-types'
import { MobxStoreProvider } from '../mobx'
import NotFound from '../pages/NotFound'

function ElementWrapper({
  createBreadcrumbs,
  component: Component,
  layout: Layout,
  applicationStore,
  createMenuData,
  ...rest
}) {
  const menuData = createMenuData(applicationStore)
  const breadcrumbs = createBreadcrumbs(applicationStore)
  const { statusCode } = applicationStore
  return (
    <MobxStoreProvider initCallback={() => applicationStore}>
      <Layout breadcrumbs={breadcrumbs} menuData={menuData}>
        {statusCode === 404 ? <NotFound /> : <Component />}
      </Layout>
    </MobxStoreProvider>
  )
}

ElementWrapper.propTypes = {
  createBreadcrumbs: PropTypes.func,
  component: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.elementType]).isRequired,
  layout: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  createMenuData: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  applicationStore: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
}

ElementWrapper.defaultProps = {
  createBreadcrumbs: () => ({ include: 'student', items: [] }),
}

export default ElementWrapper
