/* eslint-disable react/prop-types */

import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'
import { StaticRouter } from 'react-router'
import { MobxStoreProvider } from '../mobx'

import DepartmentsList from './DepartmentsList'
import RouteWrapper from '../components/RouteWrapper'
import PageLayout from '../layout/PageLayout'

import createApplicationStore from '../stores/createApplicationStore'
import getMenuData from '../config/menuData'

import commonSettings from '../config/mocks/mockCommonSettings'

expect.extend(toHaveNoViolations)

const applicationStore = createApplicationStore()

const proxyPrefixPath = commonSettings.proxyPrefixPath
const testCurrentSchoolsWithDepartments = {
  sv: [
    {
      departmentPrefix: 'A',
      name: 'Skola',
      departments: [{ code: 'BB', name: 'Avdelning' }],
    },
  ],
  en: [
    {
      departmentPrefix: 'A',
      name: 'School',
      departments: [{ code: 'BB', name: 'Department' }],
    },
  ],
}

const WrapperDepartmentsList = ({ lang }) => {
  applicationStore.setLanguage(lang)
  applicationStore.setBrowserConfig({ proxyPrefixPath })

  const updatedApplicationStore = {
    ...applicationStore,
  }
  return (
    <StaticRouter>
      <RouteWrapper
        exact
        path="/student/kurser/org"
        createBreadcrumbs={() => ({ include: 'directory' })}
        component={DepartmentsList}
        layout={PageLayout}
        applicationStore={updatedApplicationStore}
        createMenuData={store => ({ selectedId: 'departmentsList', ...getMenuData(store) })}
      />
    </StaticRouter>
  )
}

const DepartmentsListWithLayout = ({ lang }) => {
  applicationStore.setLanguage(lang)
  applicationStore.setBrowserConfig({ proxyPrefixPath })
  applicationStore.setCurrentSchoolsWithDepartments(testCurrentSchoolsWithDepartments[lang])
  // TODO: Move to mocks
  const menuData = getMenuData(applicationStore)

  const updatedApplicationStore = {
    ...applicationStore,
  }
  return (
    <StaticRouter>
      <MobxStoreProvider initCallback={() => updatedApplicationStore}>
        <PageLayout breadcrumbs={{ include: 'directory' }} menuData={{ selectedId: 'departmentsList', ...menuData }}>
          <DepartmentsList />
        </PageLayout>
      </MobxStoreProvider>
    </StaticRouter>
  )
}

describe('Render component DepartmentsList within RouterWrapper', () => {
  test('simple render', done => {
    render(<WrapperDepartmentsList lang="en" />)
    done()
  })
})

describe('Render component DepartmentsList within Layout', () => {
  test('verify that page is accessible', async () => {
    const { container } = render(<DepartmentsListWithLayout lang="en" />)
    expect(await axe(container)).toHaveNoViolations()
  })

  test('get page header in English', () => {
    render(<DepartmentsListWithLayout lang="en" />)
    const h1Header = screen.getByRole('heading', { level: 1 })
    expect(h1Header).toHaveTextContent('Courses by school')
  })

  test('get page header in Swedish', () => {
    render(<DepartmentsListWithLayout lang="sv" />)
    const h1Header = screen.getByRole('heading', { level: 1 })
    expect(h1Header).toHaveTextContent('Kurser per skola')
  })

  test('match to snapshot in English', done => {
    const { asFragment } = render(<DepartmentsListWithLayout lang="en" />)
    expect(asFragment()).toMatchSnapshot()
    done()
  })

  test('match to snapshot in Swedish', done => {
    const { asFragment } = render(<DepartmentsListWithLayout lang="sv" />)
    expect(asFragment()).toMatchSnapshot()
    done()
  })
})

describe('Render component DepartmentsList and check its menu, content and links', () => {
  test('check all links on the page in English', () => {
    render(<DepartmentsListWithLayout lang="en" />)

    const h2Header = screen.getByRole('heading', { level: 2 })
    expect(h2Header).toHaveTextContent('School')

    const links = screen.getAllByRole('link')
    expect(links.length).toBe(8)
    // Menu links
    expect(links[0]).toHaveTextContent('Student at KTH')
    expect(links[0].href).toStrictEqual('http://localhost/student/?l=en')
    expect(links[1]).toHaveTextContent('Courses Part of Programme')
    expect(links[1].href).toStrictEqual('http://localhost/student/kurser/kurser-inom-program')
    expect(links[2]).toHaveTextContent('Search course')
    expect(links[2].href).toStrictEqual('http://localhost/student/kurser/sokkurs')
    expect(links[3]).toHaveTextContent('Courses by school')
    expect(links[3].href).toStrictEqual('http://localhost/student/kurser/org')
    expect(links[4]).toHaveTextContent('Study Handbook 00/01 to 07/08')
    expect(links[4].href).toStrictEqual('http://localhost/student/program/shb')
    // Main content links
    expect(links[5]).toHaveTextContent('Department')
    expect(links[5].href).toStrictEqual('http://localhost/student/kurser/org/BB?l=en')
    // Footer links
    expect(links[6]).toHaveTextContent('Central study counseling')
    expect(links[6].href).toStrictEqual('https://www.kth.se/en/studies/master/general-study-counselling-1.621634')
    expect(links[7]).toHaveTextContent('kopps@kth.se')
    expect(links[7].href).toStrictEqual('mailto:kopps@kth.se')
  })

  test('check all links on the page in Swedish', () => {
    render(<DepartmentsListWithLayout lang="sv" />)

    const h2Header = screen.getByRole('heading', { level: 2 })
    expect(h2Header).toHaveTextContent('Skola')

    const links = screen.getAllByRole('link')
    expect(links.length).toBe(8)
    // Menu links
    expect(links[0]).toHaveTextContent('Student på KTH')
    expect(links[0].href).toStrictEqual('http://localhost/student/')
    expect(links[1]).toHaveTextContent('Kurser inom program')
    expect(links[1].href).toStrictEqual('http://localhost/student/kurser/kurser-inom-program')
    expect(links[2]).toHaveTextContent('Sök kurs')
    expect(links[2].href).toStrictEqual('http://localhost/student/kurser/sokkurs')
    expect(links[3]).toHaveTextContent('Kurser per skola')
    expect(links[3].href).toStrictEqual('http://localhost/student/kurser/org')
    expect(links[4]).toHaveTextContent('Studiehandboken 00/01 tom 07/08')
    expect(links[4].href).toStrictEqual('http://localhost/student/program/shb')
    // Main content links
    expect(links[5]).toHaveTextContent('Avdelning')
    expect(links[5].href).toStrictEqual('http://localhost/student/kurser/org/BB')
    // Footer links
    expect(links[6]).toHaveTextContent('Central studievägledning')
    expect(links[6].href).toStrictEqual('https://www.kth.se/utbildning/traffakth/studievagledning')
    expect(links[7]).toHaveTextContent('kopps@kth.se')
    expect(links[7].href).toStrictEqual('mailto:kopps@kth.se')
  })

  test('get page content in English', () => {
    render(<DepartmentsListWithLayout lang="en" />)
    const content = screen.getByText(
      'All active courses on all educational levels given at KTH, listed according to the organization of each school.'
    )
    expect(content).toBeInTheDocument()
  })

  test('get page content in Swedish', () => {
    render(<DepartmentsListWithLayout lang="sv" />)
    const content = screen.getByText(
      'Här listas alla KTH:s aktiva kurser på samtliga utbildningsnivåer, uppdelat enligt respektive skolas organisation.'
    )
    expect(content).toBeInTheDocument()
  })
})
