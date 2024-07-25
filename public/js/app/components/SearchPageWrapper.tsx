/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import PropTypes from 'prop-types'
import { MobxStoreProvider } from '../mobx'
import NotFound from '../pages/NotFound'

function SearchPageWrapper({ component: Component, layout: Layout, applicationStore }) {
  const { statusCode } = applicationStore

  React.useEffect(() => {
    let isMounted = true
    if (isMounted) {
      const siteNameElement = document.querySelector('.block.siteName a')
      if (siteNameElement) {
        const rawHref = siteNameElement.href
        siteNameElement.href = rawHref.replace('.se//', '.se/')
      }
    }
    return () => (isMounted = false)
  }, [])

  return (
    <MobxStoreProvider initCallback={() => applicationStore}>
      <Layout>{statusCode === 404 ? <NotFound /> : <Component />}</Layout>
    </MobxStoreProvider>
  )
}

SearchPageWrapper.propTypes = {
  component: PropTypes.oneOfType([PropTypes.node, PropTypes.func, PropTypes.elementType]).isRequired,
  layout: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  applicationStore: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
}

export default SearchPageWrapper
