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

expect.extend(toHaveNoViolations)

const applicationStore = createApplicationStore()

const testProxyPath = '/kopps-public'
const proxyPrefixPath = { uri: testProxyPath }
const testProgrammeCode = 'ARKIT'
const testProgrammeName = {
  sv: 'Arkitektutbildning',
  en: 'Degree Programme in Architecture',
}
const testLengthInStudyYears = 5
const testProgrammeTerms = ['20192', '20211']

const WrapperProgramme = ({ lang }) => {
  applicationStore.setLanguage(lang)
  const programmeMenuData = getProgrammeMenuData(lang, testProxyPath)

  const updatedApplicationStore = {
    ...applicationStore,
  }
  return (
    <StaticRouter>
      <MobxStoreProvider initCallback={() => updatedApplicationStore}>
        <RouteWrapper
          exact
          path="/student/kurser/program/CLGYM"
          breadcrumbs={{ include: 'directory' }}
          component={Programme}
          layout={PageLayout}
          menuData={{ selectedId: 'studyYears', ...programmeMenuData }}
        />
      </MobxStoreProvider>
    </StaticRouter>
  )
}

const ProgrammeWithLayout = ({ lang }) => {
  applicationStore.setLanguage(lang)
  applicationStore.setBrowserConfig({ proxyPrefixPath })
  applicationStore.setProgrammeCode(testProgrammeCode)
  applicationStore.setProgrammeName(testProgrammeName[lang])
  applicationStore.setLengthInStudyYears(testLengthInStudyYears)
  applicationStore.setProgrammeTerms(testProgrammeTerms)
  const programmeMenuData = getProgrammeMenuData(lang, testProxyPath)

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
  test('check all links on the page in English', () => {
    render(<ProgrammeWithLayout lang="en" />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBe(5)
    // Menu links
    expect(links[0]).toHaveTextContent('Course and programme directory')
    expect(links[0].href).toStrictEqual('http://localhost/kopps-public/student/kurser/org?l=en')
    // Main content links
    expect(links[1]).toHaveTextContent('Programme syllabus for studies starting in Autumn 19')
    expect(links[1].href).toStrictEqual(
      'http://localhost/kopps-public/student/kurser/program/ARKIT/20192/arskurs2?l=en'
    )
    expect(links[2]).toHaveTextContent('Programme syllabus for studies starting in Spring 21')
    expect(links[2].href).toStrictEqual(
      'http://localhost/kopps-public/student/kurser/program/ARKIT/20211/arskurs1?l=en'
    )
    // Footer links
    expect(links[3]).toHaveTextContent('Central study counseling')
    expect(links[3].href).toStrictEqual('https://www.kth.se/studycounselling')
    expect(links[4]).toHaveTextContent('kopps@kth.se')
    expect(links[4].href).toStrictEqual('mailto:kopps@kth.se')
  })
  test('check all links on the page in Swedish', () => {
    render(<ProgrammeWithLayout lang="sv" />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBe(5)
    // Menu links
    expect(links[0]).toHaveTextContent('Kurs- och programkatalogen')
    expect(links[0].href).toStrictEqual('http://localhost/kopps-public/student/kurser/org')
    // Main content links
    expect(links[1]).toHaveTextContent('Utbildningsplan kull HT19')
    expect(links[1].href).toStrictEqual('http://localhost/kopps-public/student/kurser/program/ARKIT/20192/arskurs2')
    expect(links[2]).toHaveTextContent('Utbildningsplan kull VT21')
    expect(links[2].href).toStrictEqual('http://localhost/kopps-public/student/kurser/program/ARKIT/20211/arskurs1')
    // Footer links
    expect(links[3]).toHaveTextContent('Central studievägledning')
    expect(links[3].href).toStrictEqual('https://www.kth.se/studycounselling')
    expect(links[4]).toHaveTextContent('kopps@kth.se')
    expect(links[4].href).toStrictEqual('mailto:kopps@kth.se')
  })
})
