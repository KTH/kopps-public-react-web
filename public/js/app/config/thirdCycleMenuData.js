const translate = require('../../../../domain/translate')
const { parentThirdCycleStudyLink, pageLink } = require('../util/links')

function getThirdCycleMenuData(applicationStore) {
  const { language, browserConfig } = applicationStore
  const proxyPrefixPath = browserConfig.proxyPrefixPath.uri
  const t = translate(language)
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
          url: pageLink(proxyPrefixPath, 'utbildning/forskarutbildning/kurser/avdelning', language),
        },
        {
          id: 'searchThirdCycleCourses',
          type: 'leaf',
          text: t('main_menu_third_cycle_courses_search'),
          url: pageLink(proxyPrefixPath, 'utbildning/forskarutbildning/kurser/sok', language),
        },
      ],
    },
  }
}

export default getThirdCycleMenuData
