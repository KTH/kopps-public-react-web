/* eslint no-use-before-define: ["error", "nofunc"] */

// @ts-check

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'

import { MobxStoreProvider, uncompressStoreInPlaceFromDocument } from './mobx'
import createApplicationStore from './stores/createApplicationStore'

import '../../css/node-web.scss'

import CourseSearch from './pages/CourseSearch'
import Example from './pages/Example'
import PageLayout from './layout/PageLayout'
import RouteWrapper from './components/RouteWrapper'

import getMenuData from './config/menuData'
import getMenuDataExample from './config/menuDataExample'
import ProgrammesList from './pages/ProgrammesList'
import DepartmentsList from './pages/DepartmentsList'

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
  const { language } = applicationStore
  const menuData = getMenuData(language)
  const menuDataExample = getMenuDataExample(language)
  return (
    <MobxStoreProvider initCallback={() => applicationStore}>
      <Switch>
        <Route exact path="/" component={CourseSearch} />
        <RouteWrapper
          exact
          path="/example"
          component={Example}
          layout={PageLayout}
          menuData={{ selectedId: 'example', ...menuDataExample }}
        />
        <RouteWrapper
          exact
          path="/kurser-inom-program"
          component={ProgrammesList}
          layout={PageLayout}
          menuData={{ selectedId: 'programmesList', ...menuData }}
        />
        <RouteWrapper
          exact
          path="/org"
          component={DepartmentsList}
          layout={PageLayout}
          menuData={{ selectedId: 'departmentsList', ...menuData }}
        />
      </Switch>
    </MobxStoreProvider>
  )
}
