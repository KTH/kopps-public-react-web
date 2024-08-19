/* eslint-disable react/prop-types */

import React from 'react'
import { render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import { toHaveNoViolations } from 'jest-axe'
import { axe } from './test-config/axeWithoutLandmarkUniqueRule'
import { StaticRouter } from 'react-router-dom/server'
import { MobxStoreProvider } from '../mobx'

import ThirdCycleDepartmentsList from './ThirdCycleDepartmentsList'
import ElementWrapper from '../components/ElementWrapper'
import PageLayout from '../layout/PageLayout'
import getThirdCycleMenuData from '../config/thirdCycleMenuData'

import createApplicationStore from '../stores/createApplicationStore'

import commonSettings from '../config/mocks/mockCommonSettings'

expect.extend(toHaveNoViolations)

const applicationStore = createApplicationStore()

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
  applicationStore.setBrowserConfig(commonSettings)
  const updatedApplicationStore = {
    ...applicationStore,
  }
  const initApplicationStoreCallback = () => updatedApplicationStore
  return (
    <StaticRouter>
      <ElementWrapper
        exact
        path="/utbildning/forskarutbildning/kurser/avdelning"
        component={ThirdCycleDepartmentsList}
        layout={PageLayout}
        initApplicationStoreCallback={initApplicationStoreCallback}
        createMenuData={store => ({
          selectedId: 'thirdCycleDepartmentsList',
          ...getThirdCycleMenuData(store),
        })}
      />
    </StaticRouter>
  )
}

const ThirdCycleDepartmentsListWithLayout = ({ lang }) => {
  applicationStore.setLanguage(lang)
  applicationStore.setBrowserConfig(commonSettings)
  applicationStore.setCurrentSchoolsWithDepartments(testCurrentSchoolsWithDepartments[lang])
  const menuData = getThirdCycleMenuData(applicationStore)

  const updatedApplicationStore = {
    ...applicationStore,
  }
  return (
    <StaticRouter>
      <MobxStoreProvider initCallback={() => updatedApplicationStore}>
        <PageLayout menuData={{ selectedId: 'thirdCycleDepartmentsList', ...menuData }}>
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
    const mainContent = screen.getByRole('main')
    const h2Header = within(mainContent).getAllByRole('heading', { level: 2 })
    expect(h2Header.length).toBe(2)
    expect(h2Header[0]).toHaveTextContent('School')
    expect(h2Header[1]).toHaveTextContent('Older Schools')

    const links = screen.getAllByRole('link')
    expect(links.length).toBe(7)
    // Menu links
    expect(links[0]).toHaveTextContent('Doctoral studies (PhD)')
    expect(links[0].href).toStrictEqual('http://localhost/en/studies/phd/?l=en')
    expect(links[1]).toHaveTextContent('Third-cycle courses by school')
    expect(links[1].href).toStrictEqual('http://localhost/utbildning/forskarutbildning/kurser/avdelning?l=en')
    expect(links[2]).toHaveTextContent('Search third-cycle courses')
    expect(links[2].href).toStrictEqual('http://localhost/utbildning/forskarutbildning/kurser/sok?l=en')
    expect(links[3]).toHaveTextContent('Search third-cycle courses (new)')
    expect(links[3].href).toStrictEqual('http://localhost/utbildning/forskarutbildning/kurser/sok-ny-design?l=en')
    // Main content links
    expect(links[4]).toHaveTextContent('Department')
    expect(links[4].href).toStrictEqual('http://localhost/utbildning/forskarutbildning/kurser/org/BB?l=en')
    // Footer links
    expect(links[5]).toHaveTextContent('Central study counseling')
    expect(links[5].href).toStrictEqual('https://www.kth.se/en/studies/master/general-study-counselling-1.621634')
    expect(links[6]).toHaveTextContent('kopps@kth.se')
    expect(links[6].href).toStrictEqual('mailto:kopps@kth.se')
  })

  test('check all links on the page in Swedish', () => {
    render(<ThirdCycleDepartmentsListWithLayout lang="sv" />)

    const mainContent = screen.getByRole('main')
    const h2Header = within(mainContent).getAllByRole('heading', { level: 2 })

    expect(h2Header.length).toBe(2)
    expect(h2Header[0]).toHaveTextContent('Skola')
    expect(h2Header[1]).toHaveTextContent('Äldre skolor')

    const links = screen.getAllByRole('link')
    expect(links.length).toBe(7)
    // Menu links
    expect(links[0]).toHaveTextContent('Forskarutbildning')
    expect(links[0].href).toStrictEqual('http://localhost/utbildning/forskarutbildning/')
    expect(links[1]).toHaveTextContent('Forskarkurser per skola')
    expect(links[1].href).toStrictEqual('http://localhost/utbildning/forskarutbildning/kurser/avdelning')
    expect(links[2]).toHaveTextContent('Sök forskarkurs')
    expect(links[2].href).toStrictEqual('http://localhost/utbildning/forskarutbildning/kurser/sok')
    expect(links[3]).toHaveTextContent('Sök forskarkurs (ny)')
    expect(links[3].href).toStrictEqual('http://localhost/utbildning/forskarutbildning/kurser/sok-ny-design')
    // Main content links
    expect(links[4]).toHaveTextContent('Avdelning')
    expect(links[4].href).toStrictEqual('http://localhost/utbildning/forskarutbildning/kurser/org/BB')
    // Footer links
    expect(links[5]).toHaveTextContent('Central studievägledning')
    expect(links[5].href).toStrictEqual('https://www.kth.se/studievagledning')
    expect(links[6]).toHaveTextContent('kopps@kth.se')
    expect(links[6].href).toStrictEqual('mailto:kopps@kth.se')
  })
})
