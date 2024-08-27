import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import '@testing-library/jest-dom'
import { SidebarFilters, FiltersMobileDialog } from './index'
import { MenuPanel } from '@kth/style'

jest.mock('../../mobx', () => ({
  useStore: () => ({
    languageIndex: 0,
  }),
}))

// Mock the MenuPanel.initModal function
jest.mock('@kth/style', () => ({
  MenuPanel: {
    initModal: jest.fn(),
  },
}))

describe('FiltersMobileDialog Component', () => {
  test('renders correctly', async () => {
    const ref = React.createRef<HTMLDialogElement>()
    render(
      <FiltersMobileDialog ref={ref}>
        <div>Test Child</div>
      </FiltersMobileDialog>
    )

    expect(screen.getByText('Test Child')).toBeInTheDocument()
    expect(screen.getByText('Show results')).toBeInTheDocument()
  })
})

describe('SidebarFilters Component', () => {
  const ancestorItem = { href: '/home', label: 'Back to Home' }

  test('renders correctly', () => {
    render(
      <SidebarFilters title="Filter Title" ancestorItem={ancestorItem}>
        <div>Filter Options</div>
      </SidebarFilters>
    )

    const filterTitles = screen.getAllByText('Filter Title')
    expect(filterTitles).toHaveLength(3)
    const backToHomeLinks = screen.getAllByText('Back to Home')
    expect(backToHomeLinks).toHaveLength(2)
    const filterOptions = screen.getAllByText('Filter Options')
    expect(filterOptions).toHaveLength(2)
  })

  test('initializes MenuPanel on mount', async () => {
    render(
      <SidebarFilters title="Filter Title" ancestorItem={ancestorItem}>
        <div>Filter Options</div>
      </SidebarFilters>
    )

    const mobileButtonRef = document.querySelector('.kth-button.filters')
    const dialog = document.querySelector('.sidebar-filters--mobile__dialog')
    expect(MenuPanel.initModal).toHaveBeenCalledWith(mobileButtonRef, dialog)
  })
})
