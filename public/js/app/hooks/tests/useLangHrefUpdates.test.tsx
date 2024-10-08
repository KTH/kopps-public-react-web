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
      period: ['20242:1', '20242:2', '2025:summer', '20251:3', '20251:4', '20252:1', '20252:2'],
      eduLevel: ['0', '1', '2', '3'],
      showOptions: ['onlyEnglish', 'onlyMHU', 'showCancelled'],
    }

    render(<TestComponent courseSearchParams={courseSearchParams} />)

    expect(mockLanguageAnchor?.href).toContain(
      '?pattern=test&department=A&period=20242%3A1&period=20242%3A2&period=2025%3Asummer&period=20251%3A3&period=20251%3A4&period=20252%3A1&period=20252%3A2&eduLevel=0&eduLevel=1&eduLevel=2&eduLevel=3&showOptions=onlyEnglish&showOptions=onlyMHU&showOptions=showCancelled&l=se'
    )
  })

  test('filters out empty, null, or undefined search params', () => {
    const courseSearchParams = {
      pattern: '',
      eduLevel: ['0'],
      department: undefined as any,
      period: [] as any,
    }

    render(<TestComponent courseSearchParams={courseSearchParams} />)

    expect(mockLanguageAnchor?.href).toContain('?eduLevel=0&l=se')
  })
})
