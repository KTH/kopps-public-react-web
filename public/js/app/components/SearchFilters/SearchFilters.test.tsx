import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import SearchFilters from './index'
import { useStore } from '../../mobx'
import { CourseSearchParams, SEARCH_MODES } from '../../pages/types/searchPageTypes'

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
  const mockSetCourseSearchParams = jest.fn()

  const courseSearchParams: CourseSearchParams = {
    pattern: '',
    eduLevel: [],
    showOptions: [],
    period: [],
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
        searchMode={SEARCH_MODES.default}
      />
    )

    expect(screen.getByText('School, department, etc')).toBeInTheDocument()
  })

  test('renders CollapseDetails when collapsable is true', () => {
    render(
      <SearchFilters
        courseSearchParams={courseSearchParams}
        setCourseSearchParams={mockSetCourseSearchParams}
        searchMode={SEARCH_MODES.default}
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
        searchMode={SEARCH_MODES.default}
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
        searchMode={SEARCH_MODES.default}
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
})
