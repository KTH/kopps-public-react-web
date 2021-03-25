const { convertUserOptionsToKoppsApiParams } = require('./fovsearch')
const moment = require('moment')

describe('when derived using input from fovsearch form, resulting query parameters should ', () => {
  describe('match with old kopps-public', () => {
    beforeAll(() => {
      jest.spyOn(Date, 'now').mockImplementation(() => new Date('2021-03-23 16:00'))
    })

    afterAll(() => {
      jest.spyOn(Date, 'now').mockRestore()
    })

    test('default search for regression', () => {
      //const queryParamString = 'l=sv&type=ALL&start=current&mainsubject=&studyPace='
      const formInput = {
        l: 'sv',
        type: 'ALL',
        start: 'current',
        mainsubject: '',
        studypace: '',
      }
      const oldKpQueryParamsToKopps = {
        start: 'Mon Mar 22 00:00:00 CET 2021',
        l: 'sv-SE',
        category: 'VU',
        excludedTypes: 'SAP',
      }
      //const normalizedIsoEquivalentStart = moment(oldKpQueryParamsToKopps.start, 'ddd MMM DD HH:mm:ss z YYYY')
      //oldKpQueryParamsToKopps.start = normalizedIsoEquivalentStart
      expect(convertUserOptionsToKoppsApiParams(formInput)).toStrictEqual(oldKpQueryParamsToKopps)
    })

    test('search with language set to English, for regression', () => {
      const formInput = {
        l: 'en',
        type: 'ALL',
        start: 'current',
        mainsubject: '',
        studypace: '',
      }
      const oldKpQueryParamsToKopps = {
        start: 'Mon Mar 22 00:00:00 CET 2021',
        l: 'en',
        category: 'VU',
        excludedTypes: 'SAP',
      }
      expect(convertUserOptionsToKoppsApiParams(formInput)).toStrictEqual(oldKpQueryParamsToKopps)
    })

    test('search with specific semester VT21, for regression', () => {
      //const queryParamString = '?l=sv&type=ALL&start=20211&mainsubject=&studyPace='
      const formInput = { l: 'sv', type: 'ALL', start: '20211', mainsubject: '', studyPace: '' }
      const oldKpQueryParamsToKopps = { semester: '20211', l: 'sv-SE', category: 'VU', excludedTypes: 'SAP' }
      expect(convertUserOptionsToKoppsApiParams(formInput)).toStrictEqual(oldKpQueryParamsToKopps)
    })

    test('search with all parameters set, for regression', () => {
      //const queryParamString = '?l=sv&type=ALL&start=20211&mainsubject=SZABD&studyPace=50'
      const formInput = { l: 'sv', type: 'ALL', start: '20211', mainsubject: 'SZABD', studypace: '50' }
      const oldKpQueryParamsToKopps = {
        semester: '20211',
        l: 'sv-SE',
        category: 'VU',
        excludedTypes: 'SAP',
        minStudyPace: '50',
        maxStudyPace: '50',
        mainSubjectCodes: 'SZABD',
      }
      expect(convertUserOptionsToKoppsApiParams(formInput)).toStrictEqual(oldKpQueryParamsToKopps)
    })
  })
})
