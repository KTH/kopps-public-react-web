/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react'
import { MobxStoreProvider } from '../mobx'
import NotFound from '../pages/NotFound'

interface SearchPageWrapperProps {
  component: React.ComponentType<any>
  initApplicationStoreCallback: () => any
}

const SearchPageWrapper: React.FC<SearchPageWrapperProps> = ({ component: Component, initApplicationStoreCallback }) => {
  const applicationStore = initApplicationStoreCallback()
  const { statusCode } = applicationStore

  useEffect(() => {
    const siteNameElement = document.querySelector('.block.siteName a') as HTMLAnchorElement | null
    if (siteNameElement) {
      const rawHref = siteNameElement.href
      siteNameElement.href = rawHref.replace('.se//', '.se/')
    }
  }, [])

  return (
    <MobxStoreProvider initCallback={initApplicationStoreCallback}>
      {statusCode === 404 ? <NotFound /> : <Component />}
    </MobxStoreProvider>
  )
}

export default SearchPageWrapper
