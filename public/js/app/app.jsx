/* eslint-disable react/jsx-no-bind */
/* eslint no-use-before-define: ["error", "nofunc"] */

import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { uncompressStoreInPlaceFromDocument } from './mobx'
import createApplicationStore from './stores/createApplicationStore'

import '../../css/node-web.scss'

import Appendix1 from './pages/Appendix1'
import Appendix2 from './pages/Appendix2'
import SearchLandingPage from './pages/SearchLandingPage'
import Curriculum from './pages/Curriculum'
import DepartmentCourses from './pages/DepartmentCourses'
import DepartmentsList from './pages/DepartmentsList'
import Eligibility from './pages/Eligibility'
import Extent from './pages/Extent'
import Implementation from './pages/Implementation'
import Objectives from './pages/Objectives'
import Programme from './pages/Programme'
import ProgrammesList from './pages/ProgrammesList'
import PageLayout from './layout/PageLayout'
import ElementWrapper from './components/ElementWrapper'
import SearchPageWrapper from './components/SearchPageWrapper'
import StudyHandbook from './pages/StudyHandbook'
import ThirdCycleDepartmentsList from './pages/ThirdCycleDepartmentsList'
import ProgramSyllabusExport from './pages/ProgramSyllabusExport'
import SearchPage from './pages/SearchPage'

import getCurriculumMenuData from './config/curriculumMenuData'
import getDepartmentMenuData from './config/departmentMenuData'
import getMenuData from './config/menuData'
import getProgrammeMenuData from './config/programmeMenuData'
import getStudyProgrammeMenuData from './config/studyProgrammeMenuData'
import getThirdCycleDepartmentMenuData from './config/thirdCycleDepartmentMenuData'
import getThirdCycleMenuData from './config/thirdCycleMenuData'
import { SEARCH_MODES } from './pages/types/searchPageTypes'

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
  const root = createRoot(domElement)
  root.render(app)
}

function appFactory(serverSideApplicationStore = null) {
  const sharedInitApplicationStoreCallback = {
    SearchPage: () => _initStore({ storeId: 'SearchPage' }),
  }
  return (
    <Routes>
      <Route
        key="shb"
        exact
        path="/student/program/shb"
        element={
          <ElementWrapper
            component={StudyHandbook}
            layout={PageLayout}
            initApplicationStoreCallback={() => _initStore({ caller: 'StudyHandbook' })}
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
            layout={PageLayout}
            initApplicationStoreCallback={() => _initStore({ caller: 'ProgrammesList' })}
            createMenuData={store => ({ selectedId: 'programmesList', ...getMenuData(store) })}
          />
        }
      />
      <Route
        key="search-page"
        exact
        path="/student/kurser/sokkurs"
        element={
          <ElementWrapper
            component={SearchLandingPage}
            layout={PageLayout}
            initApplicationStoreCallback={sharedInitApplicationStoreCallback['SearchPage']}
            createMenuData={store => ({ selectedId: 'searchAllCourses', ...getMenuData(store) })}
          />
        }
      />
      <Route
        key="search-page-result"
        exact
        path="/student/kurser/sokkurs/resultat"
        element={
          <SearchPageWrapper
            component={SearchPage}
            initApplicationStoreCallback={sharedInitApplicationStoreCallback['SearchPage']}
          />
        }
      />
      <Route
        key="third-cycle-search-courses"
        exact
        path="/utbildning/forskarutbildning/kurser/sok"
        element={
          <ElementWrapper
            component={SearchLandingPage}
            props={{ searchMode: SEARCH_MODES.thirdCycleCourses }}
            layout={PageLayout}
            initApplicationStoreCallback={sharedInitApplicationStoreCallback['SearchPage']}
            createMenuData={store => ({
              selectedId: 'searchThirdCycleCourses',
              ...getThirdCycleMenuData(store),
            })}
          />
        }
      />
      <Route
        key="third-cycle-search-courses-result"
        exact
        path="/utbildning/forskarutbildning/kurser/sok/resultat"
        element={
          <SearchPageWrapper
            component={SearchPage}
            props={{ searchMode: SEARCH_MODES.thirdCycleCourses }}
            initApplicationStoreCallback={sharedInitApplicationStoreCallback['SearchPage']}
          />
        }
      />
      <Route
        key="departments-list"
        exact
        path="/student/kurser/org"
        element={
          <ElementWrapper
            component={DepartmentsList}
            layout={PageLayout}
            initApplicationStoreCallback={() => _initStore({ caller: 'DepartmentsList', serverSideApplicationStore })}
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
            component={DepartmentCourses}
            layout={PageLayout}
            initApplicationStoreCallback={() => _initStore({ caller: 'DepartmentCourses' })}
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
            component={Programme}
            layout={PageLayout}
            initApplicationStoreCallback={() => _initStore({ caller: 'Programme' })}
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
            component={ThirdCycleDepartmentsList}
            layout={PageLayout}
            initApplicationStoreCallback={() => _initStore({ caller: 'ThirdCycleDepartmentsList' })}
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
            component={DepartmentCourses}
            layout={PageLayout}
            initApplicationStoreCallback={() => _initStore({ caller: 'DepartmentCourses' })}
            createMenuData={store => ({
              selectedId: 'courses',
              ...getThirdCycleDepartmentMenuData(store),
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
            component={Objectives}
            layout={PageLayout}
            initApplicationStoreCallback={() => _initStore({ storeId: 'objective' })}
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
            component={Extent}
            layout={PageLayout}
            initApplicationStoreCallback={() => _initStore({ storeId: 'extent' })}
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
            component={Eligibility}
            layout={PageLayout}
            initApplicationStoreCallback={() => _initStore({ storeId: 'eligibility' })}
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
            component={Implementation}
            layout={PageLayout}
            initApplicationStoreCallback={() => _initStore({ storeId: 'implementation' })}
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
            component={Appendix1}
            layout={PageLayout}
            initApplicationStoreCallback={() => _initStore({ storeId: 'appendix1', serverSideApplicationStore })}
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
            component={Appendix2}
            layout={PageLayout}
            initApplicationStoreCallback={() => _initStore({ storeId: 'appendix2' })}
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
            component={Curriculum}
            layout={PageLayout}
            initApplicationStoreCallback={() => _initStore({ storeId: 'curriculum' })}
            createMenuData={store => ({
              selectedId: `year-${store.studyYear}`,
              ...getCurriculumMenuData(store),
            })}
          />
        }
      />
      <Route
        key="programme-pdf"
        path="/student/kurser/program/:programmeCodeAndTertm.pdf"
        element={<ProgramSyllabusExport initApplicationStoreCallback={() => _initStore({ storeId: 'pdfStore' })} />}
      />
    </Routes>
  )
}
