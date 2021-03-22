/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Route } from 'react-router-dom'

function RouteWrapper({ component: Component, layout: Layout, menuData, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => (
        <Layout menuData={menuData}>
          <Component />
        </Layout>
      )}
    />
  )
}

export default RouteWrapper
