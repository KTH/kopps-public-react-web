import React from 'react'
import { render, screen, fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import '@testing-library/jest-dom'
import SearchPage from './SearchPage'
import { useStore } from '../mobx'
import { courseSearch } from '../util/searchApi'

jest.mock('../util/searchApi')

const periods = ['Autumn 2024', 'Spring 2025', 'Autumn 2025']
const eduLevels = ['Pre-university level', 'First cycle', 'Second cycle', 'Third cycle']
const showOptions = [
  'Courses taught in English',
  'Courses that deal with environment, environmental technology or sustainable development',
  'Dormant/Terminated course',
]

jest.mock('../mobx')
jest.mock('../util/searchApi')
let mockSearchParams = new URLSearchParams()
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
  useSearchParams: () => [
    mockSearchParams,
    (newParams: any) => {
      mockSearchParams = new URLSearchParams()

      Object.keys(newParams).forEach(key => {
        const value = newParams[key]
        if (Array.isArray(value)) {
          value.forEach(item => mockSearchParams.append(key, item))
        } else {
          mockSearchParams.append(key, value)
        }
      })
    },
  ],
  Link: jest.fn(({ children }) => <a>{children}</a>),
}))
jest.mock('../hooks/useLangHrefUpdate', () => ({
  useLangHrefUpdate: jest.fn(),
}))

const mockDate = new Date('2024-08-19 16:00')

