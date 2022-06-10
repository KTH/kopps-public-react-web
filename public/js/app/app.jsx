/* eslint-disable react/jsx-no-bind */
/* eslint no-use-before-define: ["error", "nofunc"] */

// @ts-check

import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { uncompressStoreInPlaceFromDocument } from './mobx'
import createApplicationStore from './stores/createApplicationStore'

import '../../css/node-web.scss'

import Appendix1 from './pages/Appendix1'
import Appendix2 from './pages/Appendix2'
import CourseSearch from './pages/CourseSearch'
import CourseSearchThirdCycleStudy from './pages/CourseSearchThirdCycleStudy'
import Curriculum from './pages/Curriculum'
import DepartmentCourses from './pages/DepartmentCourses'
import DepartmentsList from './pages/DepartmentsList'
import Eligibility from './pages/Eligibility'
import Extent from './pages/Extent'
import Implementation from './pages/Implementation'
import LiteratureList from './pages/LiteratureList'
import Objectives from './pages/Objectives'
import Programme from './pages/Programme'
import ProgrammesList from './pages/ProgrammesList'
import PageLayout from './layout/PageLayout'
import ElementWrapper from './components/ElementWrapper'
import StudyHandbook from './pages/StudyHandbook'
import ThirdCycleDepartmentsList from './pages/ThirdCycleDepartmentsList'
import ProgramSyllabusExport from './pages/ProgramSyllabusExport'

import getCurriculumMenuData from './config/curriculumMenuData'
import getDepartmentMenuData from './config/departmentMenuData'
import getLiteratureListBreadcrumbs from './config/literatureListBreadcrumbs'
import getLiteratureList from './config/literatureListMenuData'
import getMenuData from './config/menuData'
import getProgrammeMenuData from './config/programmeMenuData'
import getStudyProgrammeMenuData from './config/studyProgrammeMenuData'
import getThirdCycleBreadcrumbs from './config/thirdCycleBreadcrumbs'
import getThirdCycleDepartmentMenuData from './config/thirdCycleDepartmentMenuData'
import getThirdCycleMenuData from './config/thirdCycleMenuData'

export default appFactory

_renderOnClientSide()

function _initStore(optionalStoreProps = {}) {
  // Server side application store, most likely created in controller
  // eslint-disable-next-line no-unused-vars
  const { caller = '', storeId = '', serverSideApplicationStore = null } = optionalStoreProps

  if (serverSideApplicationStore) return serverSideApplicationStore

  // Client side application store
  // console.debug(
  //   `Creating client-side ${storeId ? `with ${storeId}` : 'with default'} applicationStore ${
  //     caller ? `and a caller function is ${caller}` : ''
  //   } `
  // )
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
  ReactDOM.render(app, domElement)
}

