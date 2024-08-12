import { ERROR_ASYNC } from '../../hooks/searchUseAsync'

export interface SearchAlertProps {
  alertType: keyof typeof ERROR_ASYNC | null
  languageIndex: 0 | 1
}
