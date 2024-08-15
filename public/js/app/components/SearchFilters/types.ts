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

export interface SidebarFiltersProps {
  ancestorItem: AncestorItem
  disabled: boolean
  courseSearchParams: CourseSearchParams
  setCourseSearchParams: SetCourseSearchParams
  FilterMode?: FilterModes
}

export interface FilterParams {
  [key: string]: (Period | EduLevel | ShowOptions)[] | DepartmentCodeOrPrefix
}

export interface SearchFilterStore extends SearchCoursesStore {
  languageIndex: number
}

export interface CollapsableFiltersProps {
  courseSearchParams: CourseSearchParams
  setCourseSearchParams: SetCourseSearchParams
  FilterMode?: FilterModes
}

export const FILTER_MODES = {
  default: ['period', 'eduLevel', 'showOptions', 'department'],
  thirdCycleCourses: ['onlyMHU', 'department'],
} as const

export type FilterModes = (typeof FILTER_MODES)[keyof typeof FILTER_MODES]
