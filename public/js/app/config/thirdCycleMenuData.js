const translate = require('../../../../domain/translate')
const { parentThirdCycleStudyLink, pageLink } = require('../util/links')

function getThirdCycleMenuData(applicationStore) {
  const { language, browserConfig } = applicationStore
  const { thirdCycleSchoolsAndDepartments, thirdCycleCourseSearch } = browserConfig.proxyPrefixPath
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
          text: t('courses'),
        },
        {
          id: 'thirdCycleDepartmentsList',
          type: 'leaf',
          text: t('third_cycle_courses_by_school'),
          url: pageLink(thirdCycleSchoolsAndDepartments, language),
        },
        {
          id: 'searchThirdCycleCourses',
          type: 'leaf',
          text: t('main_menu_third_cycle_courses_search'),
          url: pageLink(thirdCycleCourseSearch, language),
        },
      ],
    },
  }
}

export default getThirdCycleMenuData
