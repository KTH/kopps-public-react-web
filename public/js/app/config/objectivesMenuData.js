const { formatShortTerm } = require('../../../../domain/term')
const translate = require('../../../../domain/translate')
const { pageLink } = require('../util/links')

function _studyYearItems(applicationStore) {
  const { language, browserConfig, programmeCode, term, lengthInStudyYears } = applicationStore
  const pageRoot = browserConfig.proxyPrefixPath.schoolsList
  const t = translate(language)
  const studyYears = []
  for (let year = 1; year <= lengthInStudyYears; year++) {
    studyYears.push({
      id: `year-${year}`,
      type: 'leaf',
      text: `${t('curriculums_admitted_year_long')} ${year}`,
      url: pageLink(`${pageRoot}/${programmeCode}/${term}/arskurs${year}`, language),
    })
  }
  return studyYears
}

function getObjectivesMenuData(applicationStore) {
  const { language, browserConfig, programmeCode, programmeName, term } = applicationStore
  const pageRoot = browserConfig.proxyPrefixPath.schoolsList
  const t = translate(language)
  const directoryText = `${t('programme_admitted_year')} ${formatShortTerm(term, language)}`
  const navListItems = [
    {
      id: 'directory',
      type: 'ancestor',
      text: directoryText,
    },
    ..._studyYearItems(applicationStore),
    {
      id: 'objectives',
      type: 'leaf',
      text: t('programme_objectives'),
      url: pageLink(`${pageRoot}/${programmeCode}/${term}/mal`, language),
    },
  ]
  return {
    ariaLabel: t('main_menu_aria_label'),
    parentLink: {
      text: programmeName,
      url: pageLink(`${pageRoot}/${programmeCode}`, language),
    },
    navList: {
      type: 'expandable',
      items: navListItems,
    },
  }
}

export default getObjectivesMenuData
