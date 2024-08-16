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
}
