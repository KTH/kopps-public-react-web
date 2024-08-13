import { KoppsCourseSearchResult, KoppsCourseSearchResultState } from '../../util/types/SearchApiTypes'

export { KoppsCourseSearchResult, KoppsCourseSearchResultState }

export interface SearchResultDisplayParams {
  resultsState: KoppsCourseSearchResultState
}

export interface SearchResultHeaderParams {
  resultsLength: number
  language: string
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
