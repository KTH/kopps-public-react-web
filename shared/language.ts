import { LanguageCode } from '@kth/om-kursen-ladok-client/dist/utils'

export const getLanguageIndex = (languageCode: LanguageCode): 0 | 1 => {
  switch (languageCode) {
    case LanguageCode.English:
      return 0
    case LanguageCode.Swedish:
    default:
      return 1
  }
}
