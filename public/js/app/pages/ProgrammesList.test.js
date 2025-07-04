/* eslint-disable react/prop-types */

import React from 'react'
import { render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import { toHaveNoViolations } from 'jest-axe'
import { axe } from './test-config/axeWithoutLandmarkUniqueRule'
import { StaticRouter } from 'react-router-dom/server'
import { MobxStoreProvider } from '../mobx'

import ProgrammesList from './ProgrammesList'
import ElementWrapper from '../components/ElementWrapper'
import PageLayout from '../layout/PageLayout'

import createApplicationStore from '../stores/createApplicationStore'
import getMenuData from '../config/menuData'

import commonSettings from '../config/mocks/mockCommonSettings'
import { filterProgrammeSyllabuses } from '../util/filterProgrammeSyllabuses'

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
            formattedCredits: '300 hp',
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
            formattedCredits: '270 hp',
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
            formattedCredits: '300 credits',
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
            formattedCredits: '270 credits',
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
  const initApplicationStoreCallback = () => updatedApplicationStore
  return (
    <StaticRouter>
      <ElementWrapper
        exact
        path="/student/kurser/org"
        component={ProgrammesList}
        layout={PageLayout}
        initApplicationStoreCallback={initApplicationStoreCallback}
        createMenuData={store => ({ selectedId: 'ProgrammesList', ...getMenuData(store) })}
      />
    </StaticRouter>
  )
}

const FilteredProgrammesListWithLayout = ({ lang, input }) => {
  applicationStore.setLanguage(lang)
  applicationStore.setBrowserConfig(commonSettings)
  applicationStore.setProgrammes(filterProgrammeSyllabuses(input, testProgrammes[lang]))
  const menuData = getMenuData(applicationStore)

  const updatedApplicationStore = {
    ...applicationStore,
  }
  return (
    <StaticRouter>
      <MobxStoreProvider initCallback={() => updatedApplicationStore}>
        <PageLayout menuData={{ selectedId: 'ProgrammesList', ...menuData }}>
          <ProgrammesList />
        </PageLayout>
      </MobxStoreProvider>
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
        <PageLayout menuData={{ selectedId: 'ProgrammesList', ...menuData }}>
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
    expect(h1Header).toHaveTextContent('Programme Syllabuses')
  })
  test('get page header in Swedish', () => {
    render(<ProgrammesListWithLayout lang="sv" />)
    const h1Header = screen.getByRole('heading', { level: 1 })
    expect(h1Header).toHaveTextContent('Utbildningsplaner')
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
    const mainContent = screen.getByRole('main')
    const h2Header = within(mainContent).getByRole('heading', { level: 2 })
    expect(h2Header).toHaveTextContent('Master of Architecture')
    const links = screen.getAllByRole('link')
    expect(links.length).toBe(9)
    // Menu links
    expect(links[0]).toHaveTextContent('Studies')
    expect(links[0].href).toStrictEqual('http://localhost/student/studier/?l=en')
    expect(links[1]).toHaveTextContent('Programme Syllabuses')
    expect(links[1].href).toStrictEqual('http://localhost/student/kurser/kurser-inom-program')
    expect(links[2]).toHaveTextContent('Search courses')
    expect(links[2].href).toStrictEqual('http://localhost/student/kurser/sokkurs')
    expect(links[3]).toHaveTextContent('Courses by school')
    expect(links[3].href).toStrictEqual('http://localhost/student/kurser/org')
    expect(links[4]).toHaveTextContent('Studies before 07/08')
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
    const mainContent = screen.getByRole('main')
    const h2Header = within(mainContent).getByRole('heading', { level: 2 })
    expect(h2Header).toHaveTextContent('Arkitektutbildning')
    const links = screen.getAllByRole('link')
    expect(links.length).toBe(9)
    // Menu links
    expect(links[0]).toHaveTextContent('Studier')
    expect(links[0].href).toStrictEqual('http://localhost/student/studier/')
    expect(links[1]).toHaveTextContent('Utbildningsplaner')
    expect(links[1].href).toStrictEqual('http://localhost/student/kurser/kurser-inom-program')
    expect(links[2]).toHaveTextContent('Sök kurser')
    expect(links[2].href).toStrictEqual('http://localhost/student/kurser/sokkurs')
    expect(links[3]).toHaveTextContent('Kurser per skola')
    expect(links[3].href).toStrictEqual('http://localhost/student/kurser/org')
    expect(links[4]).toHaveTextContent('Studier före 07/08')
    expect(links[4].href).toStrictEqual('http://localhost/student/program/shb')
    // Main content links
    expect(links[5]).toHaveTextContent('Arkitektutbildning (ARKIT)')
    expect(links[5].href).toStrictEqual('http://localhost/student/kurser/program/ARKIT')
    expect(links[6]).toHaveTextContent('Arkitektutbildning (A)')
    expect(links[6].href).toStrictEqual('http://localhost/student/kurser/program/A')
    // Footer links
    expect(links[7]).toHaveTextContent('Central studievägledning')
    expect(links[7].href).toStrictEqual('https://www.kth.se/studievagledning')
    expect(links[8]).toHaveTextContent('kopps@kth.se')
    expect(links[8].href).toStrictEqual('mailto:kopps@kth.se')
  })
  test('get page content in English', () => {
    render(<ProgrammesListWithLayout lang="en" />)
    const content = screen.getByText(
      'This is where you will find all programme syllabuses at KTH. Each year group within a programme has its own programme syllabus. The programme syllabus contains, among other things, information about which courses are included in the programme and what applies for selection and admission.'
    )
    expect(content).toBeInTheDocument()
  })
  test('get page content in Swedish', () => {
    render(<ProgrammesListWithLayout lang="sv" />)
    const content = screen.getByText(
      'Här hittar du alla utbildningsplaner på KTH. Varje årskull inom ett program har en egen utbildningsplan. I utbildningsplanen finns information om bland annat vilka kurser som ingår i programmet och vad som gäller för urval och behörighet.'
    )
    expect(content).toBeInTheDocument()
  })
  test('test searching for Arkitekt', () => {
    const inputText = 'Arkitekt'
    render(<FilteredProgrammesListWithLayout lang="sv" input={inputText} />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBe(9)
    expect(links[5]).toHaveTextContent('Arkitektutbildning (ARKIT)')
    expect(links[6]).toHaveTextContent('Arkitektutbildning (A)')
  })
  test('test searching for something that does not exist', () => {
    const inputText = 'Arkkkitekt'
    render(<FilteredProgrammesListWithLayout lang="sv" input={inputText} />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBe(7)
  })
})
