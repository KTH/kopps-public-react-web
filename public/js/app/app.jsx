/* eslint no-use-before-define: ["error", "nofunc"] */

// @ts-check

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Switch } from 'react-router-dom'

import { uncompressStoreInPlaceFromDocument } from './mobx'
import createApplicationStore from './stores/createApplicationStore'

import '../../css/node-web.scss'

import CourseSearch from './pages/CourseSearch'
import CourseSearchResearch from './pages/CourseSearchResearch'
import Example from './pages/Example'
import PageLayout from './layout/PageLayout'
import RouteWrapper from './components/RouteWrapper'

import getMenuData from './config/menuData'
import getMenuDataExample from './config/menuDataExample'
import getDepartmentMenuData from './config/departmentMenuData'
import getThirdCycleMenuData from './config/thirdCycleMenuData'
import getThirdCycleBreadcrumbs from './config/thirdCycleBreadcrumbs'
import getThirdCycleDepartmentMenuData from './config/thirdCycleDepartmentMenuData'
import getProgrammeMenuData from './config/programmeMenuData'
import getCurriculumMenuData from './config/curriculumMenuData'
import StudyHandbook from './pages/StudyHandbook'
import ProgrammesList from './pages/ProgrammesList'
import DepartmentsList from './pages/DepartmentsList'
import DepartmentCourses from './pages/DepartmentCourses'
import ThirdCycleDepartmentsList from './pages/ThirdCycleDepartmentsList'
import Programme from './pages/Programme'
import Curriculum from './pages/Curriculum'

export default appFactory

_renderOnClientSide()

function _initStore({ storeId, applicationStore }) {
  // Server side application store, most likely created in controller
  if (applicationStore) return applicationStore

  // Client side application store
  const clientSideApplicationStore = createApplicationStore(storeId)
  uncompressStoreInPlaceFromDocument(clientSideApplicationStore)
  return clientSideApplicationStore
}

function _renderOnClientSide() {
  const isClientSide = typeof window !== 'undefined'
  if (!isClientSide) {
    return
  }

  // @ts-ignore
  const basename = window.config.proxyPrefixPath.uri

  const app = <BrowserRouter basename={basename}>{appFactory()}</BrowserRouter>

  const domElement = document.getElementById('app')
  ReactDOM.hydrate(app, domElement)
}

function appFactory(ssrApplicationStore) {
  return (
    <Switch>
      <RouteWrapper
        exact
        path="/example"
        component={Example}
        createBreadcrumbs={() => ({ include: 'directory' })}
        layout={PageLayout}
        applicationStore={_initStore({ storeId: '', applicationStore: ssrApplicationStore })}
        createMenuData={applicationStore => ({ selectedId: 'example', ...getMenuDataExample(applicationStore) })}
      />
      <RouteWrapper
        exact
        path="/student/program/shb"
        component={StudyHandbook}
        createBreadcrumbs={() => ({ include: 'directory' })}
        layout={PageLayout}
        applicationStore={_initStore({ storeId: '', applicationStore: ssrApplicationStore })}
        createMenuData={applicationStore => ({ selectedId: 'shb', ...getMenuData(applicationStore) })}
      />
      <RouteWrapper
        exact
        path="/student/kurser/kurser-inom-program"
        component={ProgrammesList}
        createBreadcrumbs={() => ({ include: 'directory' })}
        layout={PageLayout}
        applicationStore={_initStore({ storeId: '', applicationStore: ssrApplicationStore })}
        createMenuData={applicationStore => ({ selectedId: 'programmesList', ...getMenuData(applicationStore) })}
      />
      <RouteWrapper
        exact
        path="/student/kurser/sokkurs"
        createBreadcrumbs={() => ({ include: 'directory' })}
        component={CourseSearch}
        layout={PageLayout}
        applicationStore={_initStore({
          storeId: 'searchCourses',
          applicationStore: ssrApplicationStore,
        })}
        createMenuData={applicationStore => ({ selectedId: 'searchAllCourses', ...getMenuData(applicationStore) })}
      />
      <RouteWrapper
        exact
        path="/student/kurser/org"
        createBreadcrumbs={() => ({ include: 'directory' })}
        component={DepartmentsList}
        layout={PageLayout}
        applicationStore={_initStore({ storeId: '', applicationStore: ssrApplicationStore })}
        createMenuData={applicationStore => ({ selectedId: 'departmentsList', ...getMenuData(applicationStore) })}
      />
      <RouteWrapper
        exact
        path="/student/kurser/org/:departmentCode"
        createBreadcrumbs={() => ({ include: 'directory' })}
        component={DepartmentCourses}
        layout={PageLayout}
        applicationStore={_initStore({ storeId: '', applicationStore: ssrApplicationStore })}
        createMenuData={applicationStore => ({ selectedId: 'courses', ...getDepartmentMenuData(applicationStore) })}
      />
      <RouteWrapper
        exact
        path="/student/kurser/program/:programmeCode"
        createBreadcrumbs={() => ({ include: 'directory' })}
        component={Programme}
        layout={PageLayout}
        applicationStore={_initStore({ storeId: '', applicationStore: ssrApplicationStore })}
        createMenuData={applicationStore => ({ selectedId: 'studyYears', ...getProgrammeMenuData(applicationStore) })}
      />
      <RouteWrapper
        exact
        path="/utbildning/forskarutbildning/kurser/avdelning"
        createBreadcrumbs={applicationStore => ({
          include: 'university',
          items: getThirdCycleBreadcrumbs(applicationStore),
        })}
        component={ThirdCycleDepartmentsList}
        layout={PageLayout}
        applicationStore={_initStore({ storeId: '', applicationStore: ssrApplicationStore })}
        createMenuData={applicationStore => ({
          selectedId: 'thirdCycleDepartmentsList',
          ...getThirdCycleMenuData(applicationStore),
        })}
      />
      <RouteWrapper
        exact
        path="/utbildning/forskarutbildning/kurser/org/:departmentCode"
        createBreadcrumbs={applicationStore => ({
          include: 'university',
          items: getThirdCycleBreadcrumbs(applicationStore),
        })}
        component={DepartmentCourses}
        layout={PageLayout}
        applicationStore={_initStore({ storeId: '', applicationStore: ssrApplicationStore })}
        createMenuData={applicationStore => ({
          selectedId: 'courses',
          ...getThirdCycleDepartmentMenuData(applicationStore),
        })}
      />
      <RouteWrapper
        exact
        path="/utbildning/forskarutbildning/kurser/sok"
        createBreadcrumbs={applicationStore => ({
          include: 'university',
          items: getThirdCycleBreadcrumbs(applicationStore),
        })}
        component={CourseSearchResearch}
        layout={PageLayout}
        applicationStore={_initStore({
          storeId: 'searchCourses',
          applicationStore: ssrApplicationStore,
        })}
        createMenuData={applicationStore => ({
          selectedId: 'searchThirdCycleCourses',
          ...getThirdCycleMenuData(applicationStore),
        })}
      />
      <RouteWrapper
        exact
        path="/student/kurser/program/:programmeCode/:term/:studyYear"
        createBreadcrumbs={() => ({ include: 'directory' })}
        component={Curriculum}
        layout={PageLayout}
        applicationStore={_initStore({
          storeId: 'curriculum',
          applicationStore: ssrApplicationStore,
        })}
        createMenuData={applicationStore => ({
          selectedId: applicationStore.studyYear,
          ...getCurriculumMenuData(applicationStore),
        })}
      />
    </Switch>
  )
}
