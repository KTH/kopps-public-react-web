import React from 'react'
import { render } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useLangHrefUpdate } from '../useLangHrefUpdate'
import { useStore } from '../../mobx'

// Mock the useStore hook
jest.mock('../../mobx')

const TestComponent: React.FC<{ courseSearchParams?: any }> = ({ courseSearchParams }) => {
  useLangHrefUpdate(courseSearchParams)
  return null
}

describe('useLangHrefUpdate', () => {
  let mockLanguageAnchor: HTMLAnchorElement | null = null

  beforeEach(() => {
    // Create and append the mock language anchor element
    mockLanguageAnchor = document.createElement('a')
    mockLanguageAnchor.className = 'kth-menu-item language'
    document.body.appendChild(mockLanguageAnchor)

    // Mock the useStore return value
    ;(useStore as jest.Mock).mockReturnValue({ language: 'en' })
  })

  afterEach(() => {
    // Remove the mock anchor element after each test
    document.body.removeChild(mockLanguageAnchor!)
  })

  test('updates href to Swedish version when no search params are provided', () => {
    render(<TestComponent />)

    expect(mockLanguageAnchor?.href).toContain('?l=se')
  })

  test('updates href to English version when language is Swedish and no search params are provided', () => {
    ;(useStore as jest.Mock).mockReturnValue({ language: 'sv' })

    render(<TestComponent />)

    expect(mockLanguageAnchor?.href).toContain('?l=en')
  })

  test('updates href with query parameters when search params are provided', () => {
    const courseSearchParams = {
      pattern: 'test',
      department: 'A',
      semesters: ['HT2024', 'VT2025', 'HT2025'],
      eduLevel: ['FUPKURS', '2007GKURS', '2007AKURS', '2007FKURS'],
      showOptions: ['onlyEnglish', 'onlyMHU', 'showCancelled'],
    }

    render(<TestComponent courseSearchParams={courseSearchParams} />)

    expect(mockLanguageAnchor?.href).toContain(
      '?pattern=test&department=A&semesters=HT2024&semesters=VT2025&semesters=HT2025&eduLevel=FUPKURS&eduLevel=2007GKURS&eduLevel=2007AKURS&eduLevel=2007FKURS&showOptions=onlyEnglish&showOptions=onlyMHU&showOptions=showCancelled&l=se'
    )
  })

  test('filters out empty, null, or undefined search params', () => {
    const courseSearchParams = {
      pattern: '',
      eduLevel: ['FUPKURS'],
      department: undefined as any,
      semesters: [] as any,
    }

    render(<TestComponent courseSearchParams={courseSearchParams} />)

    expect(mockLanguageAnchor?.href).toContain('?eduLevel=FUPKURS&l=se')
  })
})
