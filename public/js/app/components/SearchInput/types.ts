export interface SearchInputProps {
  caption: string
  onSubmit: (pattern: string) => void
  disabled?: boolean
}
