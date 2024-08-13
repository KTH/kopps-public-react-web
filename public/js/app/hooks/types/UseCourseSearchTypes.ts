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
  
  type ErrorAsync = (typeof ERROR_ASYNC)[keyof typeof ERROR_ASYNC]
  // This is equivalent to => type ErrorAsync = 'errorOverflow' | 'noQueryProvided' | 'errorEmpty' | 'errorUnknown';
  
  export interface State<T> {
    status: Status
    data: T | null
    error: ErrorAsync | string | null
  }
  
  export type Action<T> =
    | { type: 'pending' }
    | { type: 'resolved'; data: T }
    | { type: 'overflow' }
    | { type: 'noQueryProvided' }
    | { type: 'noHits' }
    | { type: 'rejected'; error: ErrorAsync | string }
  