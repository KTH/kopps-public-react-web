/* eslint no-use-before-define: ["error", "nofunc"] */

// @ts-check

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { StaticRouter } from 'react-router'
import { Provider } from 'mobx-react'

import ReactDOMServer from 'react-dom/server'

// Sass
import '../../css/node-web.scss'

// Store
import RouterStore from './stores/RouterStore'

// Pages
import Start from './pages/Start'

export default _getServerSideFunctions()

_renderOnClientSide()

function _getServerSideFunctions() {
  const result = {}

  result.render = ({ applicationStore, location, basename }) => {
    const app = (
      <StaticRouter basename={basename} location={location}>
        {_appFactory()}
      </StaticRouter>
    )

    const html = ReactDOMServer.renderToString(app)
    return html
  }

  return result
}

function _appFactory() {
  const routerStore = new RouterStore()

  if (typeof window !== 'undefined') {
    routerStore.initializeStore('routerStore')
  }

  return (
    <Provider routerStore={routerStore}>
      <Switch>
        <Route exact path="/" component={Start} />
      </Switch>
    </Provider>
  )
}

function _renderOnClientSide() {
  const isClientSide = typeof window !== 'undefined'
  if (!isClientSide) {
    return
  }

  // @ts-ignore
  // const basename = window.config.proxyPrefixPath.uri
  const basename = '/node'

  const app = <BrowserRouter basename={basename}>{_appFactory()}</BrowserRouter>

  const domElement = document.getElementById('app')

  ReactDOM.render(app, domElement)
}
