const i18n = require('../i18n')

function translate(language) {
  return function t(key) {
    return i18n.message(key, language)
  }
}

module.exports = translate
