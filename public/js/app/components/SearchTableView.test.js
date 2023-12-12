import React from 'react'
import { render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import SearchTableView from './SearchTableView'
import { useStore } from '../mobx'
import {
  EXPECTED_TEST_SEARCH_HITS_MIXED_EN,
  EXPECTED_TEST_SEARCH_HITS_MIXED_SV,
  EXPECTED_TEST_SEARCH_HITS_MIXED_PERIODS_TEXTS_EN,
  EXPECTED_TEST_SEARCH_HITS_MIXED_PERIODS_TEXTS_SV,
  TEST_SEARCH_HITS_MIXED_EN,
  TEST_SEARCH_HITS_MIXED_SV,
  TEST_SEARCH_RESEARCH_THIRD_CYCLE_COURSES_SV,
  TEST_SEARCH_RESEARCH_THIRD_CYCLE_COURSES_EN,
} from './mocks/mockSearchHits'

jest.mock('../mobx')

const reseacrhHitsColHeaders = {
  en: ['Course code', 'Course name', 'Scope', 'Educational level'],
  sv: ['Kurskod', 'Kursnamn', 'Omfattning', 'Utbildningsnivå'],
}
const mixedHitsColHeaders = {
  en: [...reseacrhHitsColHeaders.en, 'Periods'],
  sv: [...reseacrhHitsColHeaders.sv, 'Perioder'],
}
const eduLevelTranslations = {
  EN: { PREPARATORY: 'Pre-university level', BASIC: 'First cycle', ADVANCED: 'Second cycle', RESEARCH: 'Third cycle' },
  SV: { PREPARATORY: 'Förberedande nivå', BASIC: 'Grundnivå', ADVANCED: 'Avancerad nivå', RESEARCH: 'Forskarnivå' },
}

describe('Component <SearchTableView> for RESEARCH courses', () => {
  test('creates a table with 4 columns for RESEARCH courses (without column for period intervals). English. 1A', () => {
    useStore.mockReturnValue({ language: 'en', languageIndex: 0 })
    const { asFragment } = render(
      <SearchTableView unsortedSearchResults={TEST_SEARCH_RESEARCH_THIRD_CYCLE_COURSES_EN} />
    )

    expect(asFragment()).toMatchSnapshot()
    // or more detailed
    expect(screen.getByTestId('number-of-results')).toHaveTextContent('Your search returned 3 result(s).')

    const rows = screen.queryAllByRole('row')
    const columnHeaders = screen.getAllByRole('columnheader')
    const contentCells = screen.queryAllByRole('cell')
    expect(rows).toHaveLength(4)
    expect(columnHeaders).toHaveLength(4)
    expect(contentCells).toHaveLength(12)

    try {
      columnHeaders.map((colHeader, index) => expect(colHeader).toHaveTextContent(reseacrhHitsColHeaders.en[index]))
    } catch (error) {
      error.message = `${`Table head row missing a correct translations. List of correct translations ${reseacrhHitsColHeaders.en.join(
        ', '
      )}`}\n\n ${error}`

      throw error
    }

    try {
      rows.slice(1).forEach((row, index) => {
        const utils = within(row)
        const { course } = TEST_SEARCH_RESEARCH_THIRD_CYCLE_COURSES_EN.searchHits[index]
        expect(utils.getAllByRole('cell')[0]).toHaveTextContent(course.courseCode, { exact: true })
        expect(utils.getAllByRole('cell')[1]).toHaveTextContent(course.title, { exact: true })
        expect(utils.getAllByRole('cell')[2]).toHaveTextContent(`${course.credits} ${course.creditUnitAbbr}`, {
          exact: true,
        })
        expect(utils.getAllByRole('cell')[3]).toHaveTextContent('Third cycle')
      })
    } catch (error) {
      error.message = `${`Courses has been rendered incorrect. Course content in the table is differ from an expected content`}\n\n ${error}`

      throw error
    }
  })

  test('creates a table with 4 columns for RESEARCH courses (without column for period intervals). Swedish. 2A', () => {
    useStore.mockReturnValue({ language: 'sv', languageIndex: 1 })
    const { asFragment } = render(
      <SearchTableView unsortedSearchResults={TEST_SEARCH_RESEARCH_THIRD_CYCLE_COURSES_SV} />
    )

    expect(asFragment()).toMatchSnapshot()
    // // or
    // or more detailed
    expect(screen.getByTestId('number-of-results')).toHaveTextContent('Din sökning gav 3 resultat.')

    const rows = screen.queryAllByRole('row')
    const columnHeaders = screen.getAllByRole('columnheader')
    const contentCells = screen.queryAllByRole('cell')
    expect(rows).toHaveLength(4)
    expect(columnHeaders).toHaveLength(4)
    expect(contentCells).toHaveLength(12)

    try {
      columnHeaders.map((colHeader, index) => expect(colHeader).toHaveTextContent(reseacrhHitsColHeaders.sv[index]))
    } catch (error) {
      error.message = `${`Table head row missing a correct translations. List of correct translations ${reseacrhHitsColHeaders.sv.join(
        ', '
      )}`}\n\n ${error}`

      throw error
    }

    try {
      rows.slice(1).forEach((row, index) => {
        const utils = within(row)
        const { course } = TEST_SEARCH_RESEARCH_THIRD_CYCLE_COURSES_SV.searchHits[index]
        expect(utils.getAllByRole('cell')[0]).toHaveTextContent(course.courseCode, { exact: true })
        expect(utils.getAllByRole('cell')[1]).toHaveTextContent(course.title, { exact: true })
        expect(utils.getAllByRole('cell')[2]).toHaveTextContent(`${course.credits} ${course.creditUnitAbbr}`, {
          exact: true,
        })
        expect(utils.getAllByRole('cell')[3]).toHaveTextContent('Forskarnivå')
      })
    } catch (error) {
      error.message = `${`Courses has been rendered incorrect. Course content in the table is differ from an expected content`}\n\n ${error}`

      throw error
    }
  })

  test('creates a table with 5 columns for mixed types of courses (include column for period intervals). English. 1B', () => {
    useStore.mockReturnValue({ language: 'en', languageIndex: 0 })
    const { asFragment } = render(
      <SearchTableView unsortedSearchResults={TEST_SEARCH_RESEARCH_THIRD_CYCLE_COURSES_EN} />
    )

    expect(asFragment()).toMatchSnapshot()
    // or more detailed
    expect(screen.getByTestId('number-of-results')).toHaveTextContent('Your search returned 3 result(s).')

    const rows = screen.queryAllByRole('row')
    const columnHeaders = screen.getAllByRole('columnheader')
    const contentCells = screen.queryAllByRole('cell')
    expect(rows).toHaveLength(4)
    expect(columnHeaders).toHaveLength(4)
    expect(contentCells).toHaveLength(12)

    try {
      columnHeaders.map((colHeader, index) => expect(colHeader).toHaveTextContent(reseacrhHitsColHeaders.en[index]))
    } catch (error) {
      error.message = `${`Table head row missing a correct translations. List of correct translations ${reseacrhHitsColHeaders.en.join(
        ', '
      )}`}\n\n ${error}`

      throw error
    }

    try {
      rows.slice(1).forEach((row, index) => {
        const utils = within(row)
        const { course } = TEST_SEARCH_RESEARCH_THIRD_CYCLE_COURSES_EN.searchHits[index]
        expect(utils.getAllByRole('cell')[0]).toHaveTextContent(course.courseCode, { exact: true })
        expect(utils.getAllByRole('cell')[1]).toHaveTextContent(course.title, { exact: true })
        expect(utils.getAllByRole('cell')[2]).toHaveTextContent(`${course.credits} ${course.creditUnitAbbr}`, {
          exact: true,
        })
        expect(utils.getAllByRole('cell')[3]).toHaveTextContent('Third cycle')
      })
    } catch (error) {
      error.message = `${`Courses has been rendered incorrect. Course content in the table is differ from an expected content`}\n\n ${error}`

      throw error
    }
  })
})

describe('Component <SearchTableView> for MIXED types of courses', () => {
  test('creates a table with 5 columns for mixed types of courses (include column for period intervals). English. 1B', () => {
    useStore.mockReturnValue({ language: 'en', languageIndex: 0 })
    const { asFragment } = render(<SearchTableView unsortedSearchResults={TEST_SEARCH_HITS_MIXED_EN} />)

    expect(asFragment()).toMatchSnapshot()
    // or more detailed
    expect(screen.getByTestId('number-of-results')).toHaveTextContent('Your search returned 5 result(s).')

    const rows = screen.queryAllByRole('row')
    const columnHeaders = screen.getAllByRole('columnheader')
    const contentCells = screen.queryAllByRole('cell')
    expect(rows).toHaveLength(6)
    expect(columnHeaders).toHaveLength(5)
    expect(contentCells).toHaveLength(25)

    try {
      columnHeaders.map((colHeader, index) => expect(colHeader).toHaveTextContent(mixedHitsColHeaders.en[index]))
    } catch (error) {
      error.message = `${`Table head row missing a correct translations. List of correct translations ${mixedHitsColHeaders.en.join(
        ', '
      )}`}\n\n ${error}`

      throw error
    }

    try {
      rows.slice(1).forEach((row, index) => {
        const utils = within(row)
        const { course } = EXPECTED_TEST_SEARCH_HITS_MIXED_EN.searchHits[index]
        expect(utils.getAllByRole('cell')[0]).toHaveTextContent(course.courseCode, { exact: true })
        expect(utils.getAllByRole('cell')[1]).toHaveTextContent(course.title, { exact: true })
        expect(utils.getAllByRole('cell')[2]).toHaveTextContent(`${course.credits} ${course.creditUnitAbbr}`, {
          exact: true,
        })
        expect(utils.getAllByRole('cell')[3]).toHaveTextContent(
          course.educationalLevel ? eduLevelTranslations.EN[course.educationalLevel] : '',
          { exact: true }
        )
        expect(utils.getAllByRole('cell')[4]).toHaveTextContent(
          EXPECTED_TEST_SEARCH_HITS_MIXED_PERIODS_TEXTS_EN[index],
          { exact: true }
        )
      })
    } catch (error) {
      error.message = `${`Courses has been rendered incorrect. Course content in the table is differ from an expected content`}\n\n ${error}`

      throw error
    }
  })

  test('creates a table with 5 columns for MIXED type of courses (include a column for period intervals). Swedish. 2B', () => {
    useStore.mockReturnValue({ language: 'sv', languageIndex: 1 })
    const { asFragment } = render(<SearchTableView unsortedSearchResults={TEST_SEARCH_HITS_MIXED_SV} />)

    expect(asFragment()).toMatchSnapshot()
    // // or
    // or more detailed
    expect(screen.getByTestId('number-of-results')).toHaveTextContent('Din sökning gav 5 resultat.')

    const rows = screen.queryAllByRole('row')
    const columnHeaders = screen.getAllByRole('columnheader')
    const contentCells = screen.queryAllByRole('cell')
    expect(rows).toHaveLength(6)
    expect(columnHeaders).toHaveLength(5)
    expect(contentCells).toHaveLength(25)

    try {
      columnHeaders.map((colHeader, index) => expect(colHeader).toHaveTextContent(mixedHitsColHeaders.sv[index]))
    } catch (error) {
      error.message = `${`Table head row missing a correct translations. List of correct translations ${mixedHitsColHeaders.sv.join(
        ', '
      )}`}\n\n ${error}`

      throw error
    }

    try {
      rows.slice(1).forEach((row, index) => {
        const utils = within(row)
        const { course } = EXPECTED_TEST_SEARCH_HITS_MIXED_SV.searchHits[index]
        expect(utils.getAllByRole('cell')[0]).toHaveTextContent(course.courseCode, { exact: true })
        expect(utils.getAllByRole('cell')[1]).toHaveTextContent(course.title, { exact: true })
        expect(utils.getAllByRole('cell')[2]).toHaveTextContent(`${course.credits} ${course.creditUnitAbbr}`, {
          exact: true,
        })
        expect(utils.getAllByRole('cell')[3]).toHaveTextContent(
          course.educationalLevel ? eduLevelTranslations.SV[course.educationalLevel] : '',
          { exact: true }
        )
        expect(utils.getAllByRole('cell')[4]).toHaveTextContent(
          EXPECTED_TEST_SEARCH_HITS_MIXED_PERIODS_TEXTS_SV[index],
          { exact: true }
        )
      })
    } catch (error) {
      error.message = `${`Courses has been rendered incorrectly. Course content in the table is differ from an expected content`}\n\n ${error}`

      throw error
    }
  })
})
