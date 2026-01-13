import React from 'react'

import { Pattern, Period, EduLevel, ShowOptions, DepartmentCodeOrPrefix } from '../../stores/types/searchPageStoreTypes'

export interface MainContentProps {
  children: React.ReactNode
}

export type SetCourseSearchParams = (params: Partial<CourseSearchParams>) => void

export interface CourseSearchParams {
  pattern: Pattern
  eduLevel: EduLevel[]
  showOptions: ShowOptions[]
  department: DepartmentCodeOrPrefix
  period: Period[]
}

export interface SearchPageProps {
  searchMode?: SearchModes
}

export enum SEARCH_MODES {
  default = 'default',
  thirdCycleCourses = 'thirdCycleCourses',
}

export type SearchModes = 'default' | 'thirdCycleCourses'
