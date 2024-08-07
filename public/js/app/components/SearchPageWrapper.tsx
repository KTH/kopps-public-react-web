/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect } from 'react'
import { MobxStoreProvider } from '../mobx'
import NotFound from '../pages/NotFound'

interface SearchPageWrapperProps {
  component: React.ComponentType<any>
  initApplicationStoreCallback: () => any
}

const SearchPageWrapper: React.FC<SearchPageWrapperProps> = ({
  component: Component,
  initApplicationStoreCallback,
}) => {

  return (
    <MobxStoreProvider initCallback={initApplicationStoreCallback}>
      <Component />
    </MobxStoreProvider>
  )
}

export default SearchPageWrapper
