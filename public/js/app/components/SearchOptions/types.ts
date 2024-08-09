export interface ReturnValues {
  [key: string]: string[]
}

export interface SearchOptionsProps {
  overrideSearchHead?: string
  paramAliasName?: 'currentYear' | 'nextYear' | 'onlyMHU' | ''
  paramName: 'eduLevel' | 'period' | 'showOptions'
  onChange: (params: ReturnValues) => void
  disabled?: boolean
}
