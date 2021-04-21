/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { Route } from 'react-router-dom'
import PropTypes from 'prop-types'

function RouteWrapper({ breadcrumbs, component: Component, layout: Layout, menuData, ...rest }) {
  return (
    <Route
      {...rest}
      render={() => (
        <Layout breadcrumbs={breadcrumbs} menuData={menuData}>
          <Component />
        </Layout>
      )}
    />
  )
}

RouteWrapper.propTypes = {
  breadcrumbs: PropTypes.shape({
    include: PropTypes.oneOf(['none', 'university', 'student', 'directory']),
    items: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string,
        label: PropTypes.string,
      })
    ),
  }),
  component: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  layout: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  menuData: PropTypes.shape({
    ariaLabel: PropTypes.string,
    navList: PropTypes.shape({
      type: PropTypes.oneOf(['expandable']),
      items: PropTypes.arrayOf(
        PropTypes.shape({
          id: PropTypes.string,
          type: PropTypes.oneOf[('ancestor', 'leaf')],
          text: PropTypes.string,
        })
      ),
    }),
    parentLink: PropTypes.shape({ text: PropTypes.string, url: PropTypes.string }),
    selectedId: PropTypes.string,
  }).isRequired,
}

RouteWrapper.defaultProps = {
  breadcrumbs: { include: 'student', items: [] },
}

export default RouteWrapper
