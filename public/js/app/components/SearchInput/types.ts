export interface SearchInputProps {
  caption: string
  onSubmit: (pattern: string) => void
  realTimeUpdates?: boolean
  searchLabel: string
  disabled?: boolean
}
