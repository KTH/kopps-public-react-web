import i18n from '../../../../i18n'

const { pageLink, parentLink } = require('../util/links')
const { throwErrorIfNoBrowserConfig } = require('../util/errors')

function getLiteratureList(applicationStore) {
  const { language, languageIndex, browserConfig, schools, selectedTerm } = applicationStore
  throwErrorIfNoBrowserConfig(browserConfig)

  const { main_menu_aria_label, main_menu_studies } = i18n.messages[languageIndex].messages
  const { navHeading, departmentsOtherUni } = i18n.messages[languageIndex].literatureList

  const { literatureList: pageRoot } = browserConfig.proxyPrefixPath

  const navListItems = schools.map(school => ({
    id: school.code,
    type: 'leaf',
    text: school.name,
    url: pageLink(`${pageRoot}/${selectedTerm}/${school.code}`, language),
  }))
  navListItems.find(schoolEntry => schoolEntry.id === 'XXX').text = departmentsOtherUni

  return {
    ariaLabel: main_menu_aria_label,
    parentLink: {
      text: main_menu_studies,
      url: parentLink(language),
    },
    title: navHeading,
    navList: {
      type: 'expandable',
      items: navListItems,
    },
  }
}

export default getLiteratureList
