import React, { useEffect, useRef } from 'react'
import { MenuPanel } from '@kth/style'
import './styles.scss'
import { FiltersMobileDialogProps, FiltersProps } from './types'

import { useStore } from '../../mobx'
import i18n from '../../../../../i18n'

const closeDialog = (dialog: any) => {
  dialog.current.close()
}

export const FiltersMobileDialog = React.forwardRef<HTMLDialogElement, FiltersMobileDialogProps>(
  ({ children }, ref) => {
    const { languageIndex } = useStore()
    const { showResults } = i18n.messages[languageIndex].generalSearch
    return (
      <dialog className="sidebar-filters--mobile__dialog" ref={ref}>
        <div className="sidebar-filters--mobile__navigation">
          <button className="kth-icon-button close">
            <span className="kth-visually-hidden">Close</span>
          </button>
        </div>
        <div className="sidebar-filters--mobile__content">
          {children}
          <button onClick={() => closeDialog(ref)} className="kth-button primary show-results">
            {showResults}
          </button>
        </div>
      </dialog>
    )
  }
)
FiltersMobileDialog.displayName = 'FiltersMobileDialog'

export const SidebarFilters: React.FC<FiltersProps> = ({ children, title, ancestorItem }) => {
  const mobileButtonRef = useRef<HTMLButtonElement>(null)
  const mobileDialogRef = useRef<HTMLDialogElement>(null)
  const mobileViewRef = useRef<HTMLDialogElement>(null)

  const handleDialogOpen = () => {
    document.body.style.overflow = 'hidden'
  }
  const handleDialogClose = () => {
    document.body.style.overflow = ''
  }

  const isMobileView = () => {
    return window.getComputedStyle(mobileViewRef.current).display !== 'none'
  }

  const handleResize = () => {
    if (mobileDialogRef.current && mobileDialogRef.current.open) {
      if (!isMobileView()) {
        mobileDialogRef.current.close()
      }
    }
  }

  useEffect(() => {
    if (mobileButtonRef.current && mobileDialogRef.current) {
      MenuPanel.initModal(mobileButtonRef.current, mobileDialogRef.current)
      mobileButtonRef.current.addEventListener('click', handleDialogOpen)
      mobileDialogRef.current.addEventListener('close', handleDialogClose)
      window.addEventListener('resize', handleResize)
      // here we make sure to close the dialog (modal) on device resize (on Ipad Air changing the view from horizental to vertical changes the view from mobile to desktop version)
    }
    return () => {
      if (mobileButtonRef.current && mobileDialogRef.current) {
        mobileButtonRef.current.removeEventListener('click', handleDialogOpen)
        mobileDialogRef.current.removeEventListener('close', handleDialogClose)

        document.body.style.overflow = undefined
      }
    }
  }, [])

  return (
    <>
      <nav className="sidebar-filters--mobile" ref={mobileViewRef}>
        <button className="kth-button filters" ref={mobileButtonRef}>
          <span>{title}</span>
        </button>
        <FiltersMobileDialog ref={mobileDialogRef}>
          <a href={ancestorItem.href} className="kth-button back">
            {ancestorItem.label}
          </a>
          <h4>{title}</h4>
          {children}
        </FiltersMobileDialog>
      </nav>

      <nav className="sidebar-filters">
        <a href={ancestorItem.href} className="kth-button back">
          {ancestorItem.label}
        </a>
        <h4>{title}</h4>
        {children}
      </nav>
    </>
  )
}
