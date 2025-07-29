import React from 'react'
import { render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import TableView from './TableView'
import { useStore } from '../../mobx'
import {
  MIXED_SEARCH_DATA_EN,
  MIXED_SEARCH_DATA_SE,
  RESEARCH_SEARCH_DATA_EN,
  RESEARCH_SEARCH_DATA_SV,
} from '../mocks/mockSearchData'
import { CourseInstanceSearchDTO } from '@kth/om-kursen-ladok-client/dist/search/types'

jest.mock('../../mobx')

const headers = {
  en: ['Course code', 'Course name', 'Scope', 'Educational level', 'Language', 'Pace', 'Campus', 'Periods'],
  sv: ['Kurskod', 'Kursnamn', 'Omfattning', 'Utbildningsnivå', 'Språk', 'Fart', 'Campus', 'Perioder'],
}
const reseacrhHitsColHeaders = headers
const mixedHitsColHeaders = headers

const eduLevelTranslations = {
  EN: { PREPARATORY: 'Pre-university level', BASIC: 'First cycle', ADVANCED: 'Second cycle', RESEARCH: 'Third cycle' },
  SV: { PREPARATORY: 'Förberedande nivå', BASIC: 'Grundnivå', ADVANCED: 'Avancerad nivå', RESEARCH: 'Forskarnivå' },
} as any

// TODO Benni fix third cycle search
describe('Component <TableView> for RESEARCH courses', () => {
  test('creates a table with 4 columns for RESEARCH courses (without column for period intervals). English. 1A', () => {
    ;(useStore as jest.Mock).mockReturnValue({ language: 'en', languageIndex: 0 })

    render(<TableView searchData={RESEARCH_SEARCH_DATA_EN} />)

    const rows = screen.queryAllByRole('row')
    const columnHeaders = screen.getAllByRole('columnheader')
    expect(rows).toHaveLength(4) // 3 courses + 1 header row
    expect(columnHeaders).toHaveLength(4)

    columnHeaders.forEach((colHeader, index) => {
      expect(colHeader).toHaveTextContent(reseacrhHitsColHeaders.en[index])
    })

    rows.slice(1).forEach((row, index) => {
      const utils = within(row)
      const course = RESEARCH_SEARCH_DATA_EN.results[index]
      expect(utils.getAllByRole('cell')[0]).toHaveTextContent(course.kod)
      expect(utils.getAllByRole('cell')[1]).toHaveTextContent(course.benamning)
      expect(utils.getAllByRole('cell')[2]).toHaveTextContent(`${course.omfattning}`)
      expect(utils.getAllByRole('cell')[3]).toHaveTextContent('Third cycle')
    })
  })

  test('creates a table with 4 columns for RESEARCH courses (without column for period intervals). Swedish. 2A', () => {
    ;(useStore as jest.Mock).mockReturnValue({ language: 'sv', languageIndex: 1 })

    render(<TableView searchData={RESEARCH_SEARCH_DATA_SV} />)

    const rows = screen.queryAllByRole('row')
    const columnHeaders = screen.getAllByRole('columnheader')
    expect(rows).toHaveLength(4) // 3 courses + 1 header row
    expect(columnHeaders).toHaveLength(4)

    columnHeaders.forEach((colHeader, index) => {
      expect(colHeader).toHaveTextContent(reseacrhHitsColHeaders.sv[index])
    })

    rows.slice(1).forEach((row, index) => {
      const utils = within(row)
      const course = RESEARCH_SEARCH_DATA_SV.results[index]
      expect(utils.getAllByRole('cell')[0]).toHaveTextContent(course.kod)
      expect(utils.getAllByRole('cell')[1]).toHaveTextContent(course.benamning)
      expect(utils.getAllByRole('cell')[2]).toHaveTextContent(course.omfattning)
      expect(utils.getAllByRole('cell')[3]).toHaveTextContent('Forskarnivå')
    })
  })
})

const EXPECTED_TEST_SEARCH_HITS_MIXED_PERIODS_TEXTS_EN = [
  'P0 Autumn 25',
  'P2 Autumn 25 - P3 Spring 26',
  'P1 Autumn 25 - P2 Autumn 26',
  'P1 Autumn 25',
]

const EXPECTED_TEST_SEARCH_HITS_MIXED_PERIODS_TEXTS_SV = [
  'P0 HT25',
  'P2 HT25 - P3 VT26',
  'P1 HT25 - P2 HT26',
  'P1 HT25',
]
describe('Component <TableView> for MIXED types of courses', () => {
  test('creates a table with 5 columns for mixed types of courses (including column for period intervals). English. 1B', () => {
    ;(useStore as jest.Mock).mockReturnValue({ language: 'en', languageIndex: 0 })

    render(<TableView searchData={MIXED_SEARCH_DATA_EN} />)

    const rows = screen.queryAllByRole('row')
    const columnHeaders = screen.getAllByRole('columnheader')
    expect(rows).toHaveLength(5) // 4 courses + 1 header row
    expect(columnHeaders).toHaveLength(8)

    columnHeaders.forEach((colHeader, index) => {
      expect(colHeader).toHaveTextContent(mixedHitsColHeaders.en[index])
    })

    rows.slice(1).forEach((row, index) => {
      const utils = within(row)
      const course: CourseInstanceSearchDTO = MIXED_SEARCH_DATA_EN.results[index]
      expect(utils.getAllByRole('cell')[0]).toHaveTextContent(course.kod)
      expect(utils.getAllByRole('cell')[1]).toHaveTextContent(course.benamning)
      expect(utils.getAllByRole('cell')[2]).toHaveTextContent(course.omfattning)
      expect(utils.getAllByRole('cell')[3]).toHaveTextContent(course.utbildningstyper[0])
      expect(utils.getAllByRole('cell')[4]).toHaveTextContent(course.undervisningssprak[0])
      expect(utils.getAllByRole('cell')[5]).toHaveTextContent(`${course.studietakter[0]}%`)
      expect(utils.getAllByRole('cell')[6]).toHaveTextContent(course.studieorter[0])
      expect(utils.getAllByRole('cell')[7]).toHaveTextContent(EXPECTED_TEST_SEARCH_HITS_MIXED_PERIODS_TEXTS_EN[index])
    })
  })

  test('creates a table with 8 columns for MIXED types of courses (including column for period intervals). Swedish. 2B', () => {
    ;(useStore as jest.Mock).mockReturnValue({ language: 'sv', languageIndex: 1 })

    render(<TableView searchData={MIXED_SEARCH_DATA_SE} />)

    const rows = screen.queryAllByRole('row')
    const columnHeaders = screen.getAllByRole('columnheader')
    expect(rows).toHaveLength(5) // 4 courses + 1 header row
    expect(columnHeaders).toHaveLength(8)

    columnHeaders.forEach((colHeader, index) => {
      expect(colHeader).toHaveTextContent(mixedHitsColHeaders.sv[index])
    })

    rows.slice(1).forEach((row, index) => {
      const utils = within(row)
      const course: CourseInstanceSearchDTO = MIXED_SEARCH_DATA_SE.results[index]
      expect(utils.getAllByRole('cell')[0]).toHaveTextContent(course.kod)
      expect(utils.getAllByRole('cell')[1]).toHaveTextContent(course.benamning)
      expect(utils.getAllByRole('cell')[2]).toHaveTextContent(course.omfattning)
      expect(utils.getAllByRole('cell')[3]).toHaveTextContent(course.utbildningstyper[0])
      expect(utils.getAllByRole('cell')[4]).toHaveTextContent(course.undervisningssprak[0])
      expect(utils.getAllByRole('cell')[5]).toHaveTextContent(`${course.studietakter[0]}%`)
      expect(utils.getAllByRole('cell')[6]).toHaveTextContent(course.studieorter[0])
      expect(utils.getAllByRole('cell')[7]).toHaveTextContent(EXPECTED_TEST_SEARCH_HITS_MIXED_PERIODS_TEXTS_SV[index])
    })
  })
})
