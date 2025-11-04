import { CourseSearchParams, SearchModes, SetCourseSearchParams } from '../../pages/types/searchPageTypes'

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
  disabled?: boolean
  courseSearchParams: CourseSearchParams
  setCourseSearchParams: SetCourseSearchParams
  searchMode: SearchModes
  collapsable?: boolean
}

export interface FilterParams {
  [key: string]: (Period | EduLevel | ShowOptions)[] | DepartmentCodeOrPrefix
}

export interface SearchFilterStore extends SearchCoursesStore {
  languageIndex: number
}
export const FILTER_MODES: Record<string, FilterModeKey[]> = {
  default: ['eduLevel', 'showOptions', 'department', 'currentYear', 'nextYear'],
  thirdCycleCourses: ['onlyMHU', 'department'],
} as const

type FilterModeKey = 'eduLevel' | 'showOptions' | 'department' | 'onlyMHU' | 'currentYear' | 'nextYear'
