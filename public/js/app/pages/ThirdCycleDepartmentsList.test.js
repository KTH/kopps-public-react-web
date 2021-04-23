/* eslint-disable react/prop-types */

import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'
import { StaticRouter } from 'react-router'
import { MobxStoreProvider } from '../mobx'

import ThirdCycleDepartmentsList from './ThirdCycleDepartmentsList'
import RouteWrapper from '../components/RouteWrapper'
import PageLayout from '../layout/PageLayout'
import getThirdCycleMenuData from '../config/thirdCycleMenuData'
import getThirdCycleBreadcrumbs from '../config/thirdCycleBreadcrumbs'

import createApplicationStore from '../stores/createApplicationStore'

expect.extend(toHaveNoViolations)

const applicationStore = createApplicationStore()

const testProxyPath = 'localhost://kopps-public'
const proxyPrefixPath = { uri: testProxyPath }
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

const WrapperThirdCycleDepartmentsList = ({ lang }) => {
  applicationStore.setLanguage(lang)
  // TODO: Move to mocks
  const menuData = getThirdCycleMenuData(lang, testProxyPath)
  const breadcrumbs = getThirdCycleBreadcrumbs(lang, testProxyPath)
  const updatedApplicationStore = {
    ...applicationStore,
  }
  return (
    <StaticRouter>
      <MobxStoreProvider initCallback={() => updatedApplicationStore}>
        <RouteWrapper
          exact
          path="/utbildning/forskarutbildning/kurser/avdelning"
          breadcrumbs={{
            include: 'university',
            items: breadcrumbs,
          }}
          component={ThirdCycleDepartmentsList}
          layout={PageLayout}
          menuData={{
            selectedId: 'thirdCycleDepartmentsList',
            ...menuData,
          }}
        />
      </MobxStoreProvider>
    </StaticRouter>
  )
}

const ThirdCycleDepartmentsListWithLayout = ({ lang }) => {
  applicationStore.setLanguage(lang)
  applicationStore.setBrowserConfig({ proxyPrefixPath })
  applicationStore.setCurrentSchoolsWithDepartments(testCurrentSchoolsWithDepartments[lang])
  // TODO: Move to mocks
  const menuData = getThirdCycleMenuData(lang, testProxyPath)
  const breadcrumbs = getThirdCycleBreadcrumbs(lang, testProxyPath)

  const updatedApplicationStore = {
    ...applicationStore,
  }
  return (
    <StaticRouter>
      <MobxStoreProvider initCallback={() => updatedApplicationStore}>
        <PageLayout
          breadcrumbs={{
            include: 'university',
            items: breadcrumbs,
          }}
          menuData={{ selectedId: 'thirdCycleDepartmentsList', ...menuData }}
        >
          <ThirdCycleDepartmentsList />
        </PageLayout>
      </MobxStoreProvider>
    </StaticRouter>
  )
}

describe('Render component ThirdCycleDepartmentsList within RouterWrapper', () => {
  test('simple render', done => {
    render(<WrapperThirdCycleDepartmentsList lang="en" />)
    done()
  })
})

describe('Render component ThirdCycleDepartmentsList within Layout', () => {
  test('verify that page is accessible', async () => {
    const { container } = render(<ThirdCycleDepartmentsListWithLayout lang="en" />)
    expect(await axe(container)).toHaveNoViolations()
  })

  test('get page header in English', () => {
    render(<ThirdCycleDepartmentsListWithLayout lang="en" />)
    const h1Header = screen.getByRole('heading', { level: 1 })
    expect(h1Header).toHaveTextContent('Third-cycle courses by school')
  })

  test('get page header in Swedish', () => {
    render(<ThirdCycleDepartmentsListWithLayout lang="sv" />)
    const h1Header = screen.getByRole('heading', { level: 1 })
    expect(h1Header).toHaveTextContent('Forskarkurser per skola')
  })

  test('match to snapshot in English', done => {
    const { asFragment } = render(<ThirdCycleDepartmentsListWithLayout lang="en" />)
    expect(asFragment()).toMatchSnapshot()
    done()
  })

  test('match to snapshot in Swedish', done => {
    const { asFragment } = render(<ThirdCycleDepartmentsListWithLayout lang="sv" />)
    expect(asFragment()).toMatchSnapshot()
    done()
  })
})

describe('Render component ThirdCycleDepartmentsList and check its menu, content and links', () => {
  test('check all links on the page in English', () => {
    render(<ThirdCycleDepartmentsListWithLayout lang="en" />)

    const h2Header = screen.getByRole('heading', { level: 2 })
    expect(h2Header).toHaveTextContent('School')

    const links = screen.getAllByRole('link')
    expect(links.length).toBe(6)
    // Menu links
    expect(links[0]).toHaveTextContent('PhD studies')
    expect(links[0].href).toStrictEqual('http://localhost/utbildning/forskarutbildning/?l=en')
    expect(links[1]).toHaveTextContent('Third-cycle courses by school')
    expect(links[1].href).toStrictEqual('localhost://kopps-public/kurser/avdelning?l=en')
    expect(links[2]).toHaveTextContent('Search third-cycle courses')
    expect(links[2].href).toStrictEqual('localhost://kopps-public/kurser/sok?l=en')
    // Main content links
    expect(links[3]).toHaveTextContent('Department')
    expect(links[3].href).toStrictEqual('localhost://kopps-public/student/kurser/org/BB?l=en')
    // Footer links
    expect(links[4]).toHaveTextContent('Central study counseling')
    expect(links[4].href).toStrictEqual('https://www.kth.se/studycounselling')
    expect(links[5]).toHaveTextContent('kopps@kth.se')
    expect(links[5].href).toStrictEqual('mailto:kopps@kth.se')
  })

  test('check all links on the page in Swedish', () => {
    render(<ThirdCycleDepartmentsListWithLayout lang="sv" />)

    const h2Header = screen.getByRole('heading', { level: 2 })
    expect(h2Header).toHaveTextContent('Skola')

    const links = screen.getAllByRole('link')
    expect(links.length).toBe(6)
    // Menu links
    expect(links[0]).toHaveTextContent('Forskarutbildning')
    expect(links[0].href).toStrictEqual('http://localhost/utbildning/forskarutbildning/')
    expect(links[1]).toHaveTextContent('Forskarkurser per skola')
    expect(links[1].href).toStrictEqual('localhost://kopps-public/kurser/avdelning')
    expect(links[2]).toHaveTextContent('Sök forskarkurs')
    expect(links[2].href).toStrictEqual('localhost://kopps-public/kurser/sok')
    // Main content links
    expect(links[3]).toHaveTextContent('Avdelning')
    expect(links[3].href).toStrictEqual('localhost://kopps-public/student/kurser/org/BB')
    // Footer links
    expect(links[4]).toHaveTextContent('Central studievägledning')
    expect(links[4].href).toStrictEqual('https://www.kth.se/studycounselling')
    expect(links[5]).toHaveTextContent('kopps@kth.se')
    expect(links[5].href).toStrictEqual('mailto:kopps@kth.se')
  })
})