describe('<SearchPage />', () => {
  beforeAll(() => {
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate)
    ;(useStore as jest.Mock).mockReturnValue({
      browserConfig: { proxyPrefixPath: { uri: '/student/kurser' } },
      language: 'en',
      languageIndex: 0,
      currentSchoolsWithDepartments: [],
      deprecatedSchoolsWithDepartments: [],
    })
  })
  beforeEach(() => {
    mockSearchParams = new URLSearchParams()
  })

  afterAll(() => {
    jest.spyOn(global, 'Date').mockRestore()
  })

  test('should load search parameters from URL and call search API', async () => {
    mockSearchParams = new URLSearchParams()

    // Add multiple values for the 'semesters' key
    mockSearchParams.append('pattern', 'Math')
    mockSearchParams.append('semesters', 'HT2024')
    mockSearchParams.append('semesters', 'VT2024')
    mockSearchParams.append('eduLevel', '1')
    mockSearchParams.append('showOptions', 'onlyEnglish')

    render(<SearchPage searchMode="default" />)

    expect(courseSearch).toHaveBeenCalledWith('en', '/student/kurser', {
      pattern: 'Math',
      semesters: ['HT2024', 'VT2024'],
      eduLevel: ['1'],
      showOptions: ['onlyEnglish'],
      department: '',
    })

    expect(screen.getByRole('textbox')).toHaveValue('Math')

    const periodCheckbox = screen.getByLabelText('Autumn 2024')
    expect(periodCheckbox).toBeChecked()

    const eduLevelCheckbox = screen.getByLabelText('First cycle')
    expect(eduLevelCheckbox).toBeChecked()
  })

  test('should update search params when search input is changed', async () => {
    mockSearchParams = new URLSearchParams({
      pattern: '',
    })

    render(<SearchPage searchMode="default" />)

    const searchInput = screen.getByRole('textbox')
    fireEvent.change(searchInput, { target: { value: 'Physics' } })
    fireEvent.submit(searchInput)

    await waitFor(() => {
      expect(mockSearchParams.get('pattern')).toBe('Physics')
      expect(courseSearch).toHaveBeenCalledWith('en', '/student/kurser', {
        pattern: 'Physics',
        department: '',
        eduLevel: [],
        semesters: [],
        showOptions: [],
      })
    })
  })

  test('should disable search input when search is pending', async () => {
    jest.mock('../hooks/useCourseSearch', () => ({
      useCourseSearch: jest.fn().mockReturnValue({
        status: 'pending',
        data: [],
      }),
    }))

    render(<SearchPage searchMode="default" />)

    const searchInput = screen.getByRole('textbox')
    expect(searchInput).toBeDisabled()

    periods.forEach(semesters => {
      const periodCheckbox = screen.getByLabelText(semesters)
      expect(periodCheckbox).toBeDisabled()
    })

    eduLevels.forEach(level => {
      const levelCheckbox = screen.getByLabelText(level)
      expect(levelCheckbox).toBeDisabled()
    })

    showOptions.forEach(option => {
      const optionCheckbox = screen.getByLabelText(option)
      expect(optionCheckbox).toBeDisabled()
    })
  })

  test('should update search params and call search API when semesters checkboxes, eduLevel, and showOptions are changed', async () => {
    render(<SearchPage searchMode="default" />)

    // Verify that the initial API call was made with the correct parameters
    expect(courseSearch).toHaveBeenCalledWith('en', '/student/kurser', {
      pattern: '',
      department: '',
      eduLevel: [],
      semesters: [],
      showOptions: [],
    })
    const firstPeriodCheckbox = screen.getByLabelText(periods[0])
    expect(firstPeriodCheckbox).not.toBeChecked()
    fireEvent.click(firstPeriodCheckbox)
    await waitFor(async () => {
      expect(mockSearchParams.getAll('semesters')).toEqual(['HT2024'])
      expect(courseSearch).toHaveBeenCalledWith('en', '/student/kurser', {
        pattern: '',
        department: '',
        eduLevel: [],
        semesters: ['HT2024'],
        showOptions: [],
      })

      const secondPeriodCheckbox = screen.getByLabelText(periods[1])
      expect(secondPeriodCheckbox).not.toBeChecked()
      fireEvent.click(secondPeriodCheckbox)
    })

    await waitFor(async () => {
      expect(courseSearch).toHaveBeenCalledWith('en', '/student/kurser', {
        pattern: '',
        department: '',
        eduLevel: [],
        semesters: ['HT2024', 'VT2025'],
        showOptions: [],
      })

      const thirdPeriodCheckbox = screen.getByLabelText(periods[2])
      expect(thirdPeriodCheckbox).not.toBeChecked()
      fireEvent.click(thirdPeriodCheckbox)
    })

    await waitFor(async () => {
      expect(courseSearch).toHaveBeenCalledWith('en', '/student/kurser', {
        pattern: '',
        department: '',
        eduLevel: [],
        semesters: ['HT2024', 'VT2025', 'HT2025'],
        showOptions: [],
      })

      const firstEduLevelCheckbox = screen.getByLabelText(eduLevels[0])
      expect(firstEduLevelCheckbox).not.toBeChecked()
      fireEvent.click(firstEduLevelCheckbox)
    })

    await waitFor(async () => {
      expect(courseSearch).toHaveBeenCalledWith('en', '/student/kurser', {
        pattern: '',
        department: '',
        eduLevel: ['99'],
        semesters: ['HT2024', 'VT2025', 'HT2025'],
        showOptions: [],
      })

      const secondEduLevelCheckbox = screen.getByLabelText(eduLevels[1])
      expect(secondEduLevelCheckbox).not.toBeChecked()
      fireEvent.click(secondEduLevelCheckbox)
    })

    await waitFor(async () => {
      expect(courseSearch).toHaveBeenCalledWith('en', '/student/kurser', {
        pattern: '',
        department: '',
        eduLevel: ['99', '1'],
        semesters: ['HT2024', 'VT2025', 'HT2025'],
        showOptions: [],
      })

      const thirdEduLevelCheckbox = screen.getByLabelText(eduLevels[2])
      expect(thirdEduLevelCheckbox).not.toBeChecked()
      fireEvent.click(thirdEduLevelCheckbox)
    })

    await waitFor(async () => {
      expect(courseSearch).toHaveBeenCalledWith('en', '/student/kurser', {
        pattern: '',
        department: '',
        eduLevel: ['99', '1', '2'],
        semesters: ['HT2024', 'VT2025', 'HT2025'],
        showOptions: [],
      })

      const fourthEduLevelCheckbox = screen.getByLabelText(eduLevels[3])
      expect(fourthEduLevelCheckbox).not.toBeChecked()
      fireEvent.click(fourthEduLevelCheckbox)
    })

    await waitFor(async () => {
      expect(courseSearch).toHaveBeenCalledWith('en', '/student/kurser', {
        pattern: '',
        department: '',
        eduLevel: ['99', '1', '2', '3'],
        semesters: ['HT2024', 'VT2025', 'HT2025'],
        showOptions: [],
      })

      const firstShowOptionCheckbox = screen.getByLabelText(showOptions[0])
      expect(firstShowOptionCheckbox).not.toBeChecked()
      fireEvent.click(firstShowOptionCheckbox)
    })

    await waitFor(async () => {
      expect(courseSearch).toHaveBeenCalledWith('en', '/student/kurser', {
        pattern: '',
        department: '',
        eduLevel: ['99', '1', '2', '3'],
        semesters: ['HT2024', 'VT2025', 'HT2025'],
        showOptions: ['onlyEnglish'],
      })

      const secondShowOptionCheckbox = screen.getByLabelText(showOptions[1])
      expect(secondShowOptionCheckbox).not.toBeChecked()
      fireEvent.click(secondShowOptionCheckbox)
    })

    await waitFor(async () => {
      expect(courseSearch).toHaveBeenCalledWith('en', '/student/kurser', {
        pattern: '',
        department: '',
        eduLevel: ['99', '1', '2', '3'],
        semesters: ['HT2024', 'VT2025', 'HT2025'],
        showOptions: ['onlyEnglish', 'onlyMHU'],
      })

      const thirdShowOptionCheckbox = screen.getByLabelText(showOptions[2])
      expect(thirdShowOptionCheckbox).not.toBeChecked()
      fireEvent.click(thirdShowOptionCheckbox)
    })

    await waitFor(() => {
      expect(courseSearch).toHaveBeenCalledWith('en', '/student/kurser', {
        pattern: '',
        department: '',
        eduLevel: ['99', '1', '2', '3'],
        semesters: ['HT2024', 'VT2025', 'HT2025'],
        showOptions: ['onlyEnglish', 'onlyMHU', 'showCancelled'],
      })
    })
  })
})
