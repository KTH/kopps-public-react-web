import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import SearchFilters from './index'
import { useStore } from '../../mobx'
import { CourseSearchParams, SEARCH_MODES } from '../../pages/types/searchPageTypes'

import userEvent from '@testing-library/user-event'

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

  const emptyCourseSearchParams: CourseSearchParams = {
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
        courseSearchParams={emptyCourseSearchParams}
        setCourseSearchParams={mockSetCourseSearchParams}
        searchMode={SEARCH_MODES.default}
      />
    )

    expect(screen.getByText('School, department, etc')).toBeInTheDocument()
  })

  test('renders CollapseDetails when collapsable is true', () => {
    render(
      <SearchFilters
        courseSearchParams={emptyCourseSearchParams}
        setCourseSearchParams={mockSetCourseSearchParams}
        searchMode={SEARCH_MODES.default}
        collapsable={true}
      />
    )

    expect(screen.getByText(/Filter your search choices/i, { selector: 'summary' })).toBeInTheDocument()
  })

  test('calls setCourseSearchParams when a filter value changes', async () => {
    render(
      <SearchFilters
        courseSearchParams={emptyCourseSearchParams}
        setCourseSearchParams={mockSetCourseSearchParams}
        searchMode={SEARCH_MODES.default}
      />
    )

    const user = userEvent.setup()
    await user.click(screen.getByLabelText('Courses taught in English'))

    expect(mockSetCourseSearchParams).toHaveBeenCalled()
  })

  test('disables filters when disabled prop is true', () => {
    render(
      <SearchFilters
        courseSearchParams={emptyCourseSearchParams}
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

  describe('Course Start filter options', () => {
    beforeAll(() => {
      jest.useFakeTimers()
    })

    describe('during autumn semester', () => {
      beforeAll(() => {
        jest.setSystemTime(new Date('2024-11-03'))
      })
      test(`displays Course Start filters for the current autumn semester and the coming year, but not this year's spring semester`, () => {
        const { container } = render(
          <SearchFilters
            courseSearchParams={emptyCourseSearchParams}
            setCourseSearchParams={mockSetCourseSearchParams}
            searchMode={SEARCH_MODES.default}
          />
        )

        expect(screen.queryByText('Course Start 2023')).not.toBeInTheDocument()
        expect(screen.getByText('Course Start 2024')).toBeInTheDocument()
        expect(screen.getByText('Course Start 2025')).toBeInTheDocument()
        expect(screen.queryByText('Course Start 2026')).not.toBeInTheDocument()

        expect(screen.queryByText('Spring 2024 period 3')).not.toBeInTheDocument()
        expect(screen.queryByText('Spring 2024 period 4')).not.toBeInTheDocument()

        expect(screen.getByText('2024 summer')).toBeInTheDocument()

        expect(screen.getByText('Autumn 2024 period 1')).toBeInTheDocument()
        expect(screen.getByText('Autumn 2024 period 2')).toBeInTheDocument()

        expect(screen.getByText('Spring 2025 period 3')).toBeInTheDocument()
        expect(screen.getByText('Spring 2025 period 4')).toBeInTheDocument()

        expect(screen.getByText('2025 summer')).toBeInTheDocument()

        expect(screen.getByText('Autumn 2025 period 1')).toBeInTheDocument()
        expect(screen.getByText('Autumn 2025 period 2')).toBeInTheDocument()
      })

      test('to match snapshot', () => {
        const { container } = render(
          <SearchFilters
            courseSearchParams={emptyCourseSearchParams}
            setCourseSearchParams={mockSetCourseSearchParams}
            searchMode={SEARCH_MODES.default}
          />
        )

        expect(container).toMatchSnapshot()
      })

      test('allows selecting multiple periods', async () => {
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
        render(
          <SearchFilters
            courseSearchParams={emptyCourseSearchParams}
            setCourseSearchParams={mockSetCourseSearchParams}
            searchMode={SEARCH_MODES.default}
          />
        )

        await user.click(screen.getByLabelText('Autumn 2024 period 1'))

        expect(mockSetCourseSearchParams).toHaveBeenCalledTimes(1)
        expect(mockSetCourseSearchParams).toHaveBeenLastCalledWith({
          period: ['2024:P1'],
        })

        await user.click(screen.getByLabelText('Autumn 2024 period 2'))

        expect(mockSetCourseSearchParams).toHaveBeenCalledTimes(2)
        expect(mockSetCourseSearchParams).toHaveBeenLastCalledWith({
          period: ['2024:P2'],
        })

        // Deselect second option
        await user.click(screen.getByLabelText('Autumn 2024 period 2'))

        expect(mockSetCourseSearchParams).toHaveBeenCalledTimes(3)
        expect(mockSetCourseSearchParams).toHaveBeenLastCalledWith({
          period: ['2024:P2'],
        })
      })

      test('allows deselecting periods', async () => {
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
        render(
          <SearchFilters
            courseSearchParams={emptyCourseSearchParams}
            setCourseSearchParams={mockSetCourseSearchParams}
            searchMode={SEARCH_MODES.default}
          />
        )

        await user.click(screen.getByLabelText('Autumn 2024 period 2'))

        expect(mockSetCourseSearchParams).toHaveBeenCalledTimes(1)
        expect(mockSetCourseSearchParams).toHaveBeenLastCalledWith({
          period: ['2024:P2'],
        })

        // Deselect second option
        await user.click(screen.getByLabelText('Autumn 2024 period 2'))

        expect(mockSetCourseSearchParams).toHaveBeenCalledTimes(2)
        expect(mockSetCourseSearchParams).toHaveBeenLastCalledWith({
          period: ['2024:P2'],
        })
      })
    })

    describe('during spring semester', () => {
      beforeAll(() => {
        jest.setSystemTime(new Date('2024-03-14'))
      })
      test('displays Course Start filters for the current year and spring semester/summer (but not autumn semester) of the next year', () => {
        render(
          <SearchFilters
            courseSearchParams={emptyCourseSearchParams}
            setCourseSearchParams={mockSetCourseSearchParams}
            searchMode={SEARCH_MODES.default}
          />
        )

        expect(screen.queryByText('Course Start 2023')).not.toBeInTheDocument()
        expect(screen.getByText('Course Start 2024')).toBeInTheDocument()
        expect(screen.getByText('Course Start 2025')).toBeInTheDocument()
        expect(screen.queryByText('Course Start 2026')).not.toBeInTheDocument()

        expect(screen.getByText('Spring 2024 period 3')).toBeInTheDocument()
        expect(screen.getByText('Spring 2024 period 4')).toBeInTheDocument()

        expect(screen.getByText('2024 summer')).toBeInTheDocument()

        expect(screen.getByText('Autumn 2024 period 1')).toBeInTheDocument()
        expect(screen.getByText('Autumn 2024 period 2')).toBeInTheDocument()

        expect(screen.getByText('Spring 2025 period 3')).toBeInTheDocument()
        expect(screen.getByText('Spring 2025 period 4')).toBeInTheDocument()

        expect(screen.getByText('2025 summer')).toBeInTheDocument()

        expect(screen.queryByText('Autumn 2025 period 1')).not.toBeInTheDocument()
        expect(screen.queryByText('Autumn 2025 period 2')).not.toBeInTheDocument()
      })
    })

    test('to match snapshot', () => {
      const { container } = render(
        <SearchFilters
          courseSearchParams={emptyCourseSearchParams}
          setCourseSearchParams={mockSetCourseSearchParams}
          searchMode={SEARCH_MODES.default}
        />
      )

      expect(container).toMatchSnapshot()
    })

    test('allows selecting multiple periods', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
      render(
        <SearchFilters
          courseSearchParams={emptyCourseSearchParams}
          setCourseSearchParams={mockSetCourseSearchParams}
          searchMode={SEARCH_MODES.default}
        />
      )

      await user.click(screen.getByLabelText('Autumn 2024 period 1'))

      expect(mockSetCourseSearchParams).toHaveBeenCalledTimes(1)
      expect(mockSetCourseSearchParams).toHaveBeenLastCalledWith({
        period: ['2024:P1'],
      })

      await user.click(screen.getByLabelText('Autumn 2024 period 2'))

      expect(mockSetCourseSearchParams).toHaveBeenCalledTimes(2)
      expect(mockSetCourseSearchParams).toHaveBeenLastCalledWith({
        period: ['2024:P2'],
      })

      // Deselect second option
      await user.click(screen.getByLabelText('Autumn 2024 period 2'))

      expect(mockSetCourseSearchParams).toHaveBeenCalledTimes(3)
      expect(mockSetCourseSearchParams).toHaveBeenLastCalledWith({
        period: ['2024:P2'],
      })
    })

    test('allows deselecting periods', async () => {
      const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
      render(
        <SearchFilters
          courseSearchParams={emptyCourseSearchParams}
          setCourseSearchParams={mockSetCourseSearchParams}
          searchMode={SEARCH_MODES.default}
        />
      )

      await user.click(screen.getByLabelText('Autumn 2024 period 2'))

      expect(mockSetCourseSearchParams).toHaveBeenCalledTimes(1)
      expect(mockSetCourseSearchParams).toHaveBeenLastCalledWith({
        period: ['2024:P2'],
      })

      // Deselect second option
      await user.click(screen.getByLabelText('Autumn 2024 period 2'))

      expect(mockSetCourseSearchParams).toHaveBeenCalledTimes(2)
      expect(mockSetCourseSearchParams).toHaveBeenLastCalledWith({
        period: ['2024:P2'],
      })
    })

    afterAll(() => {
      jest.useRealTimers()
    })
  })
})
