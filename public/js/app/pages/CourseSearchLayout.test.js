import React from 'react'
import { render, screen } from '@testing-library/react'
import { axe, toHaveNoViolations } from 'jest-axe'
import '@testing-library/jest-dom/extend-expect'
import { StaticRouter } from 'react-router'
import { MobxStoreProvider } from '../mobx'

import CourseSearch from './CourseSearch'
import RouteWrapper from '../components/RouteWrapper'
import PageLayout from '../layout/PageLayout'

import createApplicationStore from '../stores/createApplicationStore'
import getMenuData from '../config/menuData'

import commonSettings from '../config/mocks/mockCommonSettings'

expect.extend(toHaveNoViolations)

const storeId = 'searchCourses'
const applicationStore = createApplicationStore(storeId)

const { proxyPrefixPath } = commonSettings

const WrappedCourseSearch = ({ lang, ...rest }) => {
  applicationStore.setLanguage(lang)
  applicationStore.setBrowserConfig({ proxyPrefixPath })

  const updatedApplicationStore = {
    ...applicationStore,
  }
  return (
    <StaticRouter>
      <RouteWrapper
        exact
        path="/student/program/shb"
        component={CourseSearch}
        applicationStore={updatedApplicationStore}
        createBreadcrumbs={() => ({ include: 'directory' })}
        layout={PageLayout}
        createMenuData={store => ({ selectedId: 'searchAllCourses', ...getMenuData(store) })}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...rest}
      />
    </StaticRouter>
  )
}

const CourseSearchWithLayout = ({ lang }) => {
  applicationStore.setLanguage(lang)
  applicationStore.setBrowserConfig({ proxyPrefixPath })
  const menuData = getMenuData(applicationStore)

  const updatedApplicationStore = {
    ...applicationStore,
  }
  return (
    <StaticRouter>
      <MobxStoreProvider initCallback={() => updatedApplicationStore}>
        <PageLayout breadcrumbs={{ include: 'directory' }} menuData={{ searchAllCourses: 'shb', ...menuData }}>
          <CourseSearch />
        </PageLayout>
      </MobxStoreProvider>
    </StaticRouter>
  )
}

describe('Render component CourseSearch within RouterWrapper', () => {
  test('simple render', async done => {
    render(<WrappedCourseSearch lang="en" />)

    done()
  })
})

describe('Render component CourseSearch within Layout', () => {
  test('get page header in English', () => {
    render(<CourseSearchWithLayout lang="en" />)
    const h1Header = screen.getByRole('heading', { level: 1 })
    expect(h1Header).toHaveTextContent('Search course')
  })

  test('get page header in Swedish', () => {
    render(<CourseSearchWithLayout lang="sv" />)
    const h1Header = screen.getByRole('heading', { level: 1 })
    expect(h1Header).toHaveTextContent('Sök kurs')
  })

  test('match to snapshot in English', async done => {
    const { asFragment, container } = render(<CourseSearchWithLayout lang="en" />)
    expect(await axe(container)).toHaveNoViolations()

    expect(asFragment()).toMatchSnapshot()

    done()
  })

  test('match to snapshot in Swedish', async done => {
    const { asFragment, container } = render(<CourseSearchWithLayout lang="sv" />)
    expect(await axe(container)).toHaveNoViolations()

    expect(asFragment()).toMatchSnapshot()

    done()
  })
})

describe('Render component CourseSearch and check its menu, content and links', () => {
  test('check all links on the page in English', () => {
    render(<CourseSearchWithLayout lang="en" />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBe(8)
    expect(links[0]).toHaveTextContent('Student at KTH')
    expect(links[0].href).toStrictEqual('http://localhost/student/?l=en')

    expect(links[1]).toHaveTextContent('Courses Part of Programme')
    expect(links[1].href).toStrictEqual('http://localhost/student/kurser/kurser-inom-program')

    expect(links[2]).toHaveTextContent('Search course')
    expect(links[2].href).toStrictEqual('http://localhost/student/kurser/sokkurs')

    expect(links[3]).toHaveTextContent('Courses by school')
    expect(links[3].href).toStrictEqual('http://localhost/student/kurser/org')

    expect(links[4]).toHaveTextContent('Study Handbook 00/01 to 07/08') // menu link
    expect(links[4].href).toStrictEqual('http://localhost/student/program/shb')

    expect(links[5]).toHaveTextContent('kopps@kth.se') // address in search instructions, link
    expect(links[5].href).toStrictEqual('mailto:kopps@kth.se')

    expect(links[6]).toHaveTextContent('Central study counseling')
    // expect(links[6].href).toStrictEqual('https://www.kth.se/studycounselling')

    expect(links[7]).toHaveTextContent('kopps@kth.se')
    expect(links[7].href).toStrictEqual('mailto:kopps@kth.se')
  })

  test('check all links on the page in Swedish', () => {
    render(<CourseSearchWithLayout lang="sv" />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBe(8)
    expect(links[0]).toHaveTextContent('Student på KTH')
    expect(links[0].href).toStrictEqual('http://localhost/student/')

    expect(links[1]).toHaveTextContent('Kurser inom program')
    expect(links[1].href).toStrictEqual('http://localhost/student/kurser/kurser-inom-program')

    expect(links[2]).toHaveTextContent('Sök kurs')
    expect(links[2].href).toStrictEqual('http://localhost/student/kurser/sokkurs')

    expect(links[3]).toHaveTextContent('Kurser per skola')
    expect(links[3].href).toStrictEqual('http://localhost/student/kurser/org')

    expect(links[4]).toHaveTextContent('Studiehandboken 00/01 tom 07/08') // menu link
    expect(links[4].href).toStrictEqual('http://localhost/student/program/shb')

    expect(links[5]).toHaveTextContent('kopps@kth.se') // address in search instructions, link
    expect(links[5].href).toStrictEqual('mailto:kopps@kth.se')

    expect(links[6]).toHaveTextContent('Central studievägledning')
    // expect(links[6].href).toStrictEqual('https://www.kth.se/studycounselling')

    expect(links[7]).toHaveTextContent('kopps@kth.se')
    expect(links[7].href).toStrictEqual('mailto:kopps@kth.se')
  })

  test('get page content in English', () => {
    render(<CourseSearchWithLayout lang="en" />)
    const content = screen.getByText(
      'This is the official course information at KTH. The courses may be searched by course name, part of name or course code. Courses included in your programme are available using the menu on the left.'
    )
    expect(content).toBeInTheDocument()
  })

  test('get page content in Swedish', () => {
    render(<CourseSearchWithLayout lang="sv" />)
    const content = screen.getByText(
      `Här hittar du KTHs officiella kursinformation. Du kan söka bland alla kurser som ges vid KTH genom att ange hela eller delar av kursnamnet eller kurskoden. Information om vilka kurser som ingår i ett program nås via menyn till vänster.`
    )
    expect(content).toBeInTheDocument()
  })
})
