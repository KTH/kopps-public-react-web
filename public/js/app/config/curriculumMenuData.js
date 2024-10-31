const { formatShortTerm } = require('../../../../domain/term')
const translate = require('../../../../domain/translate')
const { pageLink } = require('../util/links')
const { throwErrorIfNoBrowserConfig } = require('../util/errors')

function _studyYearItems(applicationStore) {
  const { language, browserConfig, programmeCode, term, studyYear, lengthInStudyYears } = applicationStore
  throwErrorIfNoBrowserConfig(browserConfig)

  const { schoolsList: pageRoot } = browserConfig.proxyPrefixPath
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
  for (let year = 1; year <= lengthInStudyYears; year++) {
    studyYears.push({
      id: `year-${year}`,
      type: 'leaf',
      text: `${t('study_year')} ${year}`,
      url: pageLink(`${pageRoot}/${programmeCode}/${term}/arskurs${year}`, language),
    })
  }
  return studyYears
}

function getCurriculumMenuData(applicationStore) {
  const { language, browserConfig, programmeCode, programmeName, term } = applicationStore
  throwErrorIfNoBrowserConfig(browserConfig)

  const { schoolsList: pageRoot } = browserConfig.proxyPrefixPath
  const t = translate(language)
  const directoryText = `${t('programme_admitted_year')} ${formatShortTerm(term, language)}`
  const navListItems = [
    ..._studyYearItems(applicationStore),
    {
      id: 'objectives',
      type: 'leaf',
      text: t('programme_objectives'),
      url: pageLink(`${pageRoot}/${programmeCode}/${term}/mal`, language),
    },
    {
      id: 'extent',
      type: 'leaf',
      text: t('programme_extent_and_content'),
      url: pageLink(`${pageRoot}/${programmeCode}/${term}/omfattning`, language),
    },
    {
      id: 'eligibility',
      type: 'leaf',
      text: t('programme_eligibility_and_selection'),
      url: pageLink(`${pageRoot}/${programmeCode}/${term}/behorighet`, language),
    },
    {
      id: 'implementation',
      type: 'leaf',
      text: t('programme_implementation'),
      url: pageLink(`${pageRoot}/${programmeCode}/${term}/genomforande`, language),
    },
    {
      id: 'appendix1',
      type: 'leaf',
      text: t('programme_appendix1'),
      url: pageLink(`${pageRoot}/${programmeCode}/${term}/kurslista`, language),
    },
    {
      id: 'appendix2',
      type: 'leaf',
      text: t('programme_appendix2'),
      url: pageLink(`${pageRoot}/${programmeCode}/${term}/inriktningar`, language),
    },
    {
      id: 'appendix3',
      type: 'leaf',
      text: 'Bilaga 3: Kurslista från Ladok',
      url: pageLink(`${pageRoot}/${programmeCode}/${term}/kurslista-ladok`, language),
    },
  ]
  return {
    ariaLabel: t('main_menu_aria_label'),
    parentLink: {
      text: programmeName,
      url: pageLink(`${pageRoot}/${programmeCode}`, language),
    },
    title: directoryText,
    navList: {
      type: 'expandable',
      items: navListItems,
    },
  }
}

export default getCurriculumMenuData
