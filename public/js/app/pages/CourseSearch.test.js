import React from 'react'
import { fireEvent, render, screen, act, waitFor, waitForElementToBeRemoved, within } from '@testing-library/react'
import '@testing-library/jest-dom'
import koppsCourseSearch from '../util/internApi'
import CourseSearch from './CourseSearch'
import { useStore } from '../mobx'
import { TEST_API_ANSWER_ALGEBRA, TEST_API_ANSWER_RESOLVED } from '../components/mocks/mockKoppsCourseSearch'

const mockDate = new Date('2021-03-23 16:00')

jest.setTimeout(1000)

jest.mock('../mobx')
jest.mock('../util/internApi')
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}))
const periods = [
  'Spring 2021 period 3',
  'Spring 2021 period 4',
  '2021 summer',
  'Autumn 2021 period 1',
  'Autumn 2021 period 2',
  'Spring 2022 period 3',
  'Spring 2022 period 4',
  '2022 summer',
]
const eduLevels = ['Pre-university level', 'First cycle', 'Second cycle', 'Third cycle']
const showOptions = [
  'Courses taught in English',
  'Courses that deal with environment, environmental technology or sustainable development',
  'Dormant/Terminated course',
]

describe('Component <CourseSearch>, events', () => {
  beforeAll(() => {
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate)
  })

  afterAll(() => {
    jest.spyOn(global, 'Date').mockRestore()
  })

  // search options
  test.skip('get all empty checkboxes then check them all and get a result, rerender and get the same result', async () => {
    useStore.mockReturnValue({
      browserConfig: { proxyPrefixPath: { uri: '/student/kurser' } },
      language: 'en',
      languageIndex: 0,
      currentSchoolsWithDepartments: [],
      deprecatedSchoolsWithDepartments: [],
      textPattern: '',
      departmentCodeOrPrefix: '',
      eduLevel: [],
      period: [],
      showOptions: [],
    })
    koppsCourseSearch.mockReturnValue(Promise.resolve(TEST_API_ANSWER_RESOLVED))

    const { rerender } = render(<CourseSearch />)

    expect(koppsCourseSearch).not.toHaveBeenCalled()
    periods.forEach(label => {
      const checkbox = screen.getByLabelText(label)
      expect(checkbox).not.toBeChecked()

      fireEvent.click(checkbox)
      expect(checkbox).toBeChecked()
    })

    eduLevels.forEach(label => {
      const checkbox = screen.getByLabelText(label)
      expect(checkbox).not.toBeChecked()

      fireEvent.click(checkbox)
      expect(checkbox).toBeChecked()
    })

    showOptions.forEach(label => {
      const checkbox = screen.getByLabelText(label)
      expect(checkbox).not.toBeChecked()

      fireEvent.click(checkbox)
      expect(checkbox).toBeChecked()
    })

    const button = screen.getByRole('button', {
      name: /search course/i,
    })

    fireEvent.click(button)
    await waitFor(() => expect(screen.getByText('Searching ...')).toBeInTheDocument())
    expect(koppsCourseSearch).toHaveBeenCalledWith('en', '/student/kurser', {
      eduLevel: ['0', '1', '2', '3'],
      period: ['20211:3', '20211:4', '2021:summer', '20212:1', '20212:2', '20221:3', '20221:4', '2022:summer'],
      showOptions: ['onlyEnglish', 'onlyMHU', 'showCancelled'],
    })

    expect(screen.getByTestId('number-of-results')).toHaveTextContent('Your search returned 2 result(s).')
    const newrows = screen.queryAllByRole('row')

    expect(newrows).toHaveLength(3)
    expect(screen.getByText(/AF2402/i)).toBeInTheDocument()
    expect(screen.getByText(/AH2905/i)).toBeInTheDocument()

    act(() => rerender(<CourseSearch />))
    expect(koppsCourseSearch).toHaveBeenCalledWith('en', '/student/kurser', {
      eduLevel: ['0', '1', '2', '3'],
      period: ['20211:3', '20211:4', '2021:summer', '20212:1', '20212:2', '20221:3', '20221:4', '2022:summer'],
      showOptions: ['onlyEnglish', 'onlyMHU', 'showCancelled'],
    })
    expect(screen.getByTestId('number-of-results')).toHaveTextContent('Your search returned 2 result(s).')
  }, 5000)

  // search options
  test.skip('get periods checkboxes checked and then test uncheck it', async () => {
    const periodValues = [
      '20211:3',
      '20211:4',
      '2021:summer',
      '20212:1',
      '20212:2',
      '20221:3',
      '20221:4',
      '2022:summer',
    ]
    useStore.mockReturnValue({
      browserConfig: { proxyPrefixPath: { uri: '/student/kurser' } },
      language: 'en',
      languageIndex: 0,
      currentSchoolsWithDepartments: [],
      deprecatedSchoolsWithDepartments: [],
      textPattern: '',
      departmentCodeOrPrefix: '',
      eduLevel: [],
      period: periodValues,
      showOptions: [],
    })
    koppsCourseSearch.mockReturnValue(Promise.resolve(TEST_API_ANSWER_RESOLVED))

    render(<CourseSearch />)

    expect(screen.getByText('Searching ...')).toBeInTheDocument()
    expect(koppsCourseSearch).toHaveBeenCalledWith('en', '/student/kurser', {
      period: ['20211:3', '20211:4', '2021:summer', '20212:1', '20212:2', '20221:3', '20221:4', '2022:summer'],
    })
    await waitForElementToBeRemoved(() => screen.getByText('Searching ...'))

    expect(screen.getByTestId('number-of-results')).toHaveTextContent('Your search returned 2 result(s).')
    const newrows = screen.queryAllByRole('row')

    expect(newrows).toHaveLength(3)
    expect(screen.getByText(/AF2402/i)).toBeInTheDocument()
    expect(screen.getByText(/AH2905/i)).toBeInTheDocument()

    eduLevels.forEach(label => {
      const checkbox = screen.getByLabelText(label)
      expect(checkbox).not.toBeChecked()
    })

    periods.forEach(label => {
      const checkbox = screen.getByLabelText(label)
      expect(checkbox).toBeChecked()

      fireEvent.click(checkbox)
      expect(checkbox).not.toBeChecked()
    })

    showOptions.forEach(label => {
      const checkbox = screen.getByLabelText(label)
      expect(checkbox).not.toBeChecked()
    })

    const button = screen.getByRole('button', {
      name: /search course/i,
    })

    koppsCourseSearch.mockReturnValue(Promise.resolve(TEST_API_ANSWER_ALGEBRA))

    fireEvent.click(button)
    await waitFor(() => expect(screen.getByText('Searching ...')).toBeInTheDocument())

    await waitFor(() =>
      expect(koppsCourseSearch).toHaveBeenCalledWith('en', '/student/kurser', {
        period: [],
      })
    )

    expect(screen.getByTestId('number-of-results')).toHaveTextContent('Your search returned 2 result(s).')
    const nrows = screen.queryAllByRole('row')
    const thirdRow = within(nrows[2])
    expect(nrows).toHaveLength(3)
    expect(screen.getByText(/IX1303/i)).toBeInTheDocument()
    expect(thirdRow.getByText(/SF1624/i)).toBeInTheDocument()
  })
})
