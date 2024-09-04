import { ReactElement } from 'react'
import { SearchHits } from './SearchApiTypes'
export type GetHelpText = (langIndex: number, nameOfInstruction: string, instructionKeys: string[]) => string[]

export type CodeCell = (
  code: string,
  startTerm: string,
  language: string
) => {
  content: ReactElement
  sortKey: string
}

export type InforKursvalLink = (text: string, code: string, startTerm: string, language: string) => ReactElement

export type TitleCell = (
  code: string,
  title: string,
  startTerm: string,
  language: string
) => {
  content: React.ReactElement
  sortKey: string
}

export type PeriodsStrType = (
  startPeriod: number | string,
  startTerm: string | undefined,
  endPeriod: number | string | undefined,
  endTerm: string | undefined,
  language: string
) => string

export type Course = {
  [key: string]: any
}

type DataItem =
  | string
  | {
      content: React.ReactElement | string
      sortKey: string
    }

export type SortAndParseByCourseCodeForTableViewType = (
  courses: Course[],
  sliceUntilNum: number,
  language: string
) => DataItem[][]

export type FlatCoursesArrType = (searchHits: SearchHits[]) => { courses: Course[]; hasSearchHitInterval: boolean }