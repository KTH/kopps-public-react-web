import { ErrorAsync } from '../../hooks/types/UseCourseSearchTypes'

export type AlertType = ErrorAsync | null | 'errorOverflowBeta' | 'errorEmptyBeta' // It is better to remove this after moiving from beta version to main version

export interface SearchAlertProps {
  alertType: AlertType
  languageIndex: 0 | 1
}
