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
      kod: 'FAF3115',
      benamning: 'Betong och andra cementbaserade material',
      omfattning: '7,5 hp',
      level: 'Forskarnivå',
    },
    {
      kod: 'F1C5031',
      benamning: 'Dimensioneringsmetoder för armerade betongkonstruktioner',
      omfattning: '7,5 hp',
      level: 'Forskarnivå',
    },
  ],
  en: [
    {
      kod: 'FAF3115',
      benamning: 'Concrete and Other Cement Based Materials',
      omfattning: '7.5 hp',
      level: 'Third cycle',
    },
    {
      kod: 'F1C5031',
      benamning: 'Design Methods for Reinforced Concrete Structures',
      omfattning: '7.5 hp',
      level: 'Third cycle',
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
  const initApplicationStoreCallback = () => updatedApplicationStore
  return (
    <StaticRouter>
      <ElementWrapper
        exact
        path="/utbildning/forskarutbildning/kurser/org/AFF"
        initApplicationStoreCallback={initApplicationStoreCallback}
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

  const updatedApplicationStore = {
    ...applicationStore,
  }
  return (
    <StaticRouter>
      <MobxStoreProvider initCallback={() => updatedApplicationStore}>
        <PageLayout
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

describe.skip('Render component DepartmentCourses within Layout for third cycle studies', () => {
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

// TODO, put this back in
describe.skip('Render component DepartmentCourses and check its menu, content and links for third cycle studies', () => {
  test('check all links on the page in English', () => {
    render(<DepartmentCoursesWithLayout lang="en" />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBe(8)
    // Menu links
    expect(links[0]).toHaveTextContent('Courses')
    expect(links[0].href).toStrictEqual('http://localhost/utbildning/forskarutbildning/kurser?l=en')
    // Main content links
    expect(links[2]).toHaveTextContent('F1C5031')
    expect(links[2].href).toStrictEqual('http://localhost/student/kurser/kurs/F1C5031?l=en')
    expect(links[3]).toHaveTextContent('Design Methods for Reinforced Concrete Structures')
    expect(links[3].href).toStrictEqual('http://localhost/student/kurser/kurs/F1C5031?l=en')

    expect(links[4]).toHaveTextContent('FAF3115')
    expect(links[4].href).toStrictEqual('http://localhost/student/kurser/kurs/FAF3115?l=en')
    expect(links[5]).toHaveTextContent('Concrete and Other Cement Based Materials')
    expect(links[5].href).toStrictEqual('http://localhost/student/kurser/kurs/FAF3115?l=en')
    // Footer links
    expect(links[6]).toHaveTextContent('Central study counseling')
    expect(links[6].href).toStrictEqual('https://www.kth.se/en/studies/master/general-study-counselling-1.621634')
    expect(links[7]).toHaveTextContent('kopps@kth.se')
    expect(links[7].href).toStrictEqual('mailto:kopps@kth.se')
  })
  test('check all links on the page in Swedish', () => {
    render(<DepartmentCoursesWithLayout lang="sv" />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBe(8)
    // Menu links
    expect(links[0]).toHaveTextContent('Kurser')
    expect(links[0].href).toStrictEqual('http://localhost/utbildning/forskarutbildning/kurser')

    // Main content links
    expect(links[2]).toHaveTextContent('F1C5031')
    expect(links[2].href).toStrictEqual('http://localhost/student/kurser/kurs/F1C5031')
    expect(links[3]).toHaveTextContent('Dimensioneringsmetoder för armerade betongkonstruktioner')
    expect(links[3].href).toStrictEqual('http://localhost/student/kurser/kurs/F1C5031')

    expect(links[4]).toHaveTextContent('FAF3115')
    expect(links[4].href).toStrictEqual('http://localhost/student/kurser/kurs/FAF3115')
    expect(links[5]).toHaveTextContent('Betong och andra cementbaserade material')
    expect(links[5].href).toStrictEqual('http://localhost/student/kurser/kurs/FAF3115')
    // Footer links
    expect(links[6]).toHaveTextContent('Central studievägledning')
    expect(links[6].href).toStrictEqual('https://www.kth.se/studievagledning')
    expect(links[7]).toHaveTextContent('kopps@kth.se')
    expect(links[7].href).toStrictEqual('mailto:kopps@kth.se')
  })
})
