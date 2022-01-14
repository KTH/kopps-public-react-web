// @ts-check
const i18n = require('../../i18n')

/**
 * @param {string} departmentName
 * @param {string} lang
 * @returns {string}
 */
function departmentTabTitle(departmentName, lang) {
  const title = `${i18n.message('courses', lang)} ${departmentName}`

  return title
}

module.exports = { departmentTabTitle }
