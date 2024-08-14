import { STATUS } from '../../hooks/types/UseCourseSearchTypes'
import { KoppsCourseSearchResult, KoppsCourseSearchResultState } from '../../util/types/SearchApiTypes'
import { SearchHits } from '../../util/types/SearchApiTypes'

export { KoppsCourseSearchResult, KoppsCourseSearchResultState }

export interface SearchResultDisplayParams {
  resultsState: KoppsCourseSearchResultState
}

export interface SearchResultHeaderParams {
  resultsLength: number
  searchStatus: (typeof STATUS)[keyof typeof STATUS]
  view: View
  setView: (view: View) => void
}

export interface SearchResultComponentParams {
  searchResults: KoppsCourseSearchResult
  view: View
}

export const VIEW = {
  list: 'list',
  table: 'table',
} as const

export type View = (typeof VIEW)[keyof typeof VIEW]

export interface ListViewParams {
  results: SearchHits[]
}

export interface TableViewParams extends ListViewParams {}
