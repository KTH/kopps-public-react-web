/* eslint no-use-before-define: ["error", "nofunc"] */

// @ts-check

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { StaticRouter } from 'react-router'
import { useStaticRendering } from 'mobx-react'
import ReactDOMServer from 'react-dom/server'

import { MobxStoreProvider, compressStoreIntoJavascriptCode, uncompressStoreInPlaceFromDocument } from './mobx'
import createApplicationStore from './stores/createApplicationStore'

import '../../css/node-web.scss'

import Start from './pages/Start'

export default _getServerSideFunctions()

_renderOnClientSide()

function _getServerSideFunctions() {
  return {
    createStore() {
      return createApplicationStore()
    },

    getCompressedStoreCode(store) {
      const code = compressStoreIntoJavascriptCode(store)
      return code
    },

    renderStaticPage({ applicationStore, location, basename }) {
      useStaticRendering(true)

      const app = (
        <StaticRouter basename={basename} location={location}>
          {_appFactory(applicationStore)}
        </StaticRouter>
      )

      const html = ReactDOMServer.renderToString(app)
      return html
    },
  }
}

function _renderOnClientSide() {
  const isClientSide = typeof window !== 'undefined'
  if (!isClientSide) {
    return
  }

  // @ts-ignore
  // const basename = window.config.proxyPrefixPath.uri
  const basename = '/node'

  const applicationStore = createApplicationStore()
  uncompressStoreInPlaceFromDocument(applicationStore)

  const app = <BrowserRouter basename={basename}>{_appFactory(applicationStore)}</BrowserRouter>

  const domElement = document.getElementById('app')
  ReactDOM.hydrate(app, domElement)
}

function _appFactory(applicationStore) {
  return (
    <MobxStoreProvider initCallback={() => applicationStore}>
      <Switch>
        <Route exact path="/" component={Start} />
      </Switch>
    </MobxStoreProvider>
  )
}
