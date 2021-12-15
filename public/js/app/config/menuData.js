const translate = require('../../../../domain/translate')
const { parentLink, pageLink } = require('../util/links')

function getMenuData(applicationStore) {
  const { language, browserConfig } = applicationStore
  const { programmesList, courseSearch, department, studyHandbook } = browserConfig.proxyPrefixPath
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
          text: t('courses_of_program'),
          url: pageLink(programmesList),
        },
        {
          id: 'searchAllCourses',
          type: 'leaf',
          text: t('main_menu_search_all'),
          url: pageLink(courseSearch),
        },
        {
          id: 'departmentsList',
          type: 'leaf',
          text: t('courses_by_school'),
          url: pageLink(department),
        },
        {
          id: 'shb',
          type: 'leaf',
          text: t('main_menu_shb'),
          url: pageLink(studyHandbook),
        },
      ],
    },
  }
}

export default getMenuData
