const { formatShortTerm } = require('../../../../domain/term')
const translate = require('../../../../domain/translate')
const { pageLink } = require('../util/links')

function _studyYearItems(applicationStore) {
  const { language, browserConfig, programmeCode, term, studyYear, lastStudyYear } = applicationStore
  const pageRoot = browserConfig.proxyPrefixPath.schoolsList
  const t = translate(language)
  if (applicationStore.isMissingAdmission()) {
    return [
      {
        id: `year-${studyYear}`,
        type: 'leaf',
        text: `${t('curriculums_missing_admission')}`,
        url: pageLink(`${pageRoot}/${programmeCode}/${term}/arskurs${studyYear}`, language),
      },
    ]
  }
  const studyYears = []
  for (let year = 1; year <= lastStudyYear; year++) {
    studyYears.push({
      id: `year-${year}`,
      type: 'leaf',
      text: `${t('curriculums_admitted_year_long')} ${year}`,
      url: pageLink(`${pageRoot}/${programmeCode}/${term}/arskurs${year}`, language),
    })
  }
  return studyYears
}

function getCurriculumMenuData(applicationStore) {
  const { language, browserConfig, programmeCode, programmeName, term } = applicationStore
  const pageRoot = browserConfig.proxyPrefixPath.schoolsList
  const t = translate(language)
  const directoryText = `${t('programme_admitted_year')} ${formatShortTerm(term, language)}`
  const navListItems = []
  navListItems.push({
    id: 'directory',
    type: 'ancestor',
    text: directoryText,
  })
  return {
    ariaLabel: t('main_menu_aria_label'),
    parentLink: {
      text: programmeName,
      url: pageLink(`${pageRoot}/${programmeCode}`, language),
    },
    navList: {
      type: 'expandable',
      items: navListItems.concat(_studyYearItems(applicationStore)),
    },
  }
}

export default getCurriculumMenuData
