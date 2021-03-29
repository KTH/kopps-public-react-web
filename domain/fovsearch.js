const moment = require('moment-timezone')

const _constants = {
  COURSE_TYPES: [
    { code: 'ALL', titleSv: 'Alla' },
    { code: 'DISTANCE', titleSv: 'Distanskurser' },
    { code: 'ITDISTANCE', titleSv: 'IT-distans' },
    { code: 'ENGLISH', titleSv: 'Kurser på engelska' },
    { code: 'EVENING', titleSv: 'Kvällskurser' },
    { code: 'TEACHER', titleSv: 'Lärarfortbildning' },
    { code: 'SUMMER', titleSv: 'Sommarkurser' },
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
      koppsApiParams.category = null
      koppsApiParams.types = ['SFV', 'SN\u00C4']
      break
    case 'TEACHER':
      koppsApiParams.teachersFurtherEdu = true
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
  // TODO: return upcoming semesters based on today's date.
  return [
    {
      code: 'current',
      titleSv: 'Kommande',
    },
    {
      code: '20201',
      titleSv: '20201',
    },
    {
      code: '20202',
      titleSv: '20202',
    },
    {
      code: '20211',
      titleSv: '20211',
    },
    {
      code: '20212',
      titleSv: '20212',
    },
  ]
}

module.exports = {
  constants: _constants,
  convertUserOptionsToKoppsApiParams: _convertUserOptionsToKoppsApiParams,
  searchOptionsTerms: _searchOptionTerms,
}
