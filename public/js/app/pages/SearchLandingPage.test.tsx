import React from 'react'
import { fireEvent, render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import NewSearchLandingPage from './NewSearchLandingPage'
import { useStore } from '../mobx'
import { useNavigate } from 'react-router-dom'
import { Mock } from 'node:test'
import { stringifyUrlParams } from '../../../../domain/searchParams'

const mockDate = new Date('2024-08-19 16:00')

jest.mock('../mobx')
jest.mock('../util/internApi')
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useSearchParams: jest.fn(() => [new URLSearchParams(), jest.fn()]),
}))
const periods = [
  'Autumn 2024 period 1',
  'Autumn 2024 period 2',
  '2025 summer',
  'Spring 2025 period 3',
  'Spring 2025 period 4',
  'Autumn 2025 period 1',
  'Autumn 2025 period 2',
]
const eduLevels = ['Pre-university level', 'First cycle', 'Second cycle', 'Third cycle']
const showOptions = [
  'Courses taught in English',
  'Courses that deal with environment, environmental technology or sustainable development',
  'Dormant/Terminated course',
]

describe('<NewSearchLandingPage />', () => {
  const mockNavigate = jest.fn()

  beforeAll(() => {
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate)
    ;(useNavigate as jest.Mock).mockReturnValue(mockNavigate)
    ;(useStore as jest.Mock).mockReturnValue({
      browserConfig: { proxyPrefixPath: { uri: '/student/kurser' } },
      language: 'en',
      languageIndex: 0,
      currentSchoolsWithDepartments: [],
      deprecatedSchoolsWithDepartments: [],
    })
  })

  afterAll(() => {
    jest.spyOn(global, 'Date').mockRestore()
  })

  // Scenario 1: Basic search without any filters selected
  test('should perform a basic search without any filters selected', async () => {
    render(<NewSearchLandingPage />)

    const button = screen.getByRole('button', { name: /search course/i })
    fireEvent.click(button)

    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: '/student/kurser/sokkurs-beta/resultat',
      search: '?',
    })
  })

  // Scenario 2: Selecting all filters and submitting the form
  test('should select all filters and submit search', async () => {
    render(<NewSearchLandingPage />)

    periods.forEach(label => {
      const checkbox = screen.getByLabelText(label)
      fireEvent.click(checkbox)
      expect(checkbox).toBeChecked()
    })

    eduLevels.forEach(label => {
      const checkbox = screen.getByLabelText(label)
      fireEvent.click(checkbox)
      expect(checkbox).toBeChecked()
    })

    showOptions.forEach(label => {
      const checkbox = screen.getByLabelText(label)
      fireEvent.click(checkbox)
      expect(checkbox).toBeChecked()
    })

    const button = screen.getByRole('button', { name: /search course/i })
    fireEvent.click(button)

    const searchParams = stringifyUrlParams({
      period: ['HT2024:1', 'HT2024:2', '2025:summer', 'VT2025:3', 'VT2025:4', 'HT2025:1', 'HT2025:2'],
      eduLevel: ['0', '1', '2', '3'],
      showOptions: ['onlyEnglish', 'onlyMHU', 'showCancelled'],
    })

    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: '/student/kurser/sokkurs-beta/resultat',
      search: `?${searchParams}`,
    })
  })

  // Scenario 3: Unselecting a filter and submitting the form
  test('should unselect a filter and submit search', async () => {
    render(<NewSearchLandingPage />)

    const firstPeriodCheckbox = screen.getByLabelText(periods[0])
    fireEvent.click(firstPeriodCheckbox) // Check it
    expect(firstPeriodCheckbox).toBeChecked()

    fireEvent.click(firstPeriodCheckbox) // Uncheck it
    expect(firstPeriodCheckbox).not.toBeChecked()

    const button = screen.getByRole('button', { name: /search course/i })
    fireEvent.click(button)

    const searchParams = stringifyUrlParams({
      period: [],
      eduLevel: [],
      showOptions: [],
    })

    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: '/student/kurser/sokkurs-beta/resultat',
      search: `?${searchParams}`,
    })
  })

  // Scenario 4: Third Cycle Courses Mode
  test('should handle thirdCycleCourses mode and submit search', async () => {
    render(<NewSearchLandingPage searchMode="thirdCycleCourses" />)

    const button = screen.getByRole('button', { name: /search course/i })
    fireEvent.click(button)

    const searchParams = stringifyUrlParams({
      eduLevel: ['3'],
      period: [],
      showOptions: [],
    })

    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: '/utbildning/forskarutbildning/kurser/sok-beta/resultat',
      search: `?${searchParams}`,
    })
  })

  // Scenario 5: Navigating with specific parameters
  test('should navigate to correct result page with specific parameters', async () => {
    render(<NewSearchLandingPage />)

    const firstPeriodCheckbox = screen.getByLabelText(periods[0])
    fireEvent.click(firstPeriodCheckbox) // Select a period

    const firstEduLevelCheckbox = screen.getByLabelText(eduLevels[0])
    fireEvent.click(firstEduLevelCheckbox) // Select an edu level

    const firstShowOptionCheckbox = screen.getByLabelText(showOptions[0])
    fireEvent.click(firstShowOptionCheckbox) // Select a show option

    const button = screen.getByRole('button', { name: /search course/i })
    fireEvent.click(button)

    const searchParams = stringifyUrlParams({
      period: ['HT2024:1'],
      eduLevel: ['0'],
      showOptions: ['onlyEnglish'],
    })

    expect(mockNavigate).toHaveBeenCalledWith({
      pathname: '/student/kurser/sokkurs-beta/resultat',
      search: `?${searchParams}`,
    })
  })
})
