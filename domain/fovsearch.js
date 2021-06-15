const moment = require('moment-timezone')
const { getCurrentTerm, getNextTerms, getPreviousTerms, formatShortTerm } = require('./term.js')

const _constants = {
  COURSE_TYPES: [
    { code: 'ALL', titleSv: 'Alla' },
    { code: 'DISTANCE', titleSv: 'Distanskurser' },
    { code: 'ITDISTANCE', titleSv: 'IT-distans' },
    { code: 'ENGLISH', titleSv: 'Kurser på engelska' },
    { code: 'EVENING', titleSv: 'Kvällskurser' },
    { code: 'TEACHER', titleSv: 'Lärarfortbildning' },
    { code: 'SUMMER', titleSv: 'Sommarkurser' },
    { code: 'LANGUAGE', titleSv: 'Språkkurser' },
  ],
  /*
    These are the different study pace KTH have as of writing. We should
    probably fetch these from Kopps, new api is needed for that however.
   */
  STUDY_PACES: ['10', '17', '25', '33', '55', '67', '100'].map(code => ({ code: code, titleSv: `${code}%` })),
}

const _defaultSearchParams = () => {
  return {
    category: 'VU',
    excludedTypes: 'SAP',
    l: 'sv-SE',
  }
}

const _convertUserOptionsToKoppsApiParams = ({ l, type, start, mainsubject, studypace }) => {
  const koppsApiParams = _defaultSearchParams()

  if (l !== 'sv' && l !== 'sv-SE') {
    koppsApiParams.l = 'en'
  }

  if (!start || start === 'current') {
    const daysPassedBeforeRemoving = 1
    koppsApiParams.start = moment()
      .tz('CET')
      .subtract(daysPassedBeforeRemoving, 'days')
      .startOf('day')
      .format('ddd MMM DD HH:mm:ss z YYYY')
  } else {
    koppsApiParams.semester = start
  }
  switch (type) {
    case 'ALL':
    default:
      break
    case 'DISTANCE':
      koppsApiParams.tutoringForm = 'DST'
      break
    case 'ENGLISH':
      koppsApiParams.inEnglish = true
      break
    case 'EVENING':
      koppsApiParams.tutoringTime = 'KV\u00C4'
      break
    case 'ITDISTANCE':
      koppsApiParams.tutoringForm = 'ITD'
      break
    case 'SUMMER':
      delete koppsApiParams.category
      koppsApiParams.summerCoursesOnly = true
      break
    case 'TEACHER':
      koppsApiParams.teachersFurtherEdu = true
      break
    case 'LANGUAGE':
      koppsApiParams.emilCodes = [558, 542, 597, 609, 583, 511, 664, 555] // KP-141.
      break
  }

  if (mainsubject) {
    koppsApiParams.mainSubjectCodes = mainsubject
  }
  if (studypace) {
    koppsApiParams.minStudyPace = studypace
    koppsApiParams.maxStudyPace = studypace
  }

  return koppsApiParams
}

const _searchOptionTerms = () => {
  let current = getCurrentTerm()
  let previous = getPreviousTerms(current, 2)
  let next = getNextTerms(current, 1)
  let termToDisplayObject = (t) => ({ code: t, titleSv: formatShortTerm(t, 'sv') })
  return [
    { code: 'current', titleSv: 'Kommande' },
    ...previous.map(termToDisplayObject),
    ...next.map(termToDisplayObject),
  ]
}

module.exports = {
  constants: _constants,
  convertUserOptionsToKoppsApiParams: _convertUserOptionsToKoppsApiParams,
  searchOptionsTerms: _searchOptionTerms,
}
