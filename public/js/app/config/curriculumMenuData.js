/* eslint-disable camelcase */
const { formatShortTerm } = require('../../../../domain/term')
const translate = require('../../../../domain/translate')
const { pageLink } = require('../util/links')

function getCurriculumMenuData(language, proxyPrefixPath, programmeCode, programmeName, term, studyYear) {
  const t = translate(language)
  const directoryText = `${t('programme_admitted_year')} ${formatShortTerm(term, language)}`
  const leafText = `${t('curriculums_admitted_year_long')} ${studyYear}`
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
          text: directoryText,
        },
        {
          id: studyYear,
          type: 'leaf',
          text: leafText,
          url: pageLink(proxyPrefixPath, `student/kurser/program/${programmeCode}/${term}/${studyYear}`, language),
        },
      ],
    },
  }
}

export default getCurriculumMenuData
