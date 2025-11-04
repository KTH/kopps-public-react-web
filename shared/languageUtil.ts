export enum LanguageCode {
  Swedish = 'sv',
  English = 'en',
}

export const isEnglishCode = (language: LanguageCode) => {
  return language === LanguageCode.English
}

export const isEnglishLangIndex = (language: 0 | 1) => {
  return language === 0
}

export const getLangIndex = (language: LanguageCode) => (isEnglishCode(language) ? 0 : 1)
