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

function _initStore(optionalStoreProps = {}) {
  // Server side application store, most likely created in controller
  const { caller = '', storeId = '', serverSideApplicationStore = null } = optionalStoreProps

  if (serverSideApplicationStore) return serverSideApplicationStore

  // Client side application store
  console.log(`Creating client-side applicationStore with storeId: ${storeId} and caller funcation is ${caller}`)
  const clientSideApplicationStore = createApplicationStore(storeId)

  uncompressStoreInPlaceFromDocument(clientSideApplicationStore)
  return clientSideApplicationStore
}

function _renderOnClientSide() {
  const isClientSide = typeof window !== 'undefined'
  if (!isClientSide) {
    return
  }
  console.log('_renderOnClientSide: start rendering appFactory')

  const app = <BrowserRouter>{appFactory()}</BrowserRouter>

  const domElement = document.getElementById('app')
  ReactDOM.render(app, domElement)
}

function appFactory(serverSideApplicationStore = null) {
  return (
    <Switch>
      <RouteWrapper
        exact
        path="/example"
        component={Example}
        createBreadcrumbs={() => ({ include: 'directory' })}
        layout={PageLayout}
        applicationStore={_initStore()}
        createMenuData={store => ({ selectedId: 'example', ...getMenuDataExample(store) })}
      />
      <RouteWrapper
        exact
        path="/student/program/shb"
        component={StudyHandbook}
        createBreadcrumbs={() => ({ include: 'directory' })}
        layout={PageLayout}
        applicationStore={_initStore({ caller: 'StudyHandbook' })}
        createMenuData={store => ({ selectedId: 'shb', ...getMenuData(store) })}
      />
      <RouteWrapper
        exact
        path="/student/kurser/kurser-inom-program"
        component={ProgrammesList}
        createBreadcrumbs={() => ({ include: 'directory' })}
        layout={PageLayout}
        applicationStore={_initStore({ caller: 'ProgrammesList' })}
        createMenuData={store => ({ selectedId: 'programmesList', ...getMenuData(store) })}
      />
      <RouteWrapper
        exact
        path="/student/kurser/sokkurs"
        createBreadcrumbs={() => ({ include: 'directory' })}
        component={CourseSearch}
        layout={PageLayout}
        applicationStore={_initStore({ caller: 'CourseSearch' })}
        createMenuData={store => ({ selectedId: 'searchAllCourses', ...getMenuData(store) })}
      />
      <RouteWrapper
        exact
        path="/student/kurser/org"
        createBreadcrumbs={() => ({ include: 'directory' })}
        component={DepartmentsList}
        layout={PageLayout}
        applicationStore={_initStore({ caller: 'DepartmentsList', serverSideApplicationStore })}
        createMenuData={store => ({
          selectedId: 'departmentsList',
          ...getMenuData(store),
        })}
      />
      <RouteWrapper
        exact
        path="/student/kurser/org/:departmentCode"
        createBreadcrumbs={() => ({ include: 'directory' })}
        component={DepartmentCourses}
        layout={PageLayout}
        applicationStore={_initStore({ caller: 'DepartmentCourses' })}
        createMenuData={store => ({ selectedId: 'courses', ...getDepartmentMenuData(store) })}
      />
      <RouteWrapper
        exact
        path="/student/kurser/program/:programmeCode"
        createBreadcrumbs={() => ({ include: 'directory' })}
        component={Programme}
        layout={PageLayout}
        applicationStore={_initStore({ caller: 'Programme' })}
        createMenuData={store => ({ selectedId: 'studyYears', ...getProgrammeMenuData(store) })}
      />
      <RouteWrapper
        exact
        path="/utbildning/forskarutbildning/kurser/avdelning"
        createBreadcrumbs={store => ({
          include: 'university',
          items: getThirdCycleBreadcrumbs(store),
        })}
        component={ThirdCycleDepartmentsList}
        layout={PageLayout}
        applicationStore={_initStore({ caller: 'ThirdCycleDepartmentsList' })}
        createMenuData={store => ({
          selectedId: 'thirdCycleDepartmentsList',
          ...getThirdCycleMenuData(store),
        })}
      />
      <RouteWrapper
        exact
        path="/utbildning/forskarutbildning/kurser/org/:departmentCode"
        createBreadcrumbs={store => ({
          include: 'university',
          items: getThirdCycleBreadcrumbs(store),
        })}
        component={DepartmentCourses}
        layout={PageLayout}
        applicationStore={_initStore({ caller: 'DepartmentCourses' })}
        createMenuData={store => ({
          selectedId: 'courses',
          ...getThirdCycleDepartmentMenuData(store),
        })}
      />
      <RouteWrapper
        exact
        path="/utbildning/forskarutbildning/kurser/sok"
        createBreadcrumbs={store => ({
          include: 'university',
          items: getThirdCycleBreadcrumbs(store),
        })}
        component={CourseSearchResearch}
        layout={PageLayout}
        applicationStore={_initStore({ storeId: 'searchCourses' })}
        createMenuData={store => ({
          selectedId: 'searchThirdCycleCourses',
          ...getThirdCycleMenuData(store),
        })}
      />
      <RouteWrapper
        exact
        path="/student/kurser/program/:programmeCode/:term/mal"
        createBreadcrumbs={() => ({ include: 'directory' })}
        component={Objectives}
        layout={PageLayout}
        applicationStore={_initStore({ storeId: 'objective' })}
        createMenuData={store => ({
          selectedId: 'objectives',
          ...getStudyProgrammeMenuData(store),
        })}
      />
      <RouteWrapper
        exact
        path="/student/kurser/program/:programmeCode/:term/omfattning"
        createBreadcrumbs={() => ({ include: 'directory' })}
        component={Extent}
        layout={PageLayout}
        applicationStore={_initStore({ storeId: 'extent' })}
        createMenuData={store => ({
          selectedId: 'extent',
          ...getStudyProgrammeMenuData(store),
        })}
      />
      <RouteWrapper
        exact
        path="/student/kurser/program/:programmeCode/:term/behorighet"
        createBreadcrumbs={() => ({ include: 'directory' })}
        component={Eligibility}
        layout={PageLayout}
        applicationStore={_initStore({ storeId: 'eligibility' })}
        createMenuData={store => ({
          selectedId: 'eligibility',
          ...getStudyProgrammeMenuData(store),
        })}
      />
      <RouteWrapper
        exact
        path="/student/kurser/program/:programmeCode/:term/genomforande"
        createBreadcrumbs={() => ({ include: 'directory' })}
        component={Implementation}
        layout={PageLayout}
        applicationStore={_initStore({ storeId: 'implementation' })}
        createMenuData={store => ({
          selectedId: 'implementation',
          ...getStudyProgrammeMenuData(store),
        })}
      />
      <RouteWrapper
        exact
        path="/student/kurser/program/:programmeCode/:term/kurslista"
        createBreadcrumbs={() => ({ include: 'directory' })}
        component={Appendix1}
        layout={PageLayout}
        applicationStore={_initStore({ storeId: 'appendix1' })}
        createMenuData={store => ({
          selectedId: 'appendix1',
          ...getStudyProgrammeMenuData(store),
        })}
      />
      <RouteWrapper
        exact
        path="/student/kurser/program/:programmeCode/:term/inriktningar"
        createBreadcrumbs={() => ({ include: 'directory' })}
        component={Appendix2}
        layout={PageLayout}
        applicationStore={_initStore({ storeId: 'appendix2' })}
        createMenuData={store => ({
          selectedId: 'appendix2',
          ...getStudyProgrammeMenuData(store),
        })}
      />
      <RouteWrapper
        exact
        path="/student/kurser/program/:programmeCode/:term/:studyYear"
        createBreadcrumbs={() => ({ include: 'directory' })}
        component={Curriculum}
        layout={PageLayout}
        applicationStore={_initStore({ storeId: 'curriculum' })}
        createMenuData={store => ({
          selectedId: `year-${store.studyYear}`,
          ...getCurriculumMenuData(store),
        })}
      />
      <RouteWrapper
        exact
        path="/student/kurser/lit/:term/:school"
        createBreadcrumbs={store => ({
          include: 'student',
          items: getLiteratureListBreadcrumbs(store),
        })}
        component={LiteratureList}
        layout={PageLayout}
        applicationStore={_initStore({ storeId: 'literatureList' })}
        createMenuData={store => ({
          selectedId: store.selectedSchoolCode,
          ...getLiteratureList(store),
        })}
      />
    </Switch>
  )
}
