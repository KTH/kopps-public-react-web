/* eslint-disable react/prop-types */

import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'
import { StaticRouter } from 'react-router-dom/server'
import { MobxStoreProvider } from '../mobx'

import DepartmentCourses from './DepartmentCourses'
import ElementWrapper from '../components/ElementWrapper'
import PageLayout from '../layout/PageLayout'

import createApplicationStore from '../stores/createApplicationStore'
import getThirdCycleBreadcrumbs from '../config/thirdCycleBreadcrumbs'
import getThirdCycleDepartmentMenuData from '../config/thirdCycleDepartmentMenuData'

import commonSettings from '../config/mocks/mockCommonSettings'

expect.extend(toHaveNoViolations)

const applicationStore = createApplicationStore()

const testDepartmentName = {
  sv: 'ABE/Betongbyggnad',
  en: 'ABE/Concrete Structures',
}
const testDepartmentCourses = {
  sv: [
    {
      code: 'FAF3115',
      title: 'Betong och andra cementbaserade material',
      info: '',
      credits: '7,5',
      creditUnitLabel: 'Högskolepoäng',
      creditUnitAbbr: 'hp',
      level: 'Forskarnivå',
      state: 'ESTABLISHED',
    },
    {
      code: 'F1C5031',
      title: 'Dimensioneringsmetoder för armerade betongkonstruktioner',
      info: '',
      credits: '7,5',
      creditUnitLabel: 'Högskolepoäng',
      creditUnitAbbr: 'hp',
      level: 'Forskarnivå',
      state: 'CANCELLED',
      last_examination_semester: '20222',
    },
  ],
  en: [
    {
      code: 'FAF3115',
      title: 'Concrete and Other Cement Based Materials',
      info: '',
      credits: '7.5',
      creditUnitLabel: 'Credits',
      creditUnitAbbr: 'hp',
      level: 'Third cycle',
      state: 'ESTABLISHED',
    },
    {
      code: 'F1C5031',
      title: 'Design Methods for Reinforced Concrete Structures',
      info: '',
      credits: '7.5',
      creditUnitLabel: 'Credits',
      creditUnitAbbr: 'hp',
      level: 'Third cycle',
      state: 'CANCELLED',
      last_examination_semester: '20222',
    },
  ],
}

const WrapperDepartmentCourses = ({ lang }) => {
  applicationStore.setLanguage(lang)
  applicationStore.setBrowserConfig(commonSettings)
  applicationStore.setDepartmentName(testDepartmentName[lang])
  const updatedApplicationStore = {
    ...applicationStore,
  }
  return (
    <StaticRouter>
      <ElementWrapper
        exact
        path="/utbildning/forskarutbildning/kurser/org/AFF"
        createBreadcrumbs={store => ({
          include: 'university',
          items: getThirdCycleBreadcrumbs(store),
        })}
        applicationStore={updatedApplicationStore}
        component={DepartmentCourses}
        layout={PageLayout}
        createMenuData={store => ({
          selectedId: 'courses',
          ...getThirdCycleDepartmentMenuData(store),
        })}
      />
    </StaticRouter>
  )
}

const DepartmentCoursesWithLayout = ({ lang }) => {
  applicationStore.setLanguage(lang)
  applicationStore.setBrowserConfig(commonSettings)
  applicationStore.setDepartmentName(testDepartmentName[lang])
  applicationStore.setDepartmentCourses(testDepartmentCourses[lang])
  const departmentMenuData = getThirdCycleDepartmentMenuData(applicationStore)
  const breadcrumbsItems = getThirdCycleBreadcrumbs(applicationStore)

  const updatedApplicationStore = {
    ...applicationStore,
  }
  return (
    <StaticRouter>
      <MobxStoreProvider initCallback={() => updatedApplicationStore}>
        <PageLayout
          breadcrumbs={{
            include: 'university',
            items: breadcrumbsItems,
          }}
          menuData={{
            selectedId: 'courses',
            ...departmentMenuData,
          }}
        >
          <DepartmentCourses />
        </PageLayout>
      </MobxStoreProvider>
    </StaticRouter>
  )
}

describe('Render component DepartmentCourses within RouterWrapper for third cycle studies', () => {
  test('simple render', done => {
    render(<WrapperDepartmentCourses lang="en" />)
    done()
  })
})

describe('Render component DepartmentCourses within Layout for third cycle studies', () => {
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

describe('Render component DepartmentCourses and check its menu, content and links for third cycle studies', () => {
  test('check all links on the page in English', () => {
    render(<DepartmentCoursesWithLayout lang="en" />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBe(7)
    // Menu links
    expect(links[0]).toHaveTextContent('Courses')
    expect(links[0].href).toStrictEqual('http://localhost/utbildning/forskarutbildning/kurser?l=en')
    // Main content links
    expect(links[1]).toHaveTextContent('F1C5031')
    expect(links[1].href).toStrictEqual('http://localhost/student/kurser/kurs/F1C5031?l=en')
    expect(links[2]).toHaveTextContent('Design Methods for Reinforced Concrete Structures')
    expect(links[2].href).toStrictEqual('http://localhost/student/kurser/kurs/F1C5031?l=en')

    expect(links[3]).toHaveTextContent('FAF3115')
    expect(links[3].href).toStrictEqual('http://localhost/student/kurser/kurs/FAF3115?l=en')
    expect(links[4]).toHaveTextContent('Concrete and Other Cement Based Materials')
    expect(links[4].href).toStrictEqual('http://localhost/student/kurser/kurs/FAF3115?l=en')
    // Footer links
    expect(links[5]).toHaveTextContent('Central study counseling')
    expect(links[5].href).toStrictEqual('https://www.kth.se/en/studies/master/general-study-counselling-1.621634')
    expect(links[6]).toHaveTextContent('kopps@kth.se')
    expect(links[6].href).toStrictEqual('mailto:kopps@kth.se')
  })
  test('check all links on the page in Swedish', () => {
    render(<DepartmentCoursesWithLayout lang="sv" />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBe(7)
    // Menu links
    expect(links[0]).toHaveTextContent('Kurser')
    expect(links[0].href).toStrictEqual('http://localhost/utbildning/forskarutbildning/kurser')
    // Main content links
    expect(links[1]).toHaveTextContent('F1C5031')
    expect(links[1].href).toStrictEqual('http://localhost/student/kurser/kurs/F1C5031')
    expect(links[2]).toHaveTextContent('Dimensioneringsmetoder för armerade betongkonstruktioner')
    expect(links[2].href).toStrictEqual('http://localhost/student/kurser/kurs/F1C5031')

    expect(links[3]).toHaveTextContent('FAF3115')
    expect(links[3].href).toStrictEqual('http://localhost/student/kurser/kurs/FAF3115')
    expect(links[4]).toHaveTextContent('Betong och andra cementbaserade material')
    expect(links[4].href).toStrictEqual('http://localhost/student/kurser/kurs/FAF3115')
    // Footer links
    expect(links[5]).toHaveTextContent('Central studievägledning')
    expect(links[5].href).toStrictEqual('https://www.kth.se/studievagledning')
    expect(links[6]).toHaveTextContent('kopps@kth.se')
    expect(links[6].href).toStrictEqual('mailto:kopps@kth.se')
  })
})
