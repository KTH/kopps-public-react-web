import {
  EduLevel,
  Period,
  ShowOptions,
  SearchCoursesStore,
  DepartmentCodeOrPrefix,
  Pattern,
} from '../../stores/types/searchPageStoreTypes'

export interface AncestorItem {
  href: string
  label: string
}

export interface SearchFiltersProps {
  ancestorItem: AncestorItem
  updateSearch: (param: FilterParams) => void
  disabled: boolean
}

export interface FilterParams {
  [key: string]: string[] | string
}

export interface FilterStore extends SearchCoursesStore {
  languageIndex: number
}
