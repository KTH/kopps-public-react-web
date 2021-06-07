function formatISODate(date, lang) {
  if (date === '') return null
  const timestamp = Date.parse(date)
  const parsedDate = new Date(timestamp)
  let languageTag // BCP 47 language tag
  switch (lang) {
    case 1:
    case 'sv':
      languageTag = 'sv-SE'
      break
    default:
      languageTag = 'en-US'
      break
  }
  return parsedDate.toLocaleDateString(languageTag)
}

module.exports = {
  formatISODate,
}
