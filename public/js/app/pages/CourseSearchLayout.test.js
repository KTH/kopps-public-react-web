import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
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
        path="/student/kurser/kurssok"
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

  test('get page introduction in English', () => {
    render(<CourseSearchWithLayout lang="en" />)
    const content = screen.getByText(
      'This is the official course information at KTH. The courses may be searched by course name, part of name or course code. Courses included in your programme are available using the menu on the left.'
    )
    expect(content).toBeInTheDocument()
  })

  test('get page introduction in Swedish', () => {
    render(<CourseSearchWithLayout lang="sv" />)
    const content = screen.getByText(
      `Här hittar du KTHs officiella kursinformation. Du kan söka bland alla kurser som ges vid KTH genom att ange hela eller delar av kursnamnet eller kurskoden. Information om vilka kurser som ingår i ett program nås via menyn till vänster.`
    )
    expect(content).toBeInTheDocument()
  })

  test('get a label of a text pattern input in English', () => {
    render(<CourseSearchWithLayout lang="en" />)
    const content = screen.getByText('Search by writing in a course code or course name:')
    expect(content).toBeInTheDocument()
  })

  test('get a label of a text pattern input in Swedish', () => {
    render(<CourseSearchWithLayout lang="sv" />)
    const content = screen.getByText(`Ange del av kursnamn eller kurskod:`)
    expect(content).toBeInTheDocument()
  })

  test('get a label of the collapse with other options in English', () => {
    render(<CourseSearchWithLayout lang="en" />)
    const content = screen.getByText('Choose from other search criteria')
    expect(content).toBeInTheDocument()
  })

  test('get a label of the collapse with other options in Swedish', () => {
    render(<CourseSearchWithLayout lang="sv" />)
    const content = screen.getByText(`Välj bland andra sökkriterier`)
    expect(content).toBeInTheDocument()
  })

  // button
  test('get a search button in English', () => {
    render(<CourseSearchWithLayout lang="en" />)
    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('Search course', { exact: true })
  })

  test('get a search button in Swedish', () => {
    render(<CourseSearchWithLayout lang="sv" />)
    const button = screen.getByRole('button')
    expect(button).toHaveTextContent('Sök kurs', { exact: true })
  })

  // search options
  test('get labels of search options in English', () => {
    render(<CourseSearchWithLayout lang="en" />)

    expect(screen.getByText(`Course Start 2021`)).toBeInTheDocument()
    expect(screen.getByText(`Spring 2021 period 3`)).toBeInTheDocument()
    expect(screen.getByText(`Spring 2021 period 4`)).toBeInTheDocument()
    expect(screen.getByText(`2021 summer`)).toBeInTheDocument()
    expect(screen.getByText(`Autumn 2021 period 1`)).toBeInTheDocument()
    expect(screen.getByText(`Autumn 2021 period 2`)).toBeInTheDocument()

    expect(screen.getByText(`Course Start 2022`)).toBeInTheDocument()
    expect(screen.getByText(`Spring 2022 period 3`)).toBeInTheDocument()
    expect(screen.getByText(`Spring 2022 period 4`)).toBeInTheDocument()
    expect(screen.getByText(`2022 summer`)).toBeInTheDocument()

    expect(screen.getByText(`Educational level:`)).toBeInTheDocument()
    expect(screen.getByText(`Pre-university level`)).toBeInTheDocument()
    expect(screen.getByText(`First cycle`)).toBeInTheDocument()
    expect(screen.getByText(`Second cycle`)).toBeInTheDocument()
    expect(screen.getByText(`Third cycle`)).toBeInTheDocument()

    expect(screen.getByText(`Other options:`)).toBeInTheDocument()
    expect(screen.getByText(`Courses taught in English`)).toBeInTheDocument()
    expect(
      screen.getByText(`Courses that deal with environment, environmental technology or sustainable development`)
    ).toBeInTheDocument()
    expect(screen.getByText(`Dormant/Terminated course`)).toBeInTheDocument()

    expect(screen.getByText(`School, department, etc`)).toBeInTheDocument()
  })

  test('get labels of search options in Swedish', () => {
    render(<CourseSearchWithLayout lang="sv" />)

    expect(screen.getByText(`Kursstart 2021`)).toBeInTheDocument()
    expect(screen.getByText(`VT2021 period 3`)).toBeInTheDocument()
    expect(screen.getByText(`VT2021 period 4`)).toBeInTheDocument()
    expect(screen.getByText(`2021 sommar`)).toBeInTheDocument()
    expect(screen.getByText(`HT2021 period 1`)).toBeInTheDocument()
    expect(screen.getByText(`HT2021 period 2`)).toBeInTheDocument()

    expect(screen.getByText(`Kursstart 2022`)).toBeInTheDocument()
    expect(screen.getByText(`VT2022 period 3`)).toBeInTheDocument()
    expect(screen.getByText(`VT2022 period 4`)).toBeInTheDocument()
    expect(screen.getByText(`2022 sommar`)).toBeInTheDocument()

    expect(screen.getByText(`Utbildningsnivå:`)).toBeInTheDocument()
    expect(screen.getByText(`Förberedande nivå`)).toBeInTheDocument()
    expect(screen.getByText(`Grundnivå`)).toBeInTheDocument()
    expect(screen.getByText(`Avancerad nivå`)).toBeInTheDocument()
    expect(screen.getByText(`Forskarnivå`)).toBeInTheDocument()

    expect(screen.getByText(`Övrigt:`)).toBeInTheDocument()
    expect(screen.getByText(`Ges på engelska`)).toBeInTheDocument()
    expect(screen.getByText(`Behandlar miljö, miljöteknik eller hållbar utveckling`)).toBeInTheDocument()
    expect(screen.getByText(`Nedlagd kurs`)).toBeInTheDocument()
    fireEvent.click(screen.getByLabelText(/Nedlagd kurs/i))

    expect(screen.getByText(`Skola, avdelning, etc`)).toBeInTheDocument()
  })

  // search options and its values
  test('get values of search options in English', () => {
    render(<CourseSearchWithLayout lang="en" />)

    expect(screen.getByLabelText(/Spring 2021 period 3/i).value).toBe('20211:3')
    expect(screen.getByLabelText(/Spring 2021 period 4/i).value).toBe('20211:4')
    expect(screen.getByLabelText(/2021 summer/i).value).toBe('2021:summer')
    expect(screen.getByLabelText(/Autumn 2021 period 1/i).value).toBe('20212:1')
    expect(screen.getByLabelText(/Autumn 2021 period 2/i).value).toBe('20212:2')

    expect(screen.getByLabelText(/Spring 2022 period 3/i).value).toBe('20221:3')
    expect(screen.getByLabelText(/Spring 2022 period 4/i).value).toBe('20221:4')
    expect(screen.getByLabelText(/2022 summer/i).value).toBe('2022:summer')

    expect(screen.getByLabelText(/Pre-university level/i).value).toBe('0')
    expect(screen.getByLabelText(/First cycle/i).value).toBe('1')
    expect(screen.getByLabelText(/Second cycle/i).value).toBe('2')
    expect(screen.getByLabelText(/Third cycle/i).value).toBe('3')

    expect(screen.getByLabelText(/Courses taught in English/i).value).toBe('onlyEnglish')
    expect(
      screen.getByLabelText(/Courses that deal with environment, environmental technology or sustainable development/i)
        .value
    ).toBe('onlyMHU')
    expect(screen.getByLabelText(/Dormant\/Terminated course/i).value).toBe('showCancelled')
  })

  test('get values of search options in English', () => {
    render(<CourseSearchWithLayout lang="sv" />)

    expect(screen.getByLabelText(/VT2021 period 3/i).value).toBe('20211:3')
    expect(screen.getByLabelText(/VT2021 period 4/i).value).toBe('20211:4')
    expect(screen.getByLabelText(/2021 sommar/i).value).toBe('2021:summer')
    expect(screen.getByLabelText(/HT2021 period 1/i).value).toBe('20212:1')
    expect(screen.getByLabelText(/HT2021 period 2/i).value).toBe('20212:2')

    expect(screen.getByLabelText(/VT2022 period 3/i).value).toBe('20221:3')
    expect(screen.getByLabelText(/VT2022 period 4/i).value).toBe('20221:4')
    expect(screen.getByLabelText(/2022 sommar/i).value).toBe('2022:summer')

    expect(screen.getByLabelText(/Förberedande nivå/i).value).toBe('0')
    expect(screen.getByLabelText(/Grundnivå/i).value).toBe('1')
    expect(screen.getByLabelText(/Avancerad nivå/i).value).toBe('2')
    expect(screen.getByLabelText(/Forskarnivå/i).value).toBe('3')

    expect(screen.getByLabelText(/Ges på engelska/i).value).toBe('onlyEnglish')
    expect(screen.getByLabelText(/Behandlar miljö, miljöteknik eller hållbar utveckling/i).value).toBe('onlyMHU')
    expect(screen.getByLabelText(/Nedlagd kurs/i).value).toBe('showCancelled')
  })

  // search options and its checked status
  test('get checked status of checkboxes for search options in English', () => {
    render(<CourseSearchWithLayout lang="en" />)

    expect(screen.getByLabelText(/Spring 2021 period 3/i)).not.toBeChecked()
    expect(screen.getByLabelText(/Spring 2021 period 4/i)).not.toBeChecked()
    expect(screen.getByLabelText(/2021 summer/i)).not.toBeChecked()
    expect(screen.getByLabelText(/Autumn 2021 period 1/i)).not.toBeChecked()
    expect(screen.getByLabelText(/Autumn 2021 period 2/i)).not.toBeChecked()

    expect(screen.getByLabelText(/Spring 2022 period 3/i)).not.toBeChecked()
    expect(screen.getByLabelText(/Spring 2022 period 4/i)).not.toBeChecked()
    expect(screen.getByLabelText(/2022 summer/i)).not.toBeChecked()

    expect(screen.getByLabelText(/Pre-university level/i)).not.toBeChecked()
    expect(screen.getByLabelText(/First cycle/i)).not.toBeChecked()
    expect(screen.getByLabelText(/Second cycle/i)).not.toBeChecked()
    expect(screen.getByLabelText(/Third cycle/i)).not.toBeChecked()

    expect(screen.getByLabelText(/Courses taught in English/i)).not.toBeChecked()
    expect(
      screen.getByLabelText(/Courses that deal with environment, environmental technology or sustainable development/i)
    ).not.toBeChecked()
    expect(screen.getByLabelText(/Dormant\/Terminated course/i)).not.toBeChecked()
  })

  test('get checked status of checkboxes for search options in Swedish', () => {
    render(<CourseSearchWithLayout lang="en" />)

    expect(screen.getByLabelText(/Spring 2021 period 3/i)).not.toBeChecked()
    expect(screen.getByLabelText(/Spring 2021 period 4/i)).not.toBeChecked()
    expect(screen.getByLabelText(/2021 summer/i)).not.toBeChecked()
    expect(screen.getByLabelText(/Autumn 2021 period 1/i)).not.toBeChecked()
    expect(screen.getByLabelText(/Autumn 2021 period 2/i)).not.toBeChecked()

    expect(screen.getByLabelText(/Spring 2022 period 3/i)).not.toBeChecked()
    expect(screen.getByLabelText(/Spring 2022 period 4/i)).not.toBeChecked()
    expect(screen.getByLabelText(/2022 summer/i)).not.toBeChecked()

    expect(screen.getByLabelText(/Pre-university level/i)).not.toBeChecked()
    expect(screen.getByLabelText(/First cycle/i)).not.toBeChecked()
    expect(screen.getByLabelText(/Second cycle/i)).not.toBeChecked()
    expect(screen.getByLabelText(/Third cycle/i)).not.toBeChecked()

    expect(screen.getByLabelText(/Courses taught in English/i)).not.toBeChecked()
    expect(
      screen.getByLabelText(/Courses that deal with environment, environmental technology or sustainable development/i)
    ).not.toBeChecked()
    expect(screen.getByLabelText(/Dormant\/Terminated course/i)).not.toBeChecked()
  })
})
