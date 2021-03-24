function translate(i18n, language) {
  return function t(key) {
    return i18n.message(key, language)
  }
}

module.exports = translate
