// @ts-check
const i18n = require('../../i18n')

/**
 * @param {string} departmentName
 * @param {string} lang
 * @returns {object}
 */
function metaTitleAndDescriptionByDepartment(departmentName, lang) {
  const metaTitle = `${i18n.message('courses', lang)} ${departmentName}`

  return { metaTitle, metaDescription: '' }
}

module.exports = { metaTitleAndDescriptionByDepartment }
