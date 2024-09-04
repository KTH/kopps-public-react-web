/* eslint-disable react/jsx-props-no-spreading */
import React from 'react'
import { MobxStoreProvider } from '../../mobx'

import { SearchPageWrapperProps } from './types'

const SearchPageWrapper: React.FC<SearchPageWrapperProps> = ({
  component: Component,
  props,
  initApplicationStoreCallback,
}) => {
  return (
    <MobxStoreProvider initCallback={initApplicationStoreCallback}>
      <Component {...props} />
    </MobxStoreProvider>
  )
}

export default SearchPageWrapper
