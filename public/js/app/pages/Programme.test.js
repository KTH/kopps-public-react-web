/* eslint-disable react/prop-types */

import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { axe, toHaveNoViolations } from 'jest-axe'
import { StaticRouter } from 'react-router'
import { MobxStoreProvider } from '../mobx'

import Programme from './Programme'
import RouteWrapper from '../components/RouteWrapper'
import PageLayout from '../layout/PageLayout'

import createApplicationStore from '../stores/createApplicationStore'
import getProgrammeMenuData from '../config/programmeMenuData'

import commonSettings from '../config/mocks/mockCommonSettings'

expect.extend(toHaveNoViolations)

const mockDate = new Date('2021-03-23 16:00')

const applicationStore = createApplicationStore()

const testProgrammeCode = 'ARKIT'
const testProgrammeName = {
  sv: 'Arkitektutbildning',
  en: 'Degree Programme in Architecture',
}
const testLengthInStudyYears = 5
const testProgrammeTerms = ['20192', '20211']

const WrapperProgramme = ({ lang }) => {
  applicationStore.setLanguage(lang)
  applicationStore.setBrowserConfig(commonSettings)
  const updatedApplicationStore = {
    ...applicationStore,
  }
  return (
    <StaticRouter>
      <RouteWrapper
        exact
        path="/student/kurser/program/CLGYM"
        createBreadcrumbs={() => ({ include: 'directory' })}
        component={Programme}
        layout={PageLayout}
        applicationStore={updatedApplicationStore}
        createMenuData={store => ({ selectedId: 'studyYears', ...getProgrammeMenuData(store) })}
      />
    </StaticRouter>
  )
}

const ProgrammeWithLayout = ({ lang, lastAdmissionTerm }) => {
  applicationStore.setLanguage(lang)
  applicationStore.setBrowserConfig(commonSettings)
  applicationStore.setProgrammeCode(testProgrammeCode)
  applicationStore.setProgrammeName(testProgrammeName[lang])
  applicationStore.setLengthInStudyYears(testLengthInStudyYears)
  applicationStore.setProgrammeTerms(testProgrammeTerms)
  applicationStore.setLastAdmissionTerm(lastAdmissionTerm) // to test older programs
  const programmeMenuData = getProgrammeMenuData(applicationStore)

  const updatedApplicationStore = {
    ...applicationStore,
  }
  return (
    <StaticRouter>
      <MobxStoreProvider initCallback={() => updatedApplicationStore}>
        <PageLayout
          breadcrumbs={{ include: 'directory' }}
          menuData={{ selectedId: 'studyYears', ...programmeMenuData }}
        >
          <Programme />
        </PageLayout>
      </MobxStoreProvider>
    </StaticRouter>
  )
}

describe('Render component Programme within RouterWrapper', () => {
  test('simple render', done => {
    render(<WrapperProgramme lang="en" />)
    done()
  })
})

describe('Render component Programme within Layout', () => {
  beforeAll(() => {
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate)
  })

  afterAll(() => {
    jest.spyOn(global, 'Date').mockRestore()
  })
  test('verify that page is accessible', async () => {
    const { container } = render(<ProgrammeWithLayout lang="en" />)
    expect(await axe(container)).toHaveNoViolations()
  })
  test('get page header in English', () => {
    render(<ProgrammeWithLayout lang="en" />)
    const h1Header = screen.getByRole('heading', { level: 1 })
    expect(h1Header).toHaveTextContent('Programme Syllabuses')
  })
  test('get page header in Swedish', () => {
    render(<ProgrammeWithLayout lang="sv" />)
    const h1Header = screen.getByRole('heading', { level: 1 })
    expect(h1Header).toHaveTextContent('Utbildningsplaner')
  })
  test('match to snapshot in English', done => {
    const { asFragment } = render(<ProgrammeWithLayout lang="en" />)
    expect(asFragment()).toMatchSnapshot()
    done()
  })
  test('match to snapshot in Swedish', done => {
    const { asFragment } = render(<ProgrammeWithLayout lang="sv" />)
    expect(asFragment()).toMatchSnapshot()
    done()
  })
})

