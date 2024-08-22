import React from 'react'
import { render, screen, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import TableView from './TableView'
import { useStore } from '../../mobx'

// Mocking the useStore hook
jest.mock('../../mobx')

const headersEN = ['Course code', 'Course name', 'Scope', 'Educational level', 'Periods']
const headersSV = ['Kurskod', 'Kursnamn', 'Omfattning', 'Utbildningsnivå', 'Perioder']

const mockCourses = [
  {
    course: {
      courseCode: 'ABC123',
      title: 'Course Title 1',
      credits: 7.5,
      creditUnitAbbr: 'hp',
      educationalLevel: 'BASIC',
    },
    searchHitInterval: {
      startPeriod: 1,
      startTerm: '20212',
      endPeriod: 2,
      endTerm: '20212',
    },
  },
  {
    course: {
      courseCode: 'DEF456',
      title: 'Course Title 2',
      credits: 15,
      creditUnitAbbr: 'hp',
      educationalLevel: 'ADVANCED',
    },
    searchHitInterval: {
      startPeriod: 3,
      startTerm: '20212',
      endPeriod: 4,
      endTerm: '20212',
    },
  },
]

describe('<TableView />', () => {
  test('renders table with 5 columns for mixed courses in English', () => {
    ;(useStore as jest.Mock).mockReturnValue({ language: 'en', languageIndex: 0 })

    render(<TableView results={mockCourses} />)

    const columnHeaders = screen.getAllByRole('columnheader')
    expect(columnHeaders).toHaveLength(5)
    columnHeaders.forEach((header, index) => {
      expect(header).toHaveTextContent(headersEN[index])
    })

    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(3) // 2 courses + header row

    rows.slice(1).forEach((row, index) => {
      const utils = within(row)
      const { course } = mockCourses[index]
      const { searchHitInterval } = mockCourses[index]
      expect(utils.getAllByRole('cell')[0]).toHaveTextContent(course.courseCode)
      expect(utils.getAllByRole('cell')[1]).toHaveTextContent(course.title)
      expect(utils.getAllByRole('cell')[2]).toHaveTextContent(`${course.credits} ${course.creditUnitAbbr}`)
      expect(utils.getAllByRole('cell')[3]).toHaveTextContent(
        course.educationalLevel === 'BASIC' ? 'First cycle' : 'Second cycle'
      )
      expect(utils.getAllByRole('cell')[4]).toHaveTextContent(
        `P${searchHitInterval.startPeriod} Autumn 21 - P${searchHitInterval.endPeriod} Autumn 21`
      )
    })
  })

  test('renders table with 5 columns for mixed courses in Swedish', () => {
    ;(useStore as jest.Mock).mockReturnValue({ language: 'sv', languageIndex: 1 })

    render(<TableView results={mockCourses} />)

    const columnHeaders = screen.getAllByRole('columnheader')
    expect(columnHeaders).toHaveLength(5)
    columnHeaders.forEach((header, index) => {
      expect(header).toHaveTextContent(headersSV[index])
    })

    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(3) // 2 courses + header row

    rows.slice(1).forEach((row, index) => {
      const utils = within(row)
      const { course, searchHitInterval } = mockCourses[index]
      expect(utils.getAllByRole('cell')[0]).toHaveTextContent(course.courseCode)
      expect(utils.getAllByRole('cell')[1]).toHaveTextContent(course.title)
      expect(utils.getAllByRole('cell')[2]).toHaveTextContent(`${course.credits} ${course.creditUnitAbbr}`)
      expect(utils.getAllByRole('cell')[3]).toHaveTextContent(
        course.educationalLevel === 'BASIC' ? 'Grundnivå' : 'Avancerad nivå'
      )
      expect(utils.getAllByRole('cell')[4]).toHaveTextContent(`P${searchHitInterval.startPeriod} HT21 - P${searchHitInterval.endPeriod} HT21`)
    })
  })

  test('renders table with 4 columns when periods are absent', () => {
    ;(useStore as jest.Mock).mockReturnValue({ language: 'en', languageIndex: 0 })
    const mockCoursesWithoutPeriods = mockCourses.map(({ course, searchHitInterval }) => ({
      course,
      searchHitInterval: undefined
    }))

    render(<TableView results={mockCoursesWithoutPeriods} />)

    const columnHeaders = screen.getAllByRole('columnheader')
    expect(columnHeaders).toHaveLength(4)
    columnHeaders.forEach((header, index) => {
      expect(header).toHaveTextContent(headersEN[index])
    })

    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(3) // 2 courses + header row

    rows.slice(1).forEach((row, index) => {
      const utils = within(row)
      const {course, searchHitInterval} = mockCoursesWithoutPeriods[index]
      expect(utils.getAllByRole('cell')[0]).toHaveTextContent(course.courseCode)
      expect(utils.getAllByRole('cell')[1]).toHaveTextContent(course.title)
      expect(utils.getAllByRole('cell')[2]).toHaveTextContent(`${course.credits} ${course.creditUnitAbbr}`)
      expect(utils.getAllByRole('cell')[3]).toHaveTextContent(
        course.educationalLevel === 'BASIC' ? 'First cycle' : 'Second cycle'
      )
    })
  })

  test('renders "no results" when searchHits are empty', () => {
    ;(useStore as jest.Mock).mockReturnValue({ language: 'en', languageIndex: 0 })

    render(<TableView results={[]} />)

    const rows = screen.getAllByRole('row')
    expect(rows).toHaveLength(1) // only header
  })
})
