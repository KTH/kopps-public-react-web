import React from 'react'
import { render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import TableView from './TableView'
import { useStore } from '../../mobx'
import {
  EXPECTED_TEST_SEARCH_HITS_MIXED_EN_BETA,
  EXPECTED_TEST_SEARCH_HITS_MIXED_SV_BETA,
  TEST_SEARCH_HITS_MIXED_EN_BETA,
  TEST_SEARCH_HITS_MIXED_SV_BETA,
  TEST_SEARCH_RESEARCH_THIRD_CYCLE_COURSES_SV_BETA,
  TEST_SEARCH_RESEARCH_THIRD_CYCLE_COURSES_EN_BETA,
  EXPECTED_TEST_SEARCH_HITS_MIXED_PERIODS_TEXTS_EN_BETA,
  EXPECTED_TEST_SEARCH_HITS_MIXED_PERIODS_TEXTS_SV_BETA,
} from '../mocks/mockSearchHits'

jest.mock('../../mobx')

const headers = {
  en: ['Course code', 'Course name', 'Scope', 'Educational level', 'Language', 'Pace', 'Campus', 'Periods'],
  sv: ['Kurskod', 'Kursnamn', 'Omfattning', 'Utbildningsnivå', 'Språk', 'Takt', 'Campus', 'Perioder'],
}
const reseacrhHitsColHeaders = headers
const mixedHitsColHeaders = headers

const eduLevelTranslations = {
  EN: { PREPARATORY: 'Pre-university level', BASIC: 'First cycle', ADVANCED: 'Second cycle', RESEARCH: 'Third cycle' },
  SV: { PREPARATORY: 'Förberedande nivå', BASIC: 'Grundnivå', ADVANCED: 'Avancerad nivå', RESEARCH: 'Forskarnivå' },
} as any

describe('Component <TableView> for RESEARCH courses', () => {
  test('creates a table with 4 columns for RESEARCH courses (without column for period intervals). English. 1A', () => {
    ;(useStore as jest.Mock).mockReturnValue({ language: 'en', languageIndex: 0 })

    render(<TableView results={TEST_SEARCH_RESEARCH_THIRD_CYCLE_COURSES_EN_BETA.searchHits} />)

    const rows = screen.queryAllByRole('row')
    const columnHeaders = screen.getAllByRole('columnheader')
    expect(rows).toHaveLength(4) // 3 courses + 1 header row
    expect(columnHeaders).toHaveLength(8)

    columnHeaders.forEach((colHeader, index) => {
      expect(colHeader).toHaveTextContent(reseacrhHitsColHeaders.en[index])
    })

    rows.slice(1).forEach((row, index) => {
      const utils = within(row)
      const course = TEST_SEARCH_RESEARCH_THIRD_CYCLE_COURSES_EN_BETA.searchHits[index]
      expect(utils.getAllByRole('cell')[0]).toHaveTextContent(course.kod)
      expect(utils.getAllByRole('cell')[1]).toHaveTextContent(course.benamning)
      expect(utils.getAllByRole('cell')[2]).toHaveTextContent(
        `${course.omfattning} ${course.utbildningstyp.creditsUnit.code.toLocaleLowerCase()}`
      )
      expect(utils.getAllByRole('cell')[3]).toHaveTextContent('Third cycle')
    })
  })

  test('creates a table with 4 columns for RESEARCH courses (without column for period intervals). Swedish. 2A', () => {
    ;(useStore as jest.Mock).mockReturnValue({ language: 'sv', languageIndex: 1 })

    render(<TableView results={TEST_SEARCH_RESEARCH_THIRD_CYCLE_COURSES_SV_BETA.searchHits} />)

    const rows = screen.queryAllByRole('row')
    const columnHeaders = screen.getAllByRole('columnheader')
    expect(rows).toHaveLength(4) // 3 courses + 1 header row
    expect(columnHeaders).toHaveLength(8)

    columnHeaders.forEach((colHeader, index) => {
      expect(colHeader).toHaveTextContent(reseacrhHitsColHeaders.sv[index])
    })

    rows.slice(1).forEach((row, index) => {
      const utils = within(row)
      const course = TEST_SEARCH_RESEARCH_THIRD_CYCLE_COURSES_SV_BETA.searchHits[index]
      expect(utils.getAllByRole('cell')[0]).toHaveTextContent(course.kod)
      expect(utils.getAllByRole('cell')[1]).toHaveTextContent(course.benamning)
      expect(utils.getAllByRole('cell')[2]).toHaveTextContent(
        `${course.omfattning} ${course.utbildningstyp.creditsUnit.code.toLocaleLowerCase()}`
      )
      expect(utils.getAllByRole('cell')[3]).toHaveTextContent('Forskarnivå')
    })
  })
})

describe('Component <TableView> for MIXED types of courses', () => {
  test('creates a table with 5 columns for mixed types of courses (including column for period intervals). English. 1B', () => {
    ;(useStore as jest.Mock).mockReturnValue({ language: 'en', languageIndex: 0 })

    render(<TableView results={TEST_SEARCH_HITS_MIXED_EN_BETA.searchHits} />)

    const rows = screen.queryAllByRole('row')
    const columnHeaders = screen.getAllByRole('columnheader')
    expect(rows).toHaveLength(6) // 5 courses + 1 header row
    expect(columnHeaders).toHaveLength(8)

    columnHeaders.forEach((colHeader, index) => {
      expect(colHeader).toHaveTextContent(mixedHitsColHeaders.en[index])
    })

    rows.slice(1).forEach((row, index) => {
      const utils = within(row)
      const course = EXPECTED_TEST_SEARCH_HITS_MIXED_EN_BETA.searchHits[index]
      expect(utils.getAllByRole('cell')[0]).toHaveTextContent(course.kod)
      expect(utils.getAllByRole('cell')[1]).toHaveTextContent(course.benamning)
      expect(utils.getAllByRole('cell')[2]).toHaveTextContent(
        `${course.omfattning} ${course.utbildningstyp.creditsUnit.code.toLocaleLowerCase()}`
      )
      expect(utils.getAllByRole('cell')[3]).toHaveTextContent(course.utbildningstyp.level.name)
      expect(utils.getAllByRole('cell')[7]).toHaveTextContent(
        EXPECTED_TEST_SEARCH_HITS_MIXED_PERIODS_TEXTS_EN_BETA[index]
      )
    })
  })

  test('creates a table with 8 columns for MIXED types of courses (including column for period intervals). Swedish. 2B', () => {
    ;(useStore as jest.Mock).mockReturnValue({ language: 'sv', languageIndex: 1 })

    render(<TableView results={TEST_SEARCH_HITS_MIXED_SV_BETA.searchHits} />)

    const rows = screen.queryAllByRole('row')
    const columnHeaders = screen.getAllByRole('columnheader')
    expect(rows).toHaveLength(6) // 5 courses + 1 header row
    expect(columnHeaders).toHaveLength(8)

    columnHeaders.forEach((colHeader, index) => {
      expect(colHeader).toHaveTextContent(mixedHitsColHeaders.sv[index])
    })

    rows.slice(1).forEach((row, index) => {
      const utils = within(row)
      const course = EXPECTED_TEST_SEARCH_HITS_MIXED_SV_BETA.searchHits[index]
      expect(utils.getAllByRole('cell')[0]).toHaveTextContent(course.kod)
      expect(utils.getAllByRole('cell')[1]).toHaveTextContent(course.benamning)
      expect(utils.getAllByRole('cell')[2]).toHaveTextContent(
        `${course.omfattning} ${course.utbildningstyp.creditsUnit.code.toLocaleLowerCase()}`
      )
      expect(utils.getAllByRole('cell')[3]).toHaveTextContent(course.utbildningstyp.level.name)
      expect(utils.getAllByRole('cell')[7]).toHaveTextContent(
        EXPECTED_TEST_SEARCH_HITS_MIXED_PERIODS_TEXTS_SV_BETA[index]
      )
    })
  })
})