describe('Render component Programme and check its menu, content and links', () => {
  beforeAll(() => {
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate)
  })

  afterAll(() => {
    jest.spyOn(global, 'Date').mockRestore()
  })
  test('check all links on the page in English for a programme which is available for new admission', () => {
    render(<ProgrammeWithLayout lang="en" />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBe(5)
    // Menu links
    expect(links[0]).toHaveTextContent('Course and programme directory')
    expect(links[0].href).toStrictEqual('http://localhost/student/kurser?l=en')
    // Main content links
    expect(links[1]).toHaveTextContent('Programme syllabus for studies starting in Autumn 19')
    expect(links[1].href).toStrictEqual('http://localhost/student/kurser/program/ARKIT/20192/arskurs2?l=en')
    expect(links[2]).toHaveTextContent('Programme syllabus for studies starting in Spring 21')
    expect(links[2].href).toStrictEqual('http://localhost/student/kurser/program/ARKIT/20211/arskurs1?l=en')
    // Footer links
    expect(links[3]).toHaveTextContent('Central study counseling')
    expect(links[3].href).toStrictEqual('https://www.kth.se/en/studies/master/general-study-counselling-1.621634')
    expect(links[4]).toHaveTextContent('kopps@kth.se')
    expect(links[4].href).toStrictEqual('mailto:kopps@kth.se')
  })
  test('check all links on the page in English for a programme without new admission', () => {
    render(<ProgrammeWithLayout lang="en" lastAdmissionTerm="20172" />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBe(6)
    // Menu links
    expect(links[0]).toHaveTextContent('Course and programme directory')
    expect(links[0].href).toStrictEqual('http://localhost/student/kurser?l=en')
    // Main content links
    expect(links[1]).toHaveTextContent('Programme syllabus for studies starting in Autumn 19')
    expect(links[1].href).toStrictEqual('http://localhost/student/kurser/program/ARKIT/20192/arskurs2?l=en')
    expect(links[2]).toHaveTextContent('Programme syllabus for studies starting in Spring 21')
    expect(links[2].href).toStrictEqual('http://localhost/student/kurser/program/ARKIT/20211/arskurs1?l=en')
    expect(links[3]).toHaveTextContent('Study Handbook 00/01 to 07/08')
    expect(links[3].href).toStrictEqual('http://localhost/student/program/shb?l=en')
    // Footer links
    expect(links[4]).toHaveTextContent('Central study counseling')
    expect(links[4].href).toStrictEqual('https://www.kth.se/en/studies/master/general-study-counselling-1.621634')
    expect(links[5]).toHaveTextContent('kopps@kth.se')
    expect(links[5].href).toStrictEqual('mailto:kopps@kth.se')
  })
  test('check all links on the page in Swedish for a programme which is available for new admission', () => {
    render(<ProgrammeWithLayout lang="sv" />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBe(5)
    // Menu links
    expect(links[0]).toHaveTextContent('Kurs- och programkatalogen')
    expect(links[0].href).toStrictEqual('http://localhost/student/kurser')
    // Main content links
    expect(links[1]).toHaveTextContent('Utbildningsplan kull HT19')
    expect(links[1].href).toStrictEqual('http://localhost/student/kurser/program/ARKIT/20192/arskurs2')
    expect(links[2]).toHaveTextContent('Utbildningsplan kull VT21')
    expect(links[2].href).toStrictEqual('http://localhost/student/kurser/program/ARKIT/20211/arskurs1')
    // Footer links
    expect(links[3]).toHaveTextContent('Central studievägledning')
    expect(links[3].href).toStrictEqual('https://www.kth.se/studievagledning')
    expect(links[4]).toHaveTextContent('kopps@kth.se')
    expect(links[4].href).toStrictEqual('mailto:kopps@kth.se')
  })

  test('check all links on the page in Swedish for a programme without new admission', () => {
    render(<ProgrammeWithLayout lang="sv" lastAdmissionTerm="20212" />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBe(6)
    // Menu links
    expect(links[0]).toHaveTextContent('Kurs- och programkatalogen')
    expect(links[0].href).toStrictEqual('http://localhost/student/kurser')
    // Main content links
    expect(links[1]).toHaveTextContent('Utbildningsplan kull HT19')
    expect(links[1].href).toStrictEqual('http://localhost/student/kurser/program/ARKIT/20192/arskurs2')
    expect(links[2]).toHaveTextContent('Utbildningsplan kull VT21')
    expect(links[2].href).toStrictEqual('http://localhost/student/kurser/program/ARKIT/20211/arskurs1')
    expect(links[3]).toHaveTextContent('Studiehandboken 00/01 tom 07/08')
    expect(links[3].href).toStrictEqual('http://localhost/student/program/shb')
    // Footer links
    expect(links[4]).toHaveTextContent('Central studievägledning')
    expect(links[4].href).toStrictEqual('https://www.kth.se/studievagledning')
    expect(links[5]).toHaveTextContent('kopps@kth.se')
    expect(links[5].href).toStrictEqual('mailto:kopps@kth.se')
  })
})
