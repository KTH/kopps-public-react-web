import React from 'react'
import { render, screen, act, waitForElementToBeRemoved } from '@testing-library/react'
import '@testing-library/jest-dom'
import koppsCourseSearch from '../util/internApi'
import SearchResultDisplay from './SearchResultDisplay'
import { useStore } from '../mobx'
import {
  TEST_API_ANSWER_ALGEBRA,
  TEST_API_ANSWER_EMPTY_PARAMS,
  TEST_API_ANSWER_OVERFLOW,
  TEST_API_ANSWER_UNKNOWN_ERROR,
  TEST_API_ANSWER_NO_HITS,
  TEST_API_ANSWER_RESOLVED,
} from './mocks/mockKoppsCourseSearch'

jest.setTimeout(1000)

jest.mock('../mobx')
jest.mock('../util/internApi')
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}))

describe.skip('Component <SearchResultDisplay> and its warning messages', () => {
  test('double search: twice render empty parameters, first time without asking kopps, second time show a warning message. English. 1A', async () => {
    useStore.mockReturnValue({
      browserConfig: { proxyPrefixPath: { uri: '/student/kurser' } },
      language: 'en',
      languageIndex: 0,
    })
    const { asFragment, rerender } = render(<SearchResultDisplay searchParameters={{}} />)

    expect(koppsCourseSearch).not.toHaveBeenCalled()

    expect(asFragment()).toMatchSnapshot()

    koppsCourseSearch.mockReturnValue(Promise.resolve(TEST_API_ANSWER_EMPTY_PARAMS))

    act(() => rerender(<SearchResultDisplay searchParameters={{}} />))
    expect(koppsCourseSearch).toHaveBeenCalledWith('en', '/student/kurser', {})
    await waitForElementToBeRemoved(() => screen.getByText(/searching/i))

    try {
      expect(screen.getByText(/Search results/i)).toBeInTheDocument()
      expect(screen.getByText(/No query restriction was specified/i)).toBeInTheDocument()
    } catch (error) {
      error.message = `${`Because it is a second try to search with empty params it must give a warning message\n\n ${error}`} `
      throw error
    }

    expect(asFragment()).toMatchSnapshot()
  })

  test('double search: by a text pattern and rerender it again with the empty parameter to get a warning message noQueryProvided. English. 2A', async () => {
    useStore.mockReturnValue({
      browserConfig: { proxyPrefixPath: { uri: '/student/kurser' } },
      language: 'en',
      languageIndex: 0,
    })

    koppsCourseSearch.mockReturnValue(Promise.resolve(TEST_API_ANSWER_ALGEBRA))

    const { asFragment, rerender } = render(<SearchResultDisplay searchParameters={{ pattern: 'Algebra' }} />)
    expect(screen.getByText(/searching/i)).toBeInTheDocument()

    expect(koppsCourseSearch).toHaveBeenCalledWith('en', '/student/kurser', { pattern: 'Algebra' })

    // rerender with empty params
    koppsCourseSearch.mockReturnValue(Promise.resolve(TEST_API_ANSWER_EMPTY_PARAMS))

    act(() => rerender(<SearchResultDisplay searchParameters={{}} />))
    expect(koppsCourseSearch).toHaveBeenCalledWith('en', '/student/kurser', {})
    await waitForElementToBeRemoved(() => screen.getByText(/searching/i))

    try {
      expect(screen.getByText(/Search results/i)).toBeInTheDocument()
      expect(screen.getByText(/No query restriction was specified/i)).toBeInTheDocument()
    } catch (error) {
      error.message = ` ${`Because it is a second try to search with empty params it must give a warning message\n\n ${error}`} `
      throw error
    }

    expect(asFragment()).toMatchSnapshot()
  })

  test('double search: show an overflow warning message and then show a message about empty results "noHits". English. 3A', async () => {
    useStore.mockReturnValue({
      browserConfig: { proxyPrefixPath: { uri: '/student/kurser' } },
      language: 'en',
      languageIndex: 0,
    })

    koppsCourseSearch.mockReturnValue(Promise.resolve(TEST_API_ANSWER_OVERFLOW))

    const { asFragment, rerender } = render(<SearchResultDisplay searchParameters={{ pattern: 'A' }} />)
    expect(screen.getByText(/searching/i)).toBeInTheDocument()
    expect(koppsCourseSearch).toHaveBeenCalledWith('en', '/student/kurser', { pattern: 'A' })

    await waitForElementToBeRemoved(() => screen.getByText(/searching/i))
    expect(screen.getByText(/Search results/i)).toBeInTheDocument()
    expect(screen.getByText(/There were too many results./i)).toBeInTheDocument()

    // rerender
    koppsCourseSearch.mockReturnValue(Promise.resolve(TEST_API_ANSWER_NO_HITS))

    act(() => rerender(<SearchResultDisplay searchParameters={{ pattern: 'CHOKLADKAKA' }} />))
    expect(koppsCourseSearch).toHaveBeenCalledWith('en', '/student/kurser', { pattern: 'CHOKLADKAKA' })
    await waitForElementToBeRemoved(() => screen.getByText(/searching/i))

    expect(screen.getByText(/Search results/i)).toBeInTheDocument()
    expect(screen.getByText(/Your search returned no results./i)).toBeInTheDocument()

    expect(asFragment()).toMatchSnapshot()
  })

  test('double search: show empty results message "noHits" and then show a rejected message of unknown error. English. 4A', async () => {
    useStore.mockReturnValue({
      browserConfig: { proxyPrefixPath: { uri: '/student/kurser' } },
      language: 'en',
      languageIndex: 0,
    })

    koppsCourseSearch.mockReturnValue(Promise.resolve(TEST_API_ANSWER_NO_HITS))

    const { asFragment, rerender } = render(<SearchResultDisplay searchParameters={{ pattern: 'CHOKLADKAKA' }} />)
    expect(screen.getByText(/searching/i)).toBeInTheDocument()
    expect(koppsCourseSearch).toHaveBeenCalledWith('en', '/student/kurser', { pattern: 'CHOKLADKAKA' })
    await waitForElementToBeRemoved(() => screen.getByText(/searching/i))

    expect(screen.getByText(/Search results/i)).toBeInTheDocument()
    expect(screen.getByText(/Your search returned no results./i)).toBeInTheDocument()

    expect(asFragment()).toMatchSnapshot()

    // rerender
    koppsCourseSearch.mockReturnValue(Promise.reject(TEST_API_ANSWER_UNKNOWN_ERROR))

    act(() => rerender(<SearchResultDisplay searchParameters={{ pattern: 'CHOKLADKAKA' }} />))
    expect(koppsCourseSearch).toHaveBeenCalledWith('en', '/student/kurser', { pattern: 'CHOKLADKAKA' })
    await waitForElementToBeRemoved(() => screen.getByText(/searching/i))

    expect(screen.getByText(/Search results/i)).toBeInTheDocument()
    expect(screen.getByText(/An unknown error occurred - failed to retrieve course data./i)).toBeInTheDocument()

    expect(asFragment()).toMatchSnapshot()
  })

  test('search:show a rejected message of unknown error. English. 5A', async () => {
    useStore.mockReturnValue({
      browserConfig: { proxyPrefixPath: { uri: '/student/kurser' } },
      language: 'en',
      languageIndex: 0,
    })

    // rerender
    koppsCourseSearch.mockReturnValue(Promise.reject(TEST_API_ANSWER_UNKNOWN_ERROR))

    const { asFragment } = render(<SearchResultDisplay searchParameters={{ pattern: 'CHOKLADKAKA' }} />)
    expect(screen.getByText(/searching/i)).toBeInTheDocument()

    expect(koppsCourseSearch).toHaveBeenCalledWith('en', '/student/kurser', { pattern: 'CHOKLADKAKA' })
    await waitForElementToBeRemoved(() => screen.getByText(/searching/i))

    expect(screen.getByText(/Search results/i)).toBeInTheDocument()
    expect(screen.getByText(/An unknown error occurred - failed to retrieve course data./i)).toBeInTheDocument()

    expect(asFragment()).toMatchSnapshot()
  })
})

