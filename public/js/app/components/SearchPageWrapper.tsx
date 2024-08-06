/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react'
import { MobxStoreProvider } from '../mobx'
import NotFound from '../pages/NotFound'

interface SearchPageWrapperProps {
  component: React.ComponentType<any>
  applicationStore: any,
  initCallback?: () => any
}

const SearchPageWrapper: React.FC<SearchPageWrapperProps> = ({
  component: Component,
  applicationStore,
  initCallback
}) => {
  const { statusCode } = applicationStore

  useEffect(() => {
    const siteNameElement = document.querySelector('.block.siteName a') as HTMLAnchorElement | null
    if (siteNameElement) {
      const rawHref = siteNameElement.href
      siteNameElement.href = rawHref.replace('.se//', '.se/')
    }
  }, [])

  return (
    <MobxStoreProvider initCallback={initCallback ?? (() => applicationStore)}>
      {statusCode === 404 ? <NotFound /> : <Component />}
    </MobxStoreProvider>
  )
}

export default SearchPageWrapper
