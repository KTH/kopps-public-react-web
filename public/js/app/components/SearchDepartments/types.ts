import { DepartmentCodeOrPrefix } from '../../stores/types/searchPageStoreTypes'

export { SchoolsWithDepartments } from '../../stores/types/searchPageStoreTypes'

export interface SearchDepartmentsProps {
  onChange: (selected: { department: DepartmentCodeOrPrefix }) => void
  disabled?: boolean
  departmentCode: string
}
