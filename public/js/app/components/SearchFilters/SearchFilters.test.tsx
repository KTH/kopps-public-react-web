import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import SearchFilters from './index'
import { FILTER_MODES } from './types'
import { useStore } from '../../mobx'
import { EduLevel, Period, ShowOptions } from '../../stores/types/searchPageStoreTypes'

// Mocking the useStore hook
jest.mock('../../mobx')
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
jest.mock('../../hooks/useLangHrefUpdate', () => ({
  useLangHrefUpdate: jest.fn(),
}))

describe('<SearchFilters />', () => {
  const ancestorItem = {
    href: '/back',
    label: 'Back',
  }

  const mockSetCourseSearchParams = jest.fn()

  const courseSearchParams = {
    pattern: '',
    period: [] as Period[],
    eduLevel: [] as EduLevel[],
    showOptions: [] as ShowOptions[],
    department: '',
  }

  beforeEach(() => {
    jest.clearAllMocks()
    ;(useStore as jest.Mock).mockReturnValue({
      language: 'en',
      languageIndex: 0,
      browserConfig: { proxyPrefixPath: { uri: '/student/kurser' } },
      currentSchoolsWithDepartments: [],
      deprecatedSchoolsWithDepartments: [],
    })
  })

  test('renders correctly with default props', () => {
    render(
      <SearchFilters
        courseSearchParams={courseSearchParams}
        setCourseSearchParams={mockSetCourseSearchParams}
        filterMode={FILTER_MODES.default}
      />
    )

    expect(screen.getByText('School, department, etc')).toBeInTheDocument()
  })

  test('renders CollapseDetails when collapsable is true', () => {
    render(
      <SearchFilters
        courseSearchParams={courseSearchParams}
        setCourseSearchParams={mockSetCourseSearchParams}
        filterMode={FILTER_MODES.default}
        collapsable={true}
      />
    )

    expect(screen.getByText(/Filter your search choices/i, { selector: 'summary' })).toBeInTheDocument()
  })

  test('calls setCourseSearchParams when a filter value changes', () => {
    render(
      <SearchFilters
        courseSearchParams={courseSearchParams}
        setCourseSearchParams={mockSetCourseSearchParams}
        filterMode={FILTER_MODES.default}
      />
    )

    const firstFilter = screen.getAllByRole('combobox')[0]
    fireEvent.change(firstFilter, { target: { value: '1' } })

    expect(mockSetCourseSearchParams).toHaveBeenCalled()
  })

  test('disables filters when disabled prop is true', () => {
    render(
      <SearchFilters
        courseSearchParams={courseSearchParams}
        setCourseSearchParams={mockSetCourseSearchParams}
        filterMode={FILTER_MODES.default}
        disabled={true}
      />
    )

    const comboboxs = screen.getAllByRole('combobox')
    comboboxs.forEach(input => expect(input).toBeDisabled())

    const options = screen.getAllByRole('option')
    options.forEach(input => expect(input).toBeDisabled())

    const checkboxes = screen.getAllByRole('checkbox')
    checkboxes.forEach(input => expect(input).toBeDisabled())

  })

  test('renders period filters when filterMode includes period', () => {
    render(
      <SearchFilters
        courseSearchParams={courseSearchParams}
        setCourseSearchParams={mockSetCourseSearchParams}
        filterMode={['period']}
      />
    )

    const periodFilters = screen.getAllByRole('checkbox')
    expect(periodFilters.length).toBeGreaterThan(0)
    periodFilters.forEach(filter => expect(filter).toBeInTheDocument())
  })

  test('renders department filter when filterMode includes department', () => {
    render(
      <SearchFilters
        courseSearchParams={courseSearchParams}
        setCourseSearchParams={mockSetCourseSearchParams}
        filterMode={['department']}
      />
    )

    const departmentFilter = screen.getByRole('combobox')
    expect(departmentFilter).toBeInTheDocument()
  })

  test('renders MHU filter when filterMode includes onlyMHU', () => {
    render(
      <SearchFilters
        courseSearchParams={courseSearchParams}
        setCourseSearchParams={mockSetCourseSearchParams}
        filterMode={['onlyMHU']}
      />
    )

    const mhuFilter = screen.getByRole('checkbox')
    expect(mhuFilter).toBeInTheDocument()
  })
})
