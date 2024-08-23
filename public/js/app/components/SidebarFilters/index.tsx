import React, { useEffect, useRef } from 'react'
import { MenuPanel } from '@kth/style'
import './styles.scss'
import { FiltersMobileDialogProps, FiltersProps } from './types'

import { useStore } from '../../mobx'
import i18n from '../../../../../i18n'

const { languageIndex } = useStore()
const { resultsHeading } = i18n.messages[languageIndex].generalSearch

const closeDialog = (dialog: any) => {
  dialog.current.close()
}

export const FiltersMobileDialog = React.forwardRef<HTMLDialogElement, FiltersMobileDialogProps>(
  ({ children }, ref) => (
    <dialog className="sidebar-filters--mobile__dialog" ref={ref}>
      <div className="sidebar-filters--mobile__navigation">
        <button className="kth-icon-button close">
          <span className="kth-visually-hidden">Close</span>
        </button>
      </div>
      <div className="sidebar-filters--mobile__content">{children}</div>
      <button onClick={() => closeDialog(ref)} className="kth-button primary">
        {resultsHeading}
      </button>
    </dialog>
  )
)
FiltersMobileDialog.displayName = 'FiltersMobileDialog'

export const SidebarFilters: React.FC<FiltersProps> = ({ children, title, ancestorItem }) => {
  const mobileButtonRef = useRef<HTMLButtonElement>(null)
  const mobileDialogRef = useRef<HTMLDialogElement>(null)

  const handleDialogOpen = () => {
    document.body.style.overflow = 'hidden'
  }
  const handleDialogClose = () => {
    document.body.style.overflow = ''
  }

  useEffect(() => {
    if (mobileButtonRef.current && mobileDialogRef.current) {
      MenuPanel.initModal(mobileButtonRef.current, mobileDialogRef.current)
      mobileButtonRef.current.addEventListener('click', handleDialogOpen)
      mobileDialogRef.current.addEventListener('close', handleDialogClose)
    }
    return () => {
      mobileButtonRef.current.removeEventListener('click', handleDialogOpen)
      mobileDialogRef.current.removeEventListener('close', handleDialogClose)

      document.body.style.overflow = undefined
    }
  }, [])

  return (
    <>
      <nav className="sidebar-filters--mobile">
        <button className="kth-button filters" ref={mobileButtonRef}>
          <span>{title}</span>
        </button>
        <FiltersMobileDialog ref={mobileDialogRef}>
          <a href={ancestorItem.href} className="kth-button back">
            {ancestorItem.label}
          </a>
          <h3>{title}</h3>
          {children}
        </FiltersMobileDialog>
      </nav>

      <nav className="sidebar-filters">
        <a href={ancestorItem.href} className="kth-button back">
          {ancestorItem.label}
        </a>
        <h3>{title}</h3>
        {children}
      </nav>
    </>
  )
}
