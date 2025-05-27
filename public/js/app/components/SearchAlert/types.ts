import { ErrorAsync } from '../../hooks/types/UseCourseSearchTypes'

export type AlertType = ErrorAsync | null

export interface SearchAlertProps {
  alertType: AlertType
  languageIndex: 0 | 1
}
