/* eslint-disable camelcase */
const i18n = require('../../../../i18n')
const translate = require('../util/translate')
const { pageLink } = require('../util/links')

function getProgrammeMenuData(language, proxyPrefixPath, programmeName) {
  const t = translate(i18n, language)
  return {
    ariaLabel: t('main_menu_aria_label'),
    parentLink: {
      text: t('main_menu_directory'),
      url: pageLink(proxyPrefixPath, 'student/kurser/org', language),
    },
    navList: {
      type: 'expandable',
      items: [
        {
          id: 'directory',
          type: 'ancestor',
          text: programmeName,
        },
        {
          id: 'studyYears',
          type: 'leaf',
          text: t('programme_study_years'),
        },
      ],
    },
  }
}

export default getProgrammeMenuData
