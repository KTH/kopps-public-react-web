import React from 'react'
import { render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import TableView from './TableView'
import { useStore } from '../../mobx'
import {
  EXPECTED_TEST_SEARCH_HITS_MIXED_EN,
  EXPECTED_TEST_SEARCH_HITS_MIXED_SV,
  EXPECTED_TEST_SEARCH_HITS_MIXED_PERIODS_TEXTS_EN,
  EXPECTED_TEST_SEARCH_HITS_MIXED_PERIODS_TEXTS_SV,
  TEST_SEARCH_HITS_MIXED_EN,
  TEST_SEARCH_HITS_MIXED_SV,
  TEST_SEARCH_RESEARCH_THIRD_CYCLE_COURSES_SV,
  TEST_SEARCH_RESEARCH_THIRD_CYCLE_COURSES_EN,
  EXPECTED_TEST_SEARCH_HITS_MIXED_PERIODS_TEXTS_EN_new,
  EXPECTED_TEST_SEARCH_HITS_MIXED_PERIODS_TEXTS_SV_new,
} from '../mocks/mockSearchHits'

jest.mock('../../mobx')

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
} as any

describe('Component <TableView> for RESEARCH courses', () => {
  test('creates a table with 4 columns for RESEARCH courses (without column for period intervals). English. 1A', () => {
    ;(useStore as jest.Mock).mockReturnValue({ language: 'en', languageIndex: 0 })

    render(<TableView results={TEST_SEARCH_RESEARCH_THIRD_CYCLE_COURSES_EN.searchHits} />)

    const rows = screen.queryAllByRole('row')
    const columnHeaders = screen.getAllByRole('columnheader')
    expect(rows).toHaveLength(4) // 3 courses + 1 header row
    expect(columnHeaders).toHaveLength(4)

    columnHeaders.forEach((colHeader, index) => {
      expect(colHeader).toHaveTextContent(reseacrhHitsColHeaders.en[index])
    })

    rows.slice(1).forEach((row, index) => {
      const utils = within(row)
      const { course } = TEST_SEARCH_RESEARCH_THIRD_CYCLE_COURSES_EN.searchHits[index]
      expect(utils.getAllByRole('cell')[0]).toHaveTextContent(course.courseCode)
      expect(utils.getAllByRole('cell')[1]).toHaveTextContent(course.title)
      expect(utils.getAllByRole('cell')[2]).toHaveTextContent(`${course.credits} ${course.creditUnitAbbr}`)
      expect(utils.getAllByRole('cell')[3]).toHaveTextContent('Third cycle')
    })
  })

  test('creates a table with 4 columns for RESEARCH courses (without column for period intervals). Swedish. 2A', () => {
    ;(useStore as jest.Mock).mockReturnValue({ language: 'sv', languageIndex: 1 })

    render(<TableView results={TEST_SEARCH_RESEARCH_THIRD_CYCLE_COURSES_SV.searchHits} />)

    const rows = screen.queryAllByRole('row')
    const columnHeaders = screen.getAllByRole('columnheader')
    expect(rows).toHaveLength(4) // 3 courses + 1 header row
    expect(columnHeaders).toHaveLength(4)

    columnHeaders.forEach((colHeader, index) => {
      expect(colHeader).toHaveTextContent(reseacrhHitsColHeaders.sv[index])
    })

    rows.slice(1).forEach((row, index) => {
      const utils = within(row)
      const { course } = TEST_SEARCH_RESEARCH_THIRD_CYCLE_COURSES_SV.searchHits[index]
      expect(utils.getAllByRole('cell')[0]).toHaveTextContent(course.courseCode)
      expect(utils.getAllByRole('cell')[1]).toHaveTextContent(course.title)
      expect(utils.getAllByRole('cell')[2]).toHaveTextContent(`${course.credits} ${course.creditUnitAbbr}`)
      expect(utils.getAllByRole('cell')[3]).toHaveTextContent('Forskarnivå')
    })
  })
})

describe('Component <TableView> for MIXED types of courses', () => {
  test('creates a table with 5 columns for mixed types of courses (including column for period intervals). English. 1B', () => {
    ;(useStore as jest.Mock).mockReturnValue({ language: 'en', languageIndex: 0 })

    render(<TableView results={TEST_SEARCH_HITS_MIXED_EN.searchHits} />)

    const rows = screen.queryAllByRole('row')
    const columnHeaders = screen.getAllByRole('columnheader')
    expect(rows).toHaveLength(6) // 5 courses + 1 header row
    expect(columnHeaders).toHaveLength(5)

    columnHeaders.forEach((colHeader, index) => {
      expect(colHeader).toHaveTextContent(mixedHitsColHeaders.en[index])
    })

    rows.slice(1).forEach((row, index) => {
      const utils = within(row)
      const { course } = EXPECTED_TEST_SEARCH_HITS_MIXED_EN.searchHits[index]
      expect(utils.getAllByRole('cell')[0]).toHaveTextContent(course.courseCode)
      expect(utils.getAllByRole('cell')[1]).toHaveTextContent(course.title)
      expect(utils.getAllByRole('cell')[2]).toHaveTextContent(`${course.credits} ${course.creditUnitAbbr}`)
      expect(utils.getAllByRole('cell')[3]).toHaveTextContent(
        course.educationalLevel ? eduLevelTranslations.EN[course.educationalLevel] : ''
      )
      expect(utils.getAllByRole('cell')[4]).toHaveTextContent(EXPECTED_TEST_SEARCH_HITS_MIXED_PERIODS_TEXTS_EN_new[index])
    })
  })

  test('creates a table with 5 columns for MIXED types of courses (including column for period intervals). Swedish. 2B', () => {
    ;(useStore as jest.Mock).mockReturnValue({ language: 'sv', languageIndex: 1 })

    render(<TableView results={TEST_SEARCH_HITS_MIXED_SV.searchHits} />)

    const rows = screen.queryAllByRole('row')
    const columnHeaders = screen.getAllByRole('columnheader')
    expect(rows).toHaveLength(6) // 5 courses + 1 header row
    expect(columnHeaders).toHaveLength(5)

    columnHeaders.forEach((colHeader, index) => {
      expect(colHeader).toHaveTextContent(mixedHitsColHeaders.sv[index])
    })

    rows.slice(1).forEach((row, index) => {
      const utils = within(row)
      const { course } = EXPECTED_TEST_SEARCH_HITS_MIXED_SV.searchHits[index]
      expect(utils.getAllByRole('cell')[0]).toHaveTextContent(course.courseCode)
      expect(utils.getAllByRole('cell')[1]).toHaveTextContent(course.title)
      expect(utils.getAllByRole('cell')[2]).toHaveTextContent(`${course.credits} ${course.creditUnitAbbr}`)
      expect(utils.getAllByRole('cell')[3]).toHaveTextContent(
        course.educationalLevel ? eduLevelTranslations.SV[course.educationalLevel] : ''
      )
      expect(utils.getAllByRole('cell')[4]).toHaveTextContent(EXPECTED_TEST_SEARCH_HITS_MIXED_PERIODS_TEXTS_SV_new[index])
    })
  })
})
