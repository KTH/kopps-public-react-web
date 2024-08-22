import React, { useEffect, useRef } from 'react'
import { MenuPanel } from '@kth/style'
import "./styles.scss"
import { FiltersMobileDialogProps, FiltersProps } from './types'

export const FiltersMobileDialog = React.forwardRef<HTMLDialogElement, FiltersMobileDialogProps>(
  ({ children }, ref) => (
    <dialog className="kth-mobile-menu left" ref={ref}>
      <div className="kth-mobile-menu__navigation">
        <button className="kth-icon-button close">
          <span className="kth-visually-hidden">Close</span>
        </button>
      </div>
      <div className="mobile-menu__content">{children}</div>
    </dialog>
  )
)
FiltersMobileDialog.displayName = 'FiltersMobileDialog'

export const SidebarFilters: React.FC<FiltersProps> = ({ children, title, ancestorItem }) => {
  const mobileButtonRef = useRef<HTMLButtonElement>(null)
  const mobileDialogRef = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    if (mobileButtonRef.current && mobileDialogRef.current) {
      MenuPanel.initModal(mobileButtonRef.current, mobileDialogRef.current)
    }
  }, [])

  return (
    <>
      <nav className="kth-local-navigation--mobile">
        <button className="kth-button menu"ref={mobileButtonRef}>
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
