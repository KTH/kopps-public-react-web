const translate = require('../../../../domain/translate')
const { parentThirdCycleStudyLink, pageLink } = require('../util/links')
const { throwErrorIfNoBrowserConfig } = require('../util/errors')

function getThirdCycleMenuData(applicationStore) {
  const { language, browserConfig } = applicationStore
  throwErrorIfNoBrowserConfig(browserConfig)

  const { thirdCycleSchoolsAndDepartments, thirdCycleCourseSearch, thirdCycleCourseSearchNew } =
    browserConfig.proxyPrefixPath
  const t = translate(language)
  return {
    ariaLabel: t('main_menu_aria_label'),
    parentLink: {
      text: t('main_menu_third_cycle_studies'),
      url: parentThirdCycleStudyLink(language),
    },
    title: t('courses'),
    navList: {
      type: 'expandable',
      items: [
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
        {
          id: 'searchThirdCycleCoursesNew',
          type: 'leaf',
          text: t('main_menu_third_cycle_courses_search_new'),
          url: pageLink(thirdCycleCourseSearchNew, language),
        },
      ],
    },
  }
}

export default getThirdCycleMenuData
