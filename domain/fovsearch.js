const moment = require('moment-timezone')

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
      koppsApiParams.tutoringTime = 'KVÄ'
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

module.exports = {
  convertUserOptionsToKoppsApiParams: _convertUserOptionsToKoppsApiParams,
}
