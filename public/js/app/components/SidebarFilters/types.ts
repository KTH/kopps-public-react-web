import { ReactNode } from 'react'

export interface FiltersMobileDialogProps {
  children: ReactNode
}

interface AncestorItem {
  href: string
  label: string
}

export interface FiltersProps {
  children: ReactNode
  title: string
  ancestorItem: AncestorItem
}
