import { ERROR_ASYNC, STATUS } from '../../hooks/searchUseAsync'

export interface KoppsCourseSearchParams {
  [key: string]: any // Allowing any key-value pair as params
}

export interface SearchHits {
  searchHitInterval?: { [key: string]: any }
  course: { [key: string]: any }
}

export interface KoppsCourseSearchResult {
  searchHits?: SearchHits[]
  errorCode?: string
}

export interface KoppsCourseSearchResultState {
  data: KoppsCourseSearchResult
  status: keyof typeof STATUS | null
  error: keyof typeof ERROR_ASYNC | null
}
