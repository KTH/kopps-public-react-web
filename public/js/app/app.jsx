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
import getStudyProgrammeMenuData from './config/studyProgrammeMenuData'
import getLiteratureList from './config/literatureListMenuData'
import StudyHandbook from './pages/StudyHandbook'
import ProgrammesList from './pages/ProgrammesList'
import DepartmentsList from './pages/DepartmentsList'
import DepartmentCourses from './pages/DepartmentCourses'
import ThirdCycleDepartmentsList from './pages/ThirdCycleDepartmentsList'
import Programme from './pages/Programme'
import Curriculum from './pages/Curriculum'
import Objectives from './pages/Objectives'
import Extent from './pages/Extent'
import Eligibility from './pages/Eligibility'
import Implementation from './pages/Implementation'
import Appendix1 from './pages/Appendix1'
import Appendix2 from './pages/Appendix2'
import LiteratureList from './pages/LiteratureList'
import getLiteratureListBreadcrumbs from './config/literatureListBreadcrumbs'

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
  const app = <BrowserRouter>{appFactory()}</BrowserRouter>

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
          storeId: '',
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
        path="/student/kurser/program/:programmeCode/:term/mal"
        createBreadcrumbs={() => ({ include: 'directory' })}
        component={Objectives}
        layout={PageLayout}
        applicationStore={_initStore({
          storeId: 'objective',
          applicationStore: ssrApplicationStore,
        })}
        createMenuData={applicationStore => ({
          selectedId: 'objectives',
          ...getStudyProgrammeMenuData(applicationStore),
        })}
      />
      <RouteWrapper
        exact
        path="/student/kurser/program/:programmeCode/:term/omfattning"
        createBreadcrumbs={() => ({ include: 'directory' })}
        component={Extent}
        layout={PageLayout}
        applicationStore={_initStore({
          storeId: 'extent',
          applicationStore: ssrApplicationStore,
        })}
        createMenuData={applicationStore => ({
          selectedId: 'extent',
          ...getStudyProgrammeMenuData(applicationStore),
        })}
      />
      <RouteWrapper
        exact
        path="/student/kurser/program/:programmeCode/:term/behorighet"
        createBreadcrumbs={() => ({ include: 'directory' })}
        component={Eligibility}
        layout={PageLayout}
        applicationStore={_initStore({
          storeId: 'eligibility',
          applicationStore: ssrApplicationStore,
        })}
        createMenuData={applicationStore => ({
          selectedId: 'eligibility',
          ...getStudyProgrammeMenuData(applicationStore),
        })}
      />
      <RouteWrapper
        exact
        path="/student/kurser/program/:programmeCode/:term/genomforande"
        createBreadcrumbs={() => ({ include: 'directory' })}
        component={Implementation}
        layout={PageLayout}
        applicationStore={_initStore({
          storeId: 'implementation',
          applicationStore: ssrApplicationStore,
        })}
        createMenuData={applicationStore => ({
          selectedId: 'implementation',
          ...getStudyProgrammeMenuData(applicationStore),
        })}
      />
      <RouteWrapper
        exact
        path="/student/kurser/program/:programmeCode/:term/kurslista"
        createBreadcrumbs={() => ({ include: 'directory' })}
        component={Appendix1}
        layout={PageLayout}
        applicationStore={_initStore({
          storeId: 'appendix1',
          applicationStore: ssrApplicationStore,
        })}
        createMenuData={applicationStore => ({
          selectedId: 'appendix1',
          ...getStudyProgrammeMenuData(applicationStore),
        })}
      />
      <RouteWrapper
        exact
        path="/student/kurser/program/:programmeCode/:term/inriktningar"
        createBreadcrumbs={() => ({ include: 'directory' })}
        component={Appendix2}
        layout={PageLayout}
        applicationStore={_initStore({
          storeId: 'appendix2',
          applicationStore: ssrApplicationStore,
        })}
        createMenuData={applicationStore => ({
          selectedId: 'appendix2',
          ...getStudyProgrammeMenuData(applicationStore),
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
          selectedId: `year-${applicationStore.studyYear}`,
          ...getCurriculumMenuData(applicationStore),
        })}
      />
      <RouteWrapper
        exact
        path="/student/kurser/lit/:term/:school"
        createBreadcrumbs={applicationStore => ({
          include: 'student',
          items: getLiteratureListBreadcrumbs(applicationStore),
        })}
        component={LiteratureList}
        layout={PageLayout}
        applicationStore={_initStore({
          storeId: 'literatureList',
          applicationStore: ssrApplicationStore,
        })}
        createMenuData={applicationStore => ({
          selectedId: applicationStore.selectedSchoolCode,
          ...getLiteratureList(applicationStore),
        })}
      />
    </Switch>
  )
}
