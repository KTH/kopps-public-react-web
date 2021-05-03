/* eslint-disable camelcase */
const i18n = require('../../../../i18n')
const translate = require('../../../../domain/translate')
const { pageLink } = require('../util/links')

function getThirdCycleDepartmentMenuData(language, proxyPrefixPath, departmentName) {
  const t = translate(i18n, language)
  return {
    ariaLabel: t('main_menu_aria_label'),
    parentLink: {
      text: t('department_courses'),
      url: pageLink(proxyPrefixPath, 'utbildning/forskarutbildning/kurser', language),
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

export default getThirdCycleDepartmentMenuData
