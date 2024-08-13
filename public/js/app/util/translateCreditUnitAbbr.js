export const translateCreditUnitAbbr = (language, creditUnitAbbr) => {
  return language === 'en' && creditUnitAbbr != 'fup' ? 'credits' : creditUnitAbbr
}
