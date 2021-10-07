import i18n from '../../../../i18n'

const { formatShortTerm } = require('../../../../domain/term')
const translate = require('../../../../domain/translate')
const { pageLink, parentLink } = require('../util/links')

function _programmeToBr(programme, term, lang) {
  return {
    url: `${pageLink(browserConfig.proxyPrefixPath.programmeLiteratureList)}/${term}/${programme.code}`,
    label: lang === 'sv' ? programme.sv : programme.en,
  }
}

function getProgrammeLiteratureList(applicationStore) {
  const { language, languageIndex, browserConfig, schools, selectedTerm } = applicationStore
  const { main_menu_aria_label, main_menu_student } = i18n.messages[languageIndex].messages
  const { navHeading, departmentsOtherUni } = i18n.messages[languageIndex].programmeLiteratureList

  const pageRoot = browserConfig.proxyPrefixPath.programmeLiteratureList

  const schoolEntries = schools.map((school) => ({
    id: school.code,
    type: 'leaf',
    text: school.name,
    url: pageLink(`${pageRoot}/${selectedTerm}/${school.code}`, language),
  }))
  schoolEntries.find((schoolEntry) => schoolEntry.id === 'XXX').text = departmentsOtherUni

  const navListItems = [
    {
      id: 'directory',
      type: 'ancestor',
      text: navHeading,
    },
    ...schoolEntries
  ]
  return {
    ariaLabel: main_menu_aria_label,
    parentLink: {
      text: main_menu_student,
      url: parentLink(language),
    },
    navList: {
      type: 'expandable',
      items: navListItems,
    },
  }
}

export default getProgrammeLiteratureList
