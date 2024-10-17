import React from 'react'

import {
  Pattern,
  Period,
  EduLevel,
  ShowOptions,
  DepartmentCodeOrPrefix,
  Semester,
} from '../../stores/types/searchPageStoreTypes'

export interface MainContentProps {
  children: React.ReactNode
}

export type SetCourseSearchParams = (params: Partial<CourseSearchParams>) => void

export interface CourseSearchParams {
  pattern: Pattern
  semesters: Semester[]
  eduLevel: EduLevel[]
  showOptions: ShowOptions[]
  department: DepartmentCodeOrPrefix
}

export interface SearchPageProps {
  searchMode?: SearchModes
}

export const SEARCH_MODES: Record<string, SearchModes> = {
  default: 'default',
  thirdCycleCourses: 'thirdCycleCourses',
} as const

export type SearchModes = 'default' | 'thirdCycleCourses'
