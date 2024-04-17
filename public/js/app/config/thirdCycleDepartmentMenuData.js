const translate = require('../../../../domain/translate')
const { pageLink } = require('../util/links')
const { throwErrorIfNoBrowserConfig } = require('../util/errors')

function getThirdCycleDepartmentMenuData(applicationStore) {
  const { language, browserConfig, departmentName } = applicationStore
  throwErrorIfNoBrowserConfig(browserConfig)

  const { thirdCycleRoot } = browserConfig.redirectProxyPath

  const t = translate(language)
  return {
    ariaLabel: t('main_menu_aria_label'),
    parentLink: {
      text: t('courses'),
      url: pageLink(thirdCycleRoot, language),
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

export default getThirdCycleDepartmentMenuData
