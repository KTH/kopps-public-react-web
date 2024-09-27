import { ERROR_ASYNC, STATUS } from '../../hooks/searchUseAsync'
import { ErrorAsync, Status } from '../../hooks/types/UseCourseSearchTypes'

export interface CourseSearchParams {
  [key: string]: any // Allowing any key-value pair as params
}

export interface SearchHits {
  [key: string]: any
}

export interface CourseSearchResult {
  searchHits?: SearchHits[]
  errorCode?: ErrorAsync
  errorMessage?: string
}

export interface CourseSearchResultState {
  data: CourseSearchResult
  status: Status | null
  error: ErrorAsync | null
}
