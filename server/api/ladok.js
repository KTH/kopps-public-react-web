const { translateEducationalLevelType } = require('../../domain/eduLevels')
const { extractFromGroupDataType } = require('./util/extractLocalValue')
const { getAccessToken } = require('./util/getAccessToken')
const { server: serverConfig } = require('../configuration')

const doSearch = async ({ baseUrl, ocpApimSupscriptionKey }, accessToken, searchTerm) => {
  const searchUrl = `${baseUrl}/sokKurs?kodEllerBenamning=`

  // TODO Benni - should we exclude postdoctoral courses from here?
  const searchResultsResponse = await fetch(searchUrl + searchTerm, {
    headers: {
      'Ocp-Apim-Subscription-Key': ocpApimSupscriptionKey,
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return await searchResultsResponse.json()
}

const callLadok = async searchTerm => {
  const accessToken = await getAccessToken(serverConfig.ladokAuth)

  return await doSearch(serverConfig.ladokApi, accessToken, searchTerm)
}

const filterOutDuplicateCourses = searchResults =>
  searchResults.filter(
    ({ course }, index, array) => array.findIndex(item => item.course.courseCode === course.courseCode) === index
  )

const searchCourses = async (searchTerm, lang) => {
  const searchResultsObject = await callLadok(searchTerm)

  const [metaInfo, ...searchResultsLadok] = searchResultsObject

  const language = lang === 'en' ? 'engelsk' : 'svensk'

  const searchResults = searchResultsLadok.map(({ flat, json }) => ({
    course: {
      courseCode: flat['utbildning.attribut.kod'],
      title: flat[`utbildning.attribut.${language}.benamning`],
      credits: flat['utbildning.attribut.omfattning'],
      creditUnitLabel: extractFromGroupDataType(json.Attributvarden, {
        groupCode: 'utbildningstyp',
        groupDataType: 'attributgrupp.grunddata',
        dataType: 'string',
        key: `utbildningstyp.studieordning.enhet.${language}.benamning`,
      }),
      creditUnitAbbr: extractFromGroupDataType(json.Attributvarden, {
        groupCode: 'utbildningstyp',
        groupDataType: 'attributgrupp.grunddata',
        dataType: 'string',
        key: 'utbildningstyp.studieordning.enhet.kod',
      }),
      educationalLevel: translateEducationalLevelType(flat['instansutbildningstyp.kod']),
    },
  }))

  const searchHits = filterOutDuplicateCourses(searchResults)

  return { searchHits }
}

module.exports = {
  searchCourses,
}
