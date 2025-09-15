export enum LanguageCode {
  Swedish = 'sv',
  English = 'en',
}

export const isEnglishCode = (language: LanguageCode) => {
  return language === LanguageCode.English
}
