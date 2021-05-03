/* eslint-disable camelcase */
const i18n = require('../../../../i18n')
const translate = require('../../../../domain/translate')
const { pageLink } = require('../util/links')

function getDepartmentMenuData(language, proxyPrefixPath, departmentName) {
  const t = translate(i18n, language)
  return {
    ariaLabel: t('main_menu_aria_label'),
    parentLink: {
      text: t('main_menu_directory'),
      url: pageLink(proxyPrefixPath, 'student/kurser/org', language),
    },
    navList: {
      type: 'expandable',
      items: [
        {
          id: 'directory',
          type: 'ancestor',
          text: departmentName,
        },
        {
          id: 'courses',
          type: 'leaf',
          text: t('department_courses'),
        },
      ],
    },
  }
}

export default getDepartmentMenuData
