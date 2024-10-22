import { EduLevel, Period, Semester, ShowOptions } from '../../stores/types/searchPageStoreTypes'

export type SearchOptionValues = (EduLevel | Semester | Period | ShowOptions)[]

export interface SearchOptionConfig {
  label: string
  id: string
  value: EduLevel | Semester | Period | ShowOptions
}

export interface SearchOptionReturnValues {
  [key: string]: SearchOptionValues
}

export interface SearchOptionsProps {
  overrideSearchHead?: string
  paramAliasName?: 'currentYear' | 'nextYear' | 'onlyMHU' | ''
  paramName: 'eduLevel' | 'semesters' | 'period' | 'showOptions'
  selectedValues: SearchOptionValues
  onChange: (params: SearchOptionReturnValues) => void
  disabled?: boolean
}
