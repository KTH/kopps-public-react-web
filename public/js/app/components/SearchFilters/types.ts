import { CourseSearchParams, SetCourseSearchParams } from '../../pages/types/searchPageTypes'

import {
  DepartmentCodeOrPrefix,
  EduLevel,
  Period,
  SearchCoursesStore,
  ShowOptions,
} from '../../stores/types/searchPageStoreTypes'

export interface AncestorItem {
  href: string
  label: string
}

export interface SearchFiltersProps {
  ancestorItem?: AncestorItem
  disabled?: boolean
  courseSearchParams: CourseSearchParams
  setCourseSearchParams: SetCourseSearchParams
  filterMode: FilterModes
  collapsable?: boolean
}

export interface FilterParams {
  [key: string]: (Period | EduLevel | ShowOptions)[] | DepartmentCodeOrPrefix
}

export interface SearchFilterStore extends SearchCoursesStore {
  languageIndex: number
}
export const FILTER_MODES: Record<string, FilterModeKey[]> = {
  default: ['period', 'eduLevel', 'showOptions', 'department'],
  thirdCycleCourses: ['onlyMHU', 'department'],
} as const

type FilterModeKey = 'period' | 'eduLevel' | 'showOptions' | 'department' | 'onlyMHU'

export type FilterModes = FilterModeKey[]
