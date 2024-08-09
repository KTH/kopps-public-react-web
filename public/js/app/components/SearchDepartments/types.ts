export { SchoolsWithDepartments } from '../../stores/types/searchPageStoreTypes'

export interface SearchDepartmentsProps {
  onChange: (selected: { department: string }) => void
  disabled?: boolean
}
