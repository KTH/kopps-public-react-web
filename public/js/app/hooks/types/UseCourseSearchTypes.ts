import { SearchData } from 'kopps-public-react-web/shared/SearchTypes'

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

export type ErrorAsync = (typeof ERROR_ASYNC)[keyof typeof ERROR_ASYNC]

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
