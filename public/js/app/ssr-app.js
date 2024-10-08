/* eslint no-use-before-define: ["error", "nofunc"] */

import React from 'react'
import { StaticRouter } from 'react-router-dom/server'
import { enableStaticRendering } from 'mobx-react'
import ReactDOMServer from 'react-dom/server'

import { compressStoreIntoJavascriptCode } from './mobx'
import createApplicationStore from './stores/createApplicationStore'

import appFactory from './app'

export default _getServerSideFunctions()

function _getServerSideFunctions() {
  return {
    createStore(storeId) {
      return createApplicationStore(storeId)
    },
    getCompressedStoreCode(store) {
      const code = compressStoreIntoJavascriptCode(store)
      return code
    },
    renderStaticPage({ applicationStore, location, basename }) {
      enableStaticRendering(true)
      const app = (
        <StaticRouter basename={basename} location={location} context={{}}>
          {appFactory(applicationStore)}
        </StaticRouter>
      )
      const html = ReactDOMServer.renderToString(app)
      return html
    },
  }
}
