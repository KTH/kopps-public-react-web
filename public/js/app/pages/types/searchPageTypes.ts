import React from 'react'

import { Pattern, Period, EduLevel, ShowOptions, DepartmentCodeOrPrefix } from '../../stores/types/searchPageStoreTypes'

export interface MainContentProps {
  children: React.ReactNode
}

export type SetCourseSearchParams = (params: Partial<CourseSearchParams>) => void

export interface CourseSearchParams {
  pattern: Pattern
  period: Period[]
  eduLevel: EduLevel[]
  showOptions: ShowOptions[]
  department: DepartmentCodeOrPrefix
}
