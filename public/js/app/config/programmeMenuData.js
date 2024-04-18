const translate = require('../../../../domain/translate')
const { pageLink } = require('../util/links')
const { throwErrorIfNoBrowserConfig } = require('../util/errors')

function getProgrammeMenuData(applicationStore) {
  const { language, browserConfig, programmeName } = applicationStore
  throwErrorIfNoBrowserConfig(browserConfig)

  const t = translate(language)
  return {
    ariaLabel: t('main_menu_aria_label'),
    parentLink: {
      text: t('main_menu_directory'),
      url: pageLink(browserConfig.proxyPrefixPath.uri, language),
    },
    title: programmeName,
    navList: {
      type: 'expandable',
      items: [
        {
          id: 'studyYears',
          type: 'leaf',
          text: t('programme_study_years'),
          url: '',
        },
      ],
    },
  }
}

export default getProgrammeMenuData