describe.skip('Component <SearchResultDisplay> and resolved cases', () => {
  test('search by a text pattern to display at first a pending status message then the result of this search. English. 1B', async () => {
    useStore.mockReturnValue({
      browserConfig: { proxyPrefixPath: { uri: '/student/kurser' } },
      language: 'en',
      languageIndex: 0,
    })

    koppsCourseSearch.mockReturnValue(Promise.resolve(TEST_API_ANSWER_ALGEBRA))

    const { asFragment } = render(<SearchResultDisplay searchParameters={{ pattern: 'Algebra' }} />)

    expect(screen.getByText(/searching/i)).toBeInTheDocument()

    expect(koppsCourseSearch).toHaveBeenCalledWith('en', '/student/kurser', { pattern: 'Algebra' })

    await waitForElementToBeRemoved(() => screen.getByText(/searching/i))

    expect(screen.getByTestId('number-of-results')).toHaveTextContent('Your search returned 2 result(s).')

    const rows = screen.queryAllByRole('row')

    expect(rows).toHaveLength(3)
    expect(screen.getByText(/IX1303/i)).toBeInTheDocument()
    expect(screen.getByText(/SF1624/i)).toBeInTheDocument()

    expect(asFragment()).toMatchSnapshot()
  })

  test('double search: by deparment&pattern and then by education level. English. 2B', async () => {
    useStore.mockReturnValue({
      browserConfig: { proxyPrefixPath: { uri: '/student/kurser' } },
      language: 'en',
      languageIndex: 0,
    })

    koppsCourseSearch.mockReturnValue(Promise.resolve(TEST_API_ANSWER_ALGEBRA))

    const { asFragment, rerender } = render(
      <SearchResultDisplay searchParameters={{ pattern: 'Algebra', department: 'ABD' }} />
    )

    expect(screen.getByText(/searching/i)).toBeInTheDocument()

    expect(koppsCourseSearch).toHaveBeenCalledWith('en', '/student/kurser', { pattern: 'Algebra', department: 'ABD' })

    await waitForElementToBeRemoved(() => screen.getByText(/searching/i))

    expect(screen.getByTestId('number-of-results')).toHaveTextContent('Your search returned 2 result(s).')

    const rows = screen.queryAllByRole('row')

    expect(rows).toHaveLength(3)
    expect(screen.getByText(/IX1303/i)).toBeInTheDocument()
    expect(screen.getByText(/SF1624/i)).toBeInTheDocument()

    expect(asFragment()).toMatchSnapshot()

    // rerender, second search

    koppsCourseSearch.mockReturnValue(Promise.resolve(TEST_API_ANSWER_RESOLVED))

    rerender(
      <SearchResultDisplay
        searchParameters={{ eduLevel: ['0', '1', '2'], showOptions: ['onlyEnglish', 'showCancelled', 'onlyMHU'] }}
      />
    )

    expect(screen.getByText(/searching/i)).toBeInTheDocument()

    expect(koppsCourseSearch).toHaveBeenCalledWith('en', '/student/kurser', {
      eduLevel: ['0', '1', '2'],
      showOptions: ['onlyEnglish', 'showCancelled', 'onlyMHU'],
    })

    await waitForElementToBeRemoved(() => screen.getByText(/searching/i))

    expect(screen.getByTestId('number-of-results')).toHaveTextContent('Your search returned 2 result(s).')

    const newrows = screen.queryAllByRole('row')

    expect(newrows).toHaveLength(3)
    expect(screen.getByText(/AF2402/i)).toBeInTheDocument()
    expect(screen.getByText(/AH2905/i)).toBeInTheDocument()

    expect(asFragment()).toMatchSnapshot()
  })
})
