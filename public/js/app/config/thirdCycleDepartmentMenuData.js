const translate = require('../../../../domain/translate')
const { pageLink } = require('../util/links')

function getThirdCycleDepartmentMenuData(applicationStore) {
  const { language, browserConfig, departmentName } = applicationStore
  const t = translate(language)
  return {
    ariaLabel: t('main_menu_aria_label'),
    parentLink: {
      text: t('courses'),
      url: pageLink(browserConfig.proxyPrefixPath.thirdCycleRoot, language),
    },
    navList: {
      type: 'expandable',
      items: [
        {
          id: 'directory',
          type: 'ancestor',
          text: departmentName,
        },
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
