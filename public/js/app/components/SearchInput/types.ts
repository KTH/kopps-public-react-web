export interface SearchInputProps {
  caption: string
  onSubmit: (pattern: string) => void
  initialValue?: string
  disabled?: boolean
}
