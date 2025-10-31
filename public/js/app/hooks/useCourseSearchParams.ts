import { useSearchParams } from 'react-router-dom'
import { CourseSearchParams, SetCourseSearchParams } from '../pages/types/searchPageTypes'
import { useMemo } from 'react'
import { EduLevel, Period, ShowOptions, Pattern, DepartmentCodeOrPrefix } from '../stores/types/searchPageStoreTypes'

/**
 * Wrapper hooks around useSearchParams that handles conversion between url state (URLSearchParams)
 * and CourseSearchParams (used for course search filter)
 */
export const useCourseSearchParams = (): [CourseSearchParams, SetCourseSearchParams] => {
  const [searchParams, setSearchParams] = useSearchParams()
  const courseSearchParams: CourseSearchParams = useMemo(
    () => ({
      pattern: (searchParams.get('pattern') as Pattern) ?? '',
      eduLevel: searchParams.getAll('eduLevel').filter(Boolean) as EduLevel[],
      showOptions: searchParams.getAll('showOptions').filter(Boolean) as ShowOptions[],
      department: (searchParams.get('department') as DepartmentCodeOrPrefix) ?? '',
      period: searchParams.getAll('period').filter(Boolean) as Period[],
    }),
    [searchParams]
  )

  const setCourseSearchParams = (updatedCourseSearchParam: Partial<CourseSearchParams>) => {
    // merge current courseSearchParams with updated value and remove empty values
    const searchParams = Object.fromEntries(
      Object.entries({
        ...courseSearchParams,
        ...updatedCourseSearchParam,
      }).filter(([, value]) => !!value)
    )

    setSearchParams(searchParams)
  }

  return [courseSearchParams, setCourseSearchParams]
}
