const _convertUserOptionsToKoppsApiParams = ({ type, start }) => {
  const koppsApiParams = {
    category: 'VU',
    excludedTypes: 'SAP',
    lang: 'sv', // TODO: use lang from user of embedded html api.
  }
  if (!start || start === 'current') {
    koppsApiParams.date = new Date().toISOString() // TODO: not accurate to current KP behaviour.
  } else {
    koppsApiParams.term = parseInt(start)
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
      koppsApiParams.types = asList('SFV', 'SN\u00C4')
      break
    case 'TEACHER':
      koppsApiParams.teachersFurtherEdu = true
      break
  }

  return koppsApiParams
}

const _defaultFovsearchParam = () => {}

const _fovsearchParams = () => {}

module.exports = {
  convertUserOptionsToKoppsApiParams: _convertUserOptionsToKoppsApiParams,
}
