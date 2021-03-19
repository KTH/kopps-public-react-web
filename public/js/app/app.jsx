/* eslint no-use-before-define: ["error", "nofunc"] */

// @ts-check

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { MobxStoreProvider, uncompressStoreInPlaceFromDocument } from './mobx'
import createApplicationStore from './stores/createApplicationStore'

import '../../css/node-web.scss'

import CourseSearch from './pages/CourseSearch'
import PageLayout from './layout/PageLayout'
import ContentPageOne from './pages/ContentPageOne'
import ContentPageTwo from './pages/ContentPageTwo'
import ContentPageThree from './pages/ContentPageThree'
import RouteWrapper from './components/RouteWrapper'

export default appFactory

_renderOnClientSide()

function _renderOnClientSide() {
  const isClientSide = typeof window !== 'undefined'
  if (!isClientSide) {
    return
  }

  // @ts-ignore
  const basename = window.config.proxyPrefixPath.uri

  const applicationStore = createApplicationStore()
  uncompressStoreInPlaceFromDocument(applicationStore)

  const app = <BrowserRouter basename={basename}>{appFactory(applicationStore)}</BrowserRouter>

  const domElement = document.getElementById('app')
  ReactDOM.hydrate(app, domElement)
}

function appFactory(applicationStore) {
  return (
    <MobxStoreProvider initCallback={() => applicationStore}>
      <Switch>
        <Route exact path="/" component={CourseSearch} />
        <RouteWrapper exact path="/one/:page" component={ContentPageOne} layout={PageLayout} />
        <RouteWrapper exact path="/two/:page" component={ContentPageTwo} layout={PageLayout} />
        <RouteWrapper exact path="/three/:page" component={ContentPageThree} layout={PageLayout} />
      </Switch>
    </MobxStoreProvider>
  )
}
