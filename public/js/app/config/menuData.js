/* eslint-disable camelcase */
const i18n = require('../../../../i18n')
const translate = require('../util/translate')
const { parentLink, pageLink } = require('../util/links')

function getMenuData(language) {
  const t = translate(i18n, language)
  return {
    ariaLabel: t('main_menu_aria_label'),
    parentLink: {
      text: t('main_menu_student'),
      url: parentLink(language),
    },
    navList: {
      type: 'expandable',
      items: [
        {
          id: 'directory',
          type: 'ancestor',
          text: t('main_menu_directory'),
        },
        {
          id: 'programmesList',
          type: 'leaf',
          text: t('main_menu_programmes_list'),
          url: pageLink('student/kurser/kurser-inom-program'),
        },
        {
          id: 'departmentsList',
          type: 'leaf',
          text: t('main_menu_departments_list'),
          url: pageLink('student/kurser/org'),
        },
        {
          id: 'shb',
          type: 'leaf',
          text: t('main_menu_shb'),
          url: pageLink('student/program/shb'),
        },
      ],
    },
  }
}

export default getMenuData
