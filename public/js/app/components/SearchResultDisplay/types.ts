import { CourseVersionDTO } from '@kth/om-kursen-ladok-client/dist/search/types'
import { STATUS } from '../../hooks/types/UseCourseSearchTypes'

export interface SearchResultHeaderParams {
  resultsLength: number
  searchStatus: (typeof STATUS)[keyof typeof STATUS]
  view: View
  setView: (view: View) => void
}

export const VIEW = {
  list: 'list',
  table: 'table',
} as const

export type View = (typeof VIEW)[keyof typeof VIEW]

export interface ListViewParams {
  results: CourseVersionDTO[]
}

export interface TableViewParams extends ListViewParams {}
