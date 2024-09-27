import React from 'react'
import { render, screen, fireEvent, waitFor, waitForElementToBeRemoved } from '@testing-library/react'
import '@testing-library/jest-dom'
import NewSearchPage from './NewSearchPage'
import { useStore } from '../mobx'
import { courseSearch } from '../util/searchApi'
import { TEST_API_ANSWER_RESOLVED } from '../components/mocks/mockKoppsCourseSearch'

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

describe('<NewSearchPage />', () => {
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

    // Add multiple values for the 'period' key
    mockSearchParams.append('pattern', 'Math')
    mockSearchParams.append('period', '20242:1')
    mockSearchParams.append('period', '20242:2')
    mockSearchParams.append('eduLevel', '1')
    mockSearchParams.append('showOptions', 'onlyEnglish')
    ;(courseSearch as jest.Mock).mockReturnValue(Promise.resolve(TEST_API_ANSWER_RESOLVED))

    render(<NewSearchPage searchMode="default" />)

    expect(courseSearch).toHaveBeenCalledWith('en', '/student/kurser', {
      pattern: 'Math',
      period: ['20242:1', '20242:2'],
      eduLevel: ['1'],
      showOptions: ['onlyEnglish'],
      department: '',
    })

    expect(screen.getByRole('textbox')).toHaveValue('Math')

    const periodCheckbox = screen.getByLabelText('Autumn 2024 period 1')
    expect(periodCheckbox).toBeChecked()

    const secondPeriodCheckbox = screen.getByLabelText('Autumn 2024 period 2')
    expect(secondPeriodCheckbox).toBeChecked()

    const eduLevelCheckbox = screen.getByLabelText('First cycle')
    expect(eduLevelCheckbox).toBeChecked()
  })

  test('should update search params when search input is changed', async () => {
    mockSearchParams = new URLSearchParams({
      pattern: '',
    })
    ;(courseSearch as jest.Mock).mockReturnValue(Promise.resolve(TEST_API_ANSWER_RESOLVED))

    render(<NewSearchPage searchMode="default" />)

    const searchInput = screen.getByRole('textbox')
    fireEvent.change(searchInput, { target: { value: 'Physics' } })
    fireEvent.submit(searchInput)

    await waitFor(() => {
      expect(mockSearchParams.get('pattern')).toBe('Physics')
      expect(courseSearch).toHaveBeenCalledWith('en', '/student/kurser', {
        pattern: 'Physics',
        department: '',
        eduLevel: [],
        period: [],
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

    render(<NewSearchPage searchMode="default" />)

    const searchInput = screen.getByRole('textbox')
    expect(searchInput).toBeDisabled()

    periods.forEach(period => {
      const periodCheckbox = screen.getByLabelText(period)
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

  test('should update search params and call search API when period checkboxes, eduLevel, and showOptions are changed', async () => {
    ;(courseSearch as jest.Mock).mockReturnValue(Promise.resolve(TEST_API_ANSWER_RESOLVED))

    render(<NewSearchPage searchMode="default" />)

    // Verify that the initial API call was made with the correct parameters
    expect(courseSearch).toHaveBeenCalledWith('en', '/student/kurser', {
      pattern: '',
      department: '',
      eduLevel: [],
      period: [],
      showOptions: [],
    })
    const firstPeriodCheckbox = screen.getByLabelText(periods[0])
    expect(firstPeriodCheckbox).not.toBeChecked()
    fireEvent.click(firstPeriodCheckbox)
    await waitFor(async () => {
      expect(mockSearchParams.getAll('period')).toEqual(['20242:1'])
      expect(courseSearch).toHaveBeenCalledWith('en', '/student/kurser', {
        pattern: '',
        department: '',
        eduLevel: [],
        period: ['20242:1'],
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
        period: ['20242:1', '20242:2'],
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
        period: ['20242:1', '20242:2', '2025:summer'],
        showOptions: [],
      })

      const forthPeriodCheckbox = screen.getByLabelText(periods[3])
      expect(forthPeriodCheckbox).not.toBeChecked()
      fireEvent.click(forthPeriodCheckbox)
    })

    await waitFor(async () => {
      expect(courseSearch).toHaveBeenCalledWith('en', '/student/kurser', {
        pattern: '',
        department: '',
        eduLevel: [],
        period: ['20242:1', '20242:2', '2025:summer', '20251:3'],
        showOptions: [],
      })

      const fifthPeriodCheckbox = screen.getByLabelText(periods[4])
      expect(fifthPeriodCheckbox).not.toBeChecked()
      fireEvent.click(fifthPeriodCheckbox)
    })

    await waitFor(async () => {
      expect(courseSearch).toHaveBeenCalledWith('en', '/student/kurser', {
        pattern: '',
        department: '',
        eduLevel: [],
        period: ['20242:1', '20242:2', '2025:summer', '20251:3', '20251:4'],
        showOptions: [],
      })

      const sixthPeriodCheckbox = screen.getByLabelText(periods[5])
      expect(sixthPeriodCheckbox).not.toBeChecked()
      fireEvent.click(sixthPeriodCheckbox)
    })

    await waitFor(async () => {
      expect(courseSearch).toHaveBeenCalledWith('en', '/student/kurser', {
        pattern: '',
        department: '',
        eduLevel: [],
        period: ['20242:1', '20242:2', '2025:summer', '20251:3', '20251:4', '20252:1'],
        showOptions: [],
      })

      const seventhPeriodCheckbox = screen.getByLabelText(periods[6])
      expect(seventhPeriodCheckbox).not.toBeChecked()
      fireEvent.click(seventhPeriodCheckbox)
    })

    await waitFor(async () => {
      expect(courseSearch).toHaveBeenCalledWith('en', '/student/kurser', {
        pattern: '',
        department: '',
        eduLevel: [],
        period: ['20242:1', '20242:2', '2025:summer', '20251:3', '20251:4', '20252:1', '20252:2'],
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
        eduLevel: ['0'],
        period: ['20242:1', '20242:2', '2025:summer', '20251:3', '20251:4', '20252:1', '20252:2'],
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
        eduLevel: ['0', '1'],
        period: ['20242:1', '20242:2', '2025:summer', '20251:3', '20251:4', '20252:1', '20252:2'],
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
        eduLevel: ['0', '1', '2'],
        period: ['20242:1', '20242:2', '2025:summer', '20251:3', '20251:4', '20252:1', '20252:2'],
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
        eduLevel: ['0', '1', '2', '3'],
        period: ['20242:1', '20242:2', '2025:summer', '20251:3', '20251:4', '20252:1', '20252:2'],
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
        eduLevel: ['0', '1', '2', '3'],
        period: ['20242:1', '20242:2', '2025:summer', '20251:3', '20251:4', '20252:1', '20252:2'],
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
        eduLevel: ['0', '1', '2', '3'],
        period: ['20242:1', '20242:2', '2025:summer', '20251:3', '20251:4', '20252:1', '20252:2'],
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
        eduLevel: ['0', '1', '2', '3'],
        period: ['20242:1', '20242:2', '2025:summer', '20251:3', '20251:4', '20252:1', '20252:2'],
        showOptions: ['onlyEnglish', 'onlyMHU', 'showCancelled'],
      })
    })
  })
})
