import i18n from '../../../../i18n'

const { literatureListLink } = require('../util/links')

function getLiteratureListBreadcrumbs(applicationStore) {
  const { language, languageIndex, selectedTerm, selectedSchoolCode } = applicationStore
  const { breadcrumb } = i18n.messages[languageIndex].literatureList
  return [
    {
      url: literatureListLink(selectedSchoolCode, selectedTerm, language),
      label: breadcrumb,
    },
  ]
}

export default getLiteratureListBreadcrumbs
