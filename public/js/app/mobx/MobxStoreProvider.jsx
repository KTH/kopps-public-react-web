/* eslint no-use-before-define: ["error", "nofunc"] */

import React from 'react'

import { createMobxManager } from './manager'

export default MobxStoreProvider

/**
 * React-component which prepares a MobX-store
 * so that its data can be used with the useStore() hook
 * of any other component embedded into this Provider.
 *
 * @param {object} props
 * @param {function} props.initCallback
 * @param {string} [props.storeId]
 * @param {object} props.children
 *
 */
function MobxStoreProvider(props) {
  const { initCallback, storeId, children } = props

  const manager = createMobxManager(storeId || 'default', initCallback)

  const { Provider: ReactContextProvider, value: mobxStore } = manager.getProviderComponentAndValue()

  return <ReactContextProvider value={mobxStore}>{children}</ReactContextProvider>
}
