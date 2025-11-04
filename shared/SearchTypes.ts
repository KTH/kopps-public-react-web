import { CourseInstanceSearchDTO, CourseVersionDTO } from '@kth/om-kursen-ladok-client/dist/search/types'
import { ResultType } from './ResultType'

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
