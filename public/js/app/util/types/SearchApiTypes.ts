import { ERROR_ASYNC, STATUS } from '../../hooks/searchUseAsync'
import { ErrorAsync, Status } from '../../hooks/types/UseCourseSearchTypes'

export interface KoppsCourseSearchParams {
  [key: string]: any // Allowing any key-value pair as params
}

export interface SearchHits {
  searchHitInterval?: { [key: string]: any }
  course: { [key: string]: any }
}

export interface KoppsCourseSearchResult {
  searchHits?: SearchHits[]
  errorCode?: ErrorAsync
  errorMessage?: string
}

export interface KoppsCourseSearchResultState {
  data: KoppsCourseSearchResult
  status: Status | null
  error: ErrorAsync | null
}
