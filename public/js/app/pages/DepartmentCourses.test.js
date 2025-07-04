/* eslint-disable react/prop-types */

import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { toHaveNoViolations } from 'jest-axe'
import { axe } from './test-config/axeWithoutLandmarkUniqueRule'
import { StaticRouter } from 'react-router-dom/server'
import { MobxStoreProvider } from '../mobx'

import DepartmentCourses from './DepartmentCourses'
import ElementWrapper from '../components/ElementWrapper'
import PageLayout from '../layout/PageLayout'

import createApplicationStore from '../stores/createApplicationStore'
import getMenuDepartmentData from '../config/departmentMenuData'

import commonSettings from '../config/mocks/mockCommonSettings'

expect.extend(toHaveNoViolations)

const applicationStore = createApplicationStore()

const testDepartmentName = {
  sv: 'ABE/Arkitektur, Fex övr utbildning',
  en: 'ABE/Architecture',
}
const testDepartmentCourses = {
  sv: [
    {
      code: 'AD12DA',
      title: '2DAutoCAD Fokus på ritningen som kommunikationsredskap',
      info: '<p>Kursens &#246;vergripande m&#229;l &#228;r att ge grundl&#228;ggande kunskap om Autocad som ritverktyg och om hur programmet fungerar som hj&#228;lpmedel f&#246;r att hantera olika slags arkitekturpojekt.</p><p>Efter genomf&#246;rd kurs skall studententen p&#229; egen hand kunna rita och utveckla arkitekturprojekt med hj&#228;lp av Autocad.</p>',
      credits: '6,0',
      creditUnitLabel: 'Högskolepoäng',
      creditUnitAbbr: 'hp',
      level: 'Grundnivå',
      state: 'CANCELLED',
      last_examination_semester: '20221',
    },
  ],
  en: [
    {
      code: 'AD12DA',
      title: '2DAutoCAD Focus on the Drawing as a Communicative Tool',
      info: '<p>The overall objective of the course is to give a basic knowledge of Autocad as a tool for drawing and of how the program can be used as a tool to handle different types of architecture projects.</p><p>On completing the course, the student shall be able to independently draw and develop architecture projects by using Autocad.</p>',
      credits: '6.0',
      creditUnitLabel: 'Credits',
      creditUnitAbbr: 'hp',
      level: 'First cycle',
      state: 'CANCELLED',
      last_examination_semester: '20221',
    },
  ],
}

const WrapperDepartmentCourses = ({ lang }) => {
  applicationStore.setLanguage(lang)
  applicationStore.setBrowserConfig(commonSettings)

  const updatedApplicationStore = {
    ...applicationStore,
  }
  const initApplicationStoreCallback = () => updatedApplicationStore
  return (
    <StaticRouter>
      <ElementWrapper
        exact
        path="/student/kurser/org/ADD"
        component={DepartmentCourses}
        layout={PageLayout}
        initApplicationStoreCallback={initApplicationStoreCallback}
        createMenuData={store => ({ selectedId: 'courses', ...getMenuDepartmentData(store) })}
      />
    </StaticRouter>
  )
}

const DepartmentCoursesWithLayout = ({ lang }) => {
  applicationStore.setLanguage(lang)
  applicationStore.setBrowserConfig(commonSettings)
  applicationStore.setDepartmentName(testDepartmentName[lang])
  applicationStore.setDepartmentCourses(testDepartmentCourses[lang])
  const departmentMenuData = getMenuDepartmentData(applicationStore)

  const updatedApplicationStore = {
    ...applicationStore,
  }
  return (
    <StaticRouter>
      <MobxStoreProvider initCallback={() => updatedApplicationStore}>
        <PageLayout menuData={{ selectedId: 'courses', ...departmentMenuData }}>
          <DepartmentCourses />
        </PageLayout>
      </MobxStoreProvider>
    </StaticRouter>
  )
}

describe('Render component DepartmentCourses within RouterWrapper', () => {
  test('simple render', done => {
    render(<WrapperDepartmentCourses lang="en" />)
    done()
  })
})

// TODO Fis this test
describe.skip('Render component DepartmentCourses within Layout', () => {
  test('verify that page is accessible', async () => {
    const { container } = render(<DepartmentCoursesWithLayout lang="en" />)
    expect(await axe(container)).toHaveNoViolations()
  })
  test('get page header in English', () => {
    render(<DepartmentCoursesWithLayout lang="en" />)
    const h1Header = screen.getByRole('heading', { level: 1 })
    expect(h1Header).toHaveTextContent('Courses')
  })
  test('get page header in Swedish', () => {
    render(<DepartmentCoursesWithLayout lang="sv" />)
    const h1Header = screen.getByRole('heading', { level: 1 })
    expect(h1Header).toHaveTextContent('Kurser')
  })
  test('match to snapshot in English', done => {
    const { asFragment } = render(<DepartmentCoursesWithLayout lang="en" />)
    expect(asFragment()).toMatchSnapshot()
    done()
  })
  test('match to snapshot in Swedish', done => {
    const { asFragment } = render(<DepartmentCoursesWithLayout lang="sv" />)
    expect(asFragment()).toMatchSnapshot()
    done()
  })
})

describe.skip('Render component DepartmentCourses and check its menu, content and links', () => {
  test('check all links on the page in English', () => {
    render(<DepartmentCoursesWithLayout lang="en" />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBe(6)
    // Menu links
    expect(links[0]).toHaveTextContent('Course and programme directory')
    expect(links[0].href).toStrictEqual('http://localhost/student/kurser?l=en')
    // Main content links
    expect(links[2]).toHaveTextContent('AD12DA')
    expect(links[2].href).toStrictEqual('http://localhost/student/kurser/kurs/AD12DA?l=en')
    expect(links[3]).toHaveTextContent('2DAutoCAD Focus on the Drawing as a Communicative Tool')
    expect(links[3].href).toStrictEqual('http://localhost/student/kurser/kurs/AD12DA?l=en')
    // Footer links
    expect(links[4]).toHaveTextContent('Central study counseling')
    expect(links[4].href).toStrictEqual('https://www.kth.se/en/studies/master/general-study-counselling-1.621634')
    expect(links[5]).toHaveTextContent('kopps@kth.se')
    expect(links[5].href).toStrictEqual('mailto:kopps@kth.se')
  })
  test('check all links on the page in Swedish', () => {
    render(<DepartmentCoursesWithLayout lang="sv" />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBe(6)
    // Menu links
    expect(links[0]).toHaveTextContent('Kurs- och programkatalogen')
    expect(links[0].href).toStrictEqual('http://localhost/student/kurser')
    // Main content links
    expect(links[2]).toHaveTextContent('AD12DA')
    expect(links[2].href).toStrictEqual('http://localhost/student/kurser/kurs/AD12DA')
    expect(links[3]).toHaveTextContent('2DAutoCAD Fokus på ritningen som kommunikationsredskap')
    expect(links[3].href).toStrictEqual('http://localhost/student/kurser/kurs/AD12DA')
    // Footer links
    expect(links[4]).toHaveTextContent('Central studievägledning')
    expect(links[4].href).toStrictEqual('https://www.kth.se/studievagledning')
    expect(links[5]).toHaveTextContent('kopps@kth.se')
    expect(links[5].href).toStrictEqual('mailto:kopps@kth.se')
  })
})
