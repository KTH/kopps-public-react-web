/* eslint-disable camelcase */
const translate = require('../../../../domain/translate')
const { pageLink } = require('../util/links')

function getCurriculumMenuData(language, proxyPrefixPath, programmeCode, programmeName, term, studyYear) {
  const t = translate(language)
  return {
    ariaLabel: t('main_menu_aria_label'),
    parentLink: {
      text: programmeName,
      url: pageLink(proxyPrefixPath, `student/kurser/program/${programmeCode}`, language),
    },
    navList: {
      type: 'expandable',
      items: [
        {
          id: 'directory',
          type: 'ancestor',
          text: term,
        },
        {
          id: studyYear,
          type: 'leaf',
          text: studyYear,
          url: pageLink(proxyPrefixPath, `student/kurser/program/${programmeCode}/${term}/${studyYear}`, language),
        },
      ],
    },
  }
}

export default getCurriculumMenuData
