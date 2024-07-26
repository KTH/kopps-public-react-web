/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react'
import { MobxStoreProvider } from '../mobx'
import NotFound from '../pages/NotFound'

interface SearchPageWrapperProps {
  component: React.ComponentType<any>
  layout: React.ComponentType<any>
  applicationStore: any
}

const SearchPageWrapper: React.FC<SearchPageWrapperProps> = ({
  component: Component,
  layout: Layout,
  applicationStore,
}) => {
  const { statusCode } = applicationStore

  useEffect(() => {
    const siteNameElement = document.querySelector('.block.siteName a') as HTMLAnchorElement | null;
    if (siteNameElement) {
      const rawHref = siteNameElement.href
      siteNameElement.href = rawHref.replace('.se//', '.se/')
    }
  }, [])

  return (
    <MobxStoreProvider initCallback={() => applicationStore}>
      <Layout>{statusCode === 404 ? <NotFound /> : <Component />}</Layout>
    </MobxStoreProvider>
  )
}

export default SearchPageWrapper
