/* eslint-disable react/prop-types */

import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'
import { StaticRouter } from 'react-router'
import { MobxStoreProvider } from '../mobx'

import ProgrammesList from './ProgrammesList'
import RouteWrapper from '../components/RouteWrapper'
import PageLayout from '../layout/PageLayout'

import createApplicationStore from '../stores/createApplicationStore'
import getMenuData from '../config/menuData'

import commonSettings from '../config/mocks/mockCommonSettings'

expect.extend(toHaveNoViolations)

const applicationStore = createApplicationStore()

const testProgrammes = {
  sv: [
    [
      'TARKU',
      {
        first: [
          {
            programmeCode: 'ARKIT',
            title: 'Arkitektutbildning',
            titleOtherLanguage: 'Degree Programme in Architecture',
            firstAdmissionTerm: '20072',
            credits: 300,
            creditUnitLabel: 'Högskolepoäng',
            creditUnitAbbr: 'hp',
            educationalLevel: 'BASIC',
            lengthInStudyYears: 5,
            owningSchoolCode: 'Arkitektur och samhällsbyggnad',
            degrees: [{ code: 'TARKU' }],
          },
        ],
        second: [
          {
            programmeCode: 'A',
            title: 'Arkitektutbildning',
            titleOtherLanguage: 'Degree Programme in Architecture',
            lastAdmissionTerm: '20071',
            credits: 270,
            creditUnitLabel: 'Högskolepoäng',
            creditUnitAbbr: 'hp',
            lengthInStudyYears: 5,
            owningSchoolCode: 'Arkitektur och samhällsbyggnad',
            degrees: [{ code: 'TARKU' }],
          },
        ],
      },
    ],
  ],
  en: [
    [
      'TARKU',
      {
        first: [
          {
            programmeCode: 'ARKIT',
            title: 'Degree Programme in Architecture',
            titleOtherLanguage: 'Arkitektutbildning',
            firstAdmissionTerm: '20072',
            credits: 300,
            creditUnitLabel: 'Credits',
            creditUnitAbbr: 'hp',
            educationalLevel: 'BASIC',
            lengthInStudyYears: 5,
            owningSchoolCode: 'Arkitektur och samhällsbyggnad',
            degrees: [{ code: 'TARKU' }],
          },
        ],
        second: [
          {
            programmeCode: 'A',
            title: 'Degree Programme in Architecture',
            titleOtherLanguage: 'Arkitektutbildning',
            lastAdmissionTerm: '20071',
            credits: 270,
            creditUnitLabel: 'Credits',
            creditUnitAbbr: 'hp',
            lengthInStudyYears: 5,
            owningSchoolCode: 'Arkitektur och samhällsbyggnad',
            degrees: [{ code: 'TARKU' }],
          },
        ],
      },
    ],
  ],
}

const WrapperProgrammesList = ({ lang }) => {
  applicationStore.setLanguage(lang)
  applicationStore.setBrowserConfig(commonSettings)

  const updatedApplicationStore = {
    ...applicationStore,
  }
  return (
    <StaticRouter>
      <RouteWrapper
        exact
        path="/student/kurser/org"
        createBreadcrumbs={() => ({ include: 'directory' })}
        component={ProgrammesList}
        layout={PageLayout}
        applicationStore={updatedApplicationStore}
        createMenuData={store => ({ selectedId: 'ProgrammesList', ...getMenuData(store) })}
      />
    </StaticRouter>
  )
}

const ProgrammesListWithLayout = ({ lang }) => {
  applicationStore.setLanguage(lang)
  applicationStore.setBrowserConfig(commonSettings)
  applicationStore.setProgrammes(testProgrammes[lang])
  const menuData = getMenuData(applicationStore)

  const updatedApplicationStore = {
    ...applicationStore,
  }
  return (
    <StaticRouter>
      <MobxStoreProvider initCallback={() => updatedApplicationStore}>
        <PageLayout breadcrumbs={{ include: 'directory' }} menuData={{ selectedId: 'ProgrammesList', ...menuData }}>
          <ProgrammesList />
        </PageLayout>
      </MobxStoreProvider>
    </StaticRouter>
  )
}

