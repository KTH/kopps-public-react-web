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
import getDepartmentMenuData from './config/departmentMenuData'
import getThirdCycleMenuData from './config/thirdCycleMenuData'
import getThirdCycleBreadcrumbs from './config/thirdCycleBreadcrumbs'
import getThirdCycleDepartmentMenuData from './config/thirdCycleDepartmentMenuData'
import StudyHandbook from './pages/StudyHandbook'
import ProgrammesList from './pages/ProgrammesList'
import DepartmentsList from './pages/DepartmentsList'
import DepartmentCourses from './pages/DepartmentCourses'
import ThirdCycleDepartmentsList from './pages/ThirdCycleDepartmentsList'

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
  const { language, browserConfig, departmentName } = applicationStore
  const menuData = getMenuData(language, browserConfig.proxyPrefixPath.uri)
  const departmentMenuData = getDepartmentMenuData(language, browserConfig.proxyPrefixPath.uri, departmentName)
  const menuDataExample = getMenuDataExample(language)
  return (
    <MobxStoreProvider initCallback={() => applicationStore}>
      <Switch>
        <Route exact path="/" component={CourseSearch} />
        <RouteWrapper
          exact
          path="/example"
          component={Example}
          breadcrumbs={{ include: 'directory' }}
          layout={PageLayout}
          menuData={{ selectedId: 'example', ...menuDataExample }}
        />
        <RouteWrapper
          exact
          path="/student/program/shb"
          component={StudyHandbook}
          breadcrumbs={{ include: 'directory' }}
          layout={PageLayout}
          menuData={{ selectedId: 'shb', ...menuData }}
        />
        <RouteWrapper
          exact
          path="/student/kurser/kurser-inom-program"
          component={ProgrammesList}
          breadcrumbs={{ include: 'directory' }}
          layout={PageLayout}
          menuData={{ selectedId: 'programmesList', ...menuData }}
        />
        <RouteWrapper
          exact
          path="/student/kurser/org"
          breadcrumbs={{ include: 'directory' }}
          component={DepartmentsList}
          layout={PageLayout}
          menuData={{ selectedId: 'departmentsList', ...menuData }}
        />
        <RouteWrapper
          exact
          path="/student/kurser/org/:departmentCode"
          breadcrumbs={{ include: 'directory' }}
          component={DepartmentCourses}
          layout={PageLayout}
          menuData={{ selectedId: 'courses', ...departmentMenuData }}
        />
        <RouteWrapper
          exact
          path="/utbildning/forskarutbildning/kurser/avdelning"
          breadcrumbs={{
            include: 'university',
            items: getThirdCycleBreadcrumbs(language, browserConfig.proxyPrefixPath.uri),
          }}
          component={ThirdCycleDepartmentsList}
          layout={PageLayout}
          menuData={{
            selectedId: 'thirdCycleDepartmentsList',
            ...getThirdCycleMenuData(language, browserConfig.proxyPrefixPath.uri),
          }}
        />
        <RouteWrapper
          exact
          path="/utbildning/forskarutbildning/kurser/org/:departmentCode"
          breadcrumbs={{
            include: 'university',
            items: getThirdCycleBreadcrumbs(language, browserConfig.proxyPrefixPath.uri),
          }}
          component={DepartmentCourses}
          layout={PageLayout}
          menuData={{
            selectedId: 'courses',
            ...getThirdCycleDepartmentMenuData(language, browserConfig.proxyPrefixPath.uri),
          }}
        />
      </Switch>
    </MobxStoreProvider>
  )
}
