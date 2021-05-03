/* eslint-disable camelcase */
const translate = require('../../../../domain/translate')
const { pageLink } = require('../util/links')

function getProgrammeMenuData(language, proxyPrefixPath, programmeName) {
  const t = translate(language)
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
