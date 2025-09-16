import { CourseInstanceSearchDTO, CourseVersionDTO } from '@kth/om-kursen-ladok-client/dist/search/types'
import { ResultType } from '../../../../../shared/ResultType'

export type CourseVersionResult = {
  type: ResultType.VERSION
  results: CourseVersionDTO[]
}

export type CourseInstanceResult = {
  type: ResultType.INSTANCE
  results: CourseInstanceSearchDTO[]
}

export type SearchData = CourseVersionResult | CourseInstanceResult

export type SearchResponse = {
  searchData?: SearchData
  errorCode?: string
}

export const STATUS = {
  pending: 'pending',
  resolved: 'resolved',
  overflow: 'overflow',
  noQueryProvided: 'noQueryProvided',
  noHits: 'noHits',
  rejected: 'rejected',
  idle: 'idle',
} as const

export const ERROR_ASYNC = {
  overflow: 'errorOverflow',
  noQueryProvided: 'noQueryProvided',
  noHits: 'errorEmpty',
  rejected: 'errorUnknown',
} as const

export type Status = (typeof STATUS)[keyof typeof STATUS]
// This is equivalent to => type Status = 'pending' | 'resolved' | 'overflow' | 'noQueryProvided' | 'noHits' | 'rejected' | 'idle';

export type ErrorAsync = (typeof ERROR_ASYNC)[keyof typeof ERROR_ASYNC]
// This is equivalent to => type ErrorAsync = 'errorOverflow' | 'noQueryProvided' | 'errorEmpty' | 'errorUnknown';

export interface State {
  status: Status
  searchData: SearchData
  error: ErrorAsync | null
}

export type Action =
  | { type: 'pending' }
  | { type: 'resolved'; data: SearchData }
  | { type: 'overflow' }
  | { type: 'noQueryProvided' }
  | { type: 'noHits' }
  | { type: 'rejected' }
