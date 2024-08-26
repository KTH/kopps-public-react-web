import { ERROR_ASYNC } from '../../hooks/searchUseAsync'
import { ErrorAsync } from '../../hooks/types/UseCourseSearchTypes'

export interface SearchAlertProps {
  alertType: ErrorAsync | null
  languageIndex: 0 | 1
}