describe('Render component ProgrammesList within RouterWrapper', () => {
  test('simple render', done => {
    render(<WrapperProgrammesList lang="en" />)
    done()
  })
})

describe('Render component ProgrammesList within Layout', () => {
  test('verify that page is accessible', async () => {
    const { container } = render(<ProgrammesListWithLayout lang="en" />)
    expect(await axe(container)).toHaveNoViolations()
  })
  test('get page header in English', () => {
    render(<ProgrammesListWithLayout lang="en" />)
    const h1Header = screen.getByRole('heading', { level: 1 })
    expect(h1Header).toHaveTextContent('Courses Part of Programme')
  })
  test('get page header in Swedish', () => {
    render(<ProgrammesListWithLayout lang="sv" />)
    const h1Header = screen.getByRole('heading', { level: 1 })
    expect(h1Header).toHaveTextContent('Kurser inom program')
  })
  test('match to snapshot in English', done => {
    const { asFragment } = render(<ProgrammesListWithLayout lang="en" />)
    expect(asFragment()).toMatchSnapshot()
    done()
  })
  test('match to snapshot in Swedish', done => {
    const { asFragment } = render(<ProgrammesListWithLayout lang="sv" />)
    expect(asFragment()).toMatchSnapshot()
    done()
  })
})

describe('Render component ProgrammesList and check its menu, content and links', () => {
  test('check all links on the page in English', () => {
    render(<ProgrammesListWithLayout lang="en" />)
    const h2Header = screen.getByRole('heading', { level: 2 })
    expect(h2Header).toHaveTextContent('Master of Architecture')
    const links = screen.getAllByRole('link')
    expect(links.length).toBe(9)
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
    expect(links[5]).toHaveTextContent('Degree Programme in Architecture (ARKIT)')
    expect(links[5].href).toStrictEqual('http://localhost/student/kurser/program/ARKIT?l=en')
    expect(links[6]).toHaveTextContent('Degree Programme in Architecture (A)')
    expect(links[6].href).toStrictEqual('http://localhost/student/kurser/program/A?l=en')
    // Footer links
    expect(links[7]).toHaveTextContent('Central study counseling')
    expect(links[7].href).toStrictEqual('https://www.kth.se/en/studies/master/general-study-counselling-1.621634')
    expect(links[8]).toHaveTextContent('kopps@kth.se')
    expect(links[8].href).toStrictEqual('mailto:kopps@kth.se')
  })
  test('check all links on the page in Swedish', () => {
    render(<ProgrammesListWithLayout lang="sv" />)
    const h2Header = screen.getByRole('heading', { level: 2 })
    expect(h2Header).toHaveTextContent('Arkitektutbildning')
    const links = screen.getAllByRole('link')
    expect(links.length).toBe(9)
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
    expect(links[5]).toHaveTextContent('Arkitektutbildning (ARKIT)')
    expect(links[5].href).toStrictEqual('http://localhost/student/kurser/program/ARKIT')
    expect(links[6]).toHaveTextContent('Arkitektutbildning (A)')
    expect(links[6].href).toStrictEqual('http://localhost/student/kurser/program/A')
    // Footer links
    expect(links[7]).toHaveTextContent('Central studievägledning')
    expect(links[7].href).toStrictEqual('https://www.kth.se/utbildning/traffakth/studievagledning')
    expect(links[8]).toHaveTextContent('kopps@kth.se')
    expect(links[8].href).toStrictEqual('mailto:kopps@kth.se')
  })
  test('get page content in English', () => {
    render(<ProgrammesListWithLayout lang="en" />)
    const content = screen.getByText(
      'Choose a programme below to get an overview of courses and study years forming the programme.'
    )
    expect(content).toBeInTheDocument()
  })
  test('get page content in Swedish', () => {
    render(<ProgrammesListWithLayout lang="sv" />)
    const content = screen.getByText(
      'Välj program nedan för att få en översikt av de kurser och årskursindelning som utgör programmet.'
    )
    expect(content).toBeInTheDocument()
  })
})
