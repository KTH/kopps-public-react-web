const translate = require('../../../../domain/translate')
const { pageLink } = require('../util/links')
const { throwErrorIfNoBrowserConfig } = require('../util/errors')

function getDepartmentMenuData(applicationStore) {
  const { language, browserConfig, departmentName } = applicationStore
  throwErrorIfNoBrowserConfig(browserConfig)

  const t = translate(language)
  return {
    ariaLabel: t('main_menu_aria_label'),
    parentLink: {
      text: t('main_menu_directory'),
      url: pageLink(browserConfig.proxyPrefixPath.uri, language),
    },
    title: departmentName,
    navList: {
      type: 'expandable',
      items: [
        {
          id: 'courses',
          type: 'leaf',
          text: t('courses'),
        },
      ],
    },
  }
}

export default getDepartmentMenuData
