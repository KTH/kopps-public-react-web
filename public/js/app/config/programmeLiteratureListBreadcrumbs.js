import i18n from '../../../../i18n'

const translate = require('../../../../domain/translate')
const { literatureListForProgramLink } = require('../util/links')

function getProgrammeLiteratureListBreadcrumbs(applicationStore) {
  const { language, languageIndex, selectedTerm, selectedSchoolCode } = applicationStore
  const { breadcrumb } = i18n.messages[languageIndex].programmeLiteratureList
  return [
    {
      url: literatureListForProgramLink(selectedSchoolCode, selectedTerm, language),
      label: breadcrumb,
    },
  ]
}

export default getProgrammeLiteratureListBreadcrumbs
