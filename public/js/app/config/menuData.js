/* eslint-disable camelcase */
const translate = require('../../../../domain/translate')
const { parentLink, pageLink } = require('../util/links')

function getMenuData(language, proxyPrefixPath) {
  const t = translate(language)
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
          url: pageLink(proxyPrefixPath, 'student/kurser/kurser-inom-program'),
        },
        {
          id: 'searchAllCourses',
          type: 'leaf',
          text: t('main_menu_search_all'),
          url: pageLink(proxyPrefixPath, 'student/kurser/sokkurs'),
        },
        {
          id: 'departmentsList',
          type: 'leaf',
          text: t('main_menu_departments_list'),
          url: pageLink(proxyPrefixPath, 'student/kurser/org'),
        },
        {
          id: 'shb',
          type: 'leaf',
          text: t('main_menu_shb'),
          url: pageLink(proxyPrefixPath, 'student/program/shb'),
        },
      ],
    },
  }
}

export default getMenuData
