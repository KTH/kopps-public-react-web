export interface SearchInputProps {
  caption: string
  onSubmit: (pattern: string) => void
  pattern?: string
  disabled?: boolean
}