function appFactory(serverSideApplicationStore = null) {
  return (
    <Routes>
      <Route
        key="shb"
        exact
        path="/student/program/shb"
        element={
          <ElementWrapper
            component={StudyHandbook}
            createBreadcrumbs={() => ({ include: 'directory' })}
            layout={PageLayout}
            applicationStore={_initStore({ caller: 'StudyHandbook' })}
            createMenuData={store => ({ selectedId: 'shb', ...getMenuData(store) })}
          />
        }
      />
      <Route
        key="programmes-list"
        exact
        path="/student/kurser/kurser-inom-program"
        element={
          <ElementWrapper
            component={ProgrammesList}
            createBreadcrumbs={() => ({ include: 'directory' })}
            layout={PageLayout}
            applicationStore={_initStore({ caller: 'ProgrammesList' })}
            createMenuData={store => ({ selectedId: 'programmesList', ...getMenuData(store) })}
          />
        }
      />
      <Route
        key="search-course"
        exact
        path="/student/kurser/sokkurs"
        element={
          <ElementWrapper
            createBreadcrumbs={() => ({ include: 'directory' })}
            component={CourseSearch}
            layout={PageLayout}
            applicationStore={_initStore({ caller: 'CourseSearch' })}
            createMenuData={store => ({ selectedId: 'searchAllCourses', ...getMenuData(store) })}
          />
        }
      />
      <Route
        key="departments-list"
        exact
        path="/student/kurser/org"
        element={
          <ElementWrapper
            createBreadcrumbs={() => ({ include: 'directory' })}
            component={DepartmentsList}
            layout={PageLayout}
            applicationStore={_initStore({ caller: 'DepartmentsList', serverSideApplicationStore })}
            createMenuData={store => ({
              selectedId: 'departmentsList',
              ...getMenuData(store),
            })}
          />
        }
      />
      <Route
        key="department-courses"
        exact
        path="/student/kurser/org/:departmentCode"
        element={
          <ElementWrapper
            createBreadcrumbs={() => ({ include: 'directory' })}
            component={DepartmentCourses}
            layout={PageLayout}
            applicationStore={_initStore({ caller: 'DepartmentCourses' })}
            createMenuData={store => ({ selectedId: 'courses', ...getDepartmentMenuData(store) })}
          />
        }
      />
      <Route
        key="programme-overview"
        exact
        path="/student/kurser/program/:programmeCode"
        element={
          <ElementWrapper
            createBreadcrumbs={() => ({ include: 'directory' })}
            component={Programme}
            layout={PageLayout}
            applicationStore={_initStore({ caller: 'Programme' })}
            createMenuData={store => ({ selectedId: 'studyYears', ...getProgrammeMenuData(store) })}
          />
        }
      />
      <Route
        key="third-cycle-departments-list"
        exact
        path="/utbildning/forskarutbildning/kurser/avdelning"
        element={
          <ElementWrapper
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
        }
      />
      <Route
        key="third-cycle-department-courses"
        exact
        path="/utbildning/forskarutbildning/kurser/org/:departmentCode"
        element={
          <ElementWrapper
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
        }
      />
      <Route
        key="third-cycle-search-courses"
        exact
        path="/utbildning/forskarutbildning/kurser/sok"
        element={
          <ElementWrapper
            createBreadcrumbs={store => ({
              include: 'university',
              items: getThirdCycleBreadcrumbs(store),
            })}
            component={CourseSearchThirdCycleStudy}
            layout={PageLayout}
            applicationStore={_initStore({ storeId: 'searchCourses' })}
            createMenuData={store => ({
              selectedId: 'searchThirdCycleCourses',
              ...getThirdCycleMenuData(store),
            })}
          />
        }
      />
      <Route
        key="programme-objectives"
        exact
        path="/student/kurser/program/:programmeCode/:term/mal"
        element={
          <ElementWrapper
            createBreadcrumbs={() => ({ include: 'directory' })}
            component={Objectives}
            layout={PageLayout}
            applicationStore={_initStore({ storeId: 'objective' })}
            createMenuData={store => ({
              selectedId: 'objectives',
              ...getStudyProgrammeMenuData(store),
            })}
          />
        }
      />
      <Route
        key="programme-extent"
        exact
        path="/student/kurser/program/:programmeCode/:term/omfattning"
        element={
          <ElementWrapper
            createBreadcrumbs={() => ({ include: 'directory' })}
            component={Extent}
            layout={PageLayout}
            applicationStore={_initStore({ storeId: 'extent' })}
            createMenuData={store => ({
              selectedId: 'extent',
              ...getStudyProgrammeMenuData(store),
            })}
          />
        }
      />
      <Route
        key="programme-eligibility"
        exact
        path="/student/kurser/program/:programmeCode/:term/behorighet"
        element={
          <ElementWrapper
            createBreadcrumbs={() => ({ include: 'directory' })}
            component={Eligibility}
            layout={PageLayout}
            applicationStore={_initStore({ storeId: 'eligibility' })}
            createMenuData={store => ({
              selectedId: 'eligibility',
              ...getStudyProgrammeMenuData(store),
            })}
          />
        }
      />
      <Route
        key="programme-implementation"
        exact
        path="/student/kurser/program/:programmeCode/:term/genomforande"
        element={
          <ElementWrapper
            createBreadcrumbs={() => ({ include: 'directory' })}
            component={Implementation}
            layout={PageLayout}
            applicationStore={_initStore({ storeId: 'implementation' })}
            createMenuData={store => ({
              selectedId: 'implementation',
              ...getStudyProgrammeMenuData(store),
            })}
          />
        }
      />
      <Route
        key="programme-appendix1"
        exact
        path="/student/kurser/program/:programmeCode/:term/kurslista"
        element={
          <ElementWrapper
            createBreadcrumbs={() => ({ include: 'directory' })}
            component={Appendix1}
            layout={PageLayout}
            applicationStore={_initStore({ storeId: 'appendix1', serverSideApplicationStore })}
            createMenuData={store => ({
              selectedId: 'appendix1',
              ...getStudyProgrammeMenuData(store),
            })}
          />
        }
      />
      <Route
        key="programme-appendix2"
        exact
        path="/student/kurser/program/:programmeCode/:term/inriktningar"
        element={
          <ElementWrapper
            createBreadcrumbs={() => ({ include: 'directory' })}
            component={Appendix2}
            layout={PageLayout}
            applicationStore={_initStore({ storeId: 'appendix2' })}
            createMenuData={store => ({
              selectedId: 'appendix2',
              ...getStudyProgrammeMenuData(store),
            })}
          />
        }
      />
      <Route
        key="programme-curriculum"
        exact
        path="/student/kurser/program/:programmeCode/:term/:studyYear"
        element={
          <ElementWrapper
            createBreadcrumbs={() => ({ include: 'directory' })}
            component={Curriculum}
            layout={PageLayout}
            applicationStore={_initStore({ storeId: 'curriculum' })}
            createMenuData={store => ({
              selectedId: `year-${store.studyYear}`,
              ...getCurriculumMenuData(store),
            })}
          />
        }
      />
      <Route
        key="literature-list"
        exact
        path="/student/kurser/lit/:term/:school"
        element={
          <ElementWrapper
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
        }
      />
      <Route
        key="programme-pdf"
        path="/student/kurser/program/:programmeCode/:term/pdf"
        element={<ProgramSyllabusExport applicationStore={_initStore({ storeId: 'pdfStore' })} />}
      />
    </Routes>
  )
}
