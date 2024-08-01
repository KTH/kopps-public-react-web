const i18n = require('../../i18n')
const { formatLongTerm } = require('../../domain/term')

module.exports = { programmeFullName }

/**
 * @param {string} lang
 * @param {string} programmeCode
 * @param {string} term
 * @returns {string}
 */
function programmeFullName(lang, programmeCode, programmeName, term) {
  return `${programmeName} (${programmeCode}), ${i18n.message('programme_admitted_year', lang)} ${formatLongTerm(
    term,
    lang
  )}`
}
