const translate = require('../../../../domain/translate')
const { parentLink, pageLink } = require('../util/links')
const { throwErrorIfNoBrowserConfig } = require('../util/errors')

function getMenuData(applicationStore) {
  const { language, browserConfig } = applicationStore
  throwErrorIfNoBrowserConfig(browserConfig)
  const { programmesList, department, studyHandbook, searchPage } = browserConfig.proxyPrefixPath
  const t = translate(language)
  return {
    ariaLabel: t('main_menu_aria_label'),
    parentLink: {
      text: t('main_menu_studies'),
      url: parentLink(language),
    },
    title: t('main_menu_directory'),
    navList: {
      type: 'expandable',
      items: [
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
          url: pageLink(searchPage),
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
