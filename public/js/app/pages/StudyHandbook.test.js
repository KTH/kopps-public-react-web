import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { StaticRouter } from 'react-router'
import { MobxStoreProvider } from '../mobx'

import StudyHandbook from './StudyHandbook'
import RouteWrapper from '../components/RouteWrapper'
import PageLayout from '../layout/PageLayout'

import createApplicationStore from '../stores/createApplicationStore'
const applicationStore = createApplicationStore()

const { getAllByRole, getAllByTestId, getAllByText, getByTestId, getByText } = screen

import getMenuData from '../config/menuData'

const testProxyPath = 'localhost://kopps-public'

const WrapperStudyHandbook = ({ lang, ...rest }) => {
  applicationStore.setLanguage(lang)
  const menuData = getMenuData(lang, testProxyPath) //move to mocks

  const updatedApplicationStore = {
    ...applicationStore,
  }
  return (
    <StaticRouter>
      <MobxStoreProvider initCallback={() => updatedApplicationStore}>
        <RouteWrapper
          exact
          path="/student/program/shb"
          component={StudyHandbook}
          breadcrumbs={{ include: 'directory' }}
          layout={PageLayout}
          menuData={{ selectedId: 'shb', ...menuData }}
          {...rest}
        />
      </MobxStoreProvider>
    </StaticRouter>
  )
}

const StudyHandbookWithLayout = ({ lang, ...rest }) => {
  applicationStore.setLanguage(lang)
  const menuData = getMenuData(lang, testProxyPath) //move to mocks

  const updatedApplicationStore = {
    ...applicationStore,
  }
  return (
    <StaticRouter>
      <MobxStoreProvider initCallback={() => updatedApplicationStore}>
        <PageLayout breadcrumbs={{ include: 'directory' }} menuData={{ selectedId: 'shb', ...menuData }}>
          <StudyHandbook />
        </PageLayout>
      </MobxStoreProvider>
    </StaticRouter>
  )
}

describe('Render component StudyHandbook within RouterWrapper', () => {
  test('simple render', done => {
    render(<WrapperStudyHandbook lang="en" />)
    done()
  })
})

describe('Check if getMenuData is correctly fetching menuData', () => {
  test('simple render', done => {
    render(<WrapperStudyHandbook lang="en" />)
    done()
  })
})

describe('Render component StudyHandbook within Layout', () => {
  test('get page header in English', () => {
    render(<StudyHandbookWithLayout lang="en" />)
    const h1Header = screen.getByRole('heading', { level: 1 })
    expect(h1Header).toHaveTextContent('Study Handbook 00/01 to 07/08')
  })

  test('get page header in Swedish', () => {
    render(<StudyHandbookWithLayout lang="sv" />)
    const h1Header = screen.getByRole('heading', { level: 1 })
    expect(h1Header).toHaveTextContent('Studiehandboken 00/01 tom 07/08')
  })

  test('match to snapshot in English', done => {
    const { asFragment } = render(<StudyHandbookWithLayout lang="en" />)
    expect(asFragment()).toMatchSnapshot()

    done()
  })

  test('match to snapshot in Swedish', done => {
    const { asFragment } = render(<StudyHandbookWithLayout lang="sv" />)
    expect(asFragment()).toMatchSnapshot()

    done()
  })
})

describe('Render component StudyHandbook and check its menu, content and links', () => {
  test('check all links on the page', () => {
    render(<StudyHandbookWithLayout lang="en" />)
    const links = screen.getAllByRole('link')
    expect(links.length).toBe(7)
    expect(links[0]).toHaveTextContent('Student at KTH')
    expect(links[0].href).toStrictEqual('http://localhost/student/?l=en')

    expect(links[1]).toHaveTextContent('Courses Part of Programme')
    expect(links[1].href).toStrictEqual('localhost://kopps-public/student/kurser/kurser-inom-program')

    expect(links[2]).toHaveTextContent('Courses by school')
    expect(links[2].href).toStrictEqual('localhost://kopps-public/student/kurser/org')

    expect(links[3]).toHaveTextContent('Study Handbook 00/01 to 07/08') // menu link
    expect(links[3].href).toStrictEqual('localhost://kopps-public/student/program/shb')

    expect(links[4]).toHaveTextContent('Study Handbook 00/01 to 07/08') // content link
    expect(links[4].href).toStrictEqual('https://intra.kth.se/utbildning/utbildningsadministr/kopps/shb')

    expect(links[5]).toHaveTextContent('Central study counseling')
    expect(links[5].href).toStrictEqual('https://www.kth.se/studycounselling')

    expect(links[6]).toHaveTextContent('kopps@kth.se')
    expect(links[6].href).toStrictEqual('mailto:kopps@kth.se')
  })

  test('get page header in Swedish', () => {
    render(<StudyHandbookWithLayout lang="sv" />)
    const content = screen.getByText(
      'Fram till läsåret 2007/2008 fanns information om program och kurser i studiehandboken.'
    )
    expect(content).toBeInTheDocument()
  })
})
