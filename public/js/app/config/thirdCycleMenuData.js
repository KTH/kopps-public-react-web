/* eslint-disable camelcase */
const i18n = require('../../../../i18n')
const translate = require('../util/translate')
const { parentThirdCycleStudyLink, pageLink } = require('../util/links')

function getThirdCycleMenuData(language, proxyPrefixPath) {
  const t = translate(i18n, language)
  return {
    ariaLabel: t('main_menu_aria_label'),
    parentLink: {
      text: t('main_menu_third_cycle_studies'),
      url: parentThirdCycleStudyLink(language),
    },
    navList: {
      type: 'expandable',
      items: [
        {
          id: 'directory',
          type: 'ancestor',
          text: t('department_courses'),
        },
        {
          id: 'thirdCycleDepartmentsList',
          type: 'leaf',
          text: t('main_menu_third_cycle_departments_list_header'),
          // url: 'utbildning/forskarutbildning/kurser/avdelning',
          url: pageLink(proxyPrefixPath, 'kurser/avdelning', language),
        },
        {
          id: 'searchThirdCycleCourses',
          type: 'leaf',
          text: t('main_menu_third_cycle_courses_search'),
          // url: 'utbildning/forskarutbildning/kurser/sok',
          url: pageLink(proxyPrefixPath, 'kurser/sok', language),
        },
      ],
    },
  }
}

export default getThirdCycleMenuData
