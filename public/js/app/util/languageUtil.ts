export enum LanguageCode {
  Swedish = 'sv',
  English = 'en',
}

export const isEnglishCode = (language: LanguageCode) => {
  return language === LanguageCode.English
}

export const getLangIndex = (language: LanguageCode) => (isEnglishCode(language) ? 0 : 1)
