const { translateEducationalLevelType } = require('../../domain/eduLevels')
const { extractFromGroupDataType } = require('./util/extractLocalValue')

const GRANT_TYPE = 'client_credentials'
const clientId = process.env.LADOK_CLIENT_ID
const clientSecret = process.env.LADOK_CLIENT_SECRET
const scope = process.env.LADOK_SCOPE
const tokenUrl = process.env.LADOK_TOKEN_URL
const ocpApimSupscriptionKey = process.env.LADOK_OCP_APIM_SUBSCRIPTION_KEY
const ladokBaseUrl = process.env.LADOK_BASE_URL

const getAccessToken = async () => {
  const data = {
    grant_type: GRANT_TYPE,
    client_id: clientId,
    client_secret: clientSecret,
    scope,
  }

  const urlEncodedData = new URLSearchParams(Object.entries(data)).toString()
  const jwtTokenResponse = await fetch(tokenUrl, {
    method: 'POST',
    body: urlEncodedData,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
  })

  const jwtToken = await jwtTokenResponse.json()

  return jwtToken.access_token
}

const callLadok = async searchTerm => {
  const accessToken = await getAccessToken()

  const searchUrl = `${ladokBaseUrl}/sokKurs?kodEllerBenamning=`

  // TODO Benni - should we exclude postdoctoral courses from here?
  const searchResultsResponse = await fetch(searchUrl + searchTerm, {
    headers: {
      'Ocp-Apim-Subscription-Key': ocpApimSupscriptionKey,
      Authorization: `Bearer ${accessToken}`,
    },
  })

  return await searchResultsResponse.json()
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
