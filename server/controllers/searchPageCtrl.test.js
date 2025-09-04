const log = require('@kth/log')

const ladokApi = require('../ladok/ladokApi')
const { TEST_API_ANSWER_ALGEBRA } = require('../mocks/mockLadokApi')
const { performCourseSearch } = require('./searchPageCtrl')
const { ResultType } = require('../../shared/ResultType')

jest.mock('../configuration', () => ({ server: {} }))
jest.mock('../ladok/ladokApi', () => ({ searchCourseInstances: jest.fn(), searchCourseVersions: jest.fn() }))
jest.mock('@kth/log')
log.info = jest.fn()
log.debug = jest.fn()
log.error = jest.fn()

const { searchCourseInstances, searchCourseVersions } = ladokApi

const langSv = 'sv'
const langEn = 'en'

const mReq = (mockedClientQuery, lang) => ({
  params: { lang },
  query: mockedClientQuery,
})

const mRes = {
  status: jest.fn().mockReturnThis(),
  json: jest.fn(),
}

const mockNext = () => {
  const next = jest.fn()
  return next
}

// TODO Benni write tests for this once it is implemented completely
describe('Controller searchCtrl, function performCourseSearch', () => {
  describe('Calls searchCourseVersions', () => {
    test('search by pattern with interface language english', async () => {
      searchCourseVersions.mockReturnValue(Promise.resolve(TEST_API_ANSWER_ALGEBRA))
      await performCourseSearch(mReq({ pattern: 'Algebra' }, langEn), mRes, mockNext())

      expect(ladokApi.searchCourseVersions).toHaveBeenCalledWith(
        {
          kodEllerBenamning: 'Algebra',
          avvecklad: undefined,
          organisation: undefined,
          sprak: undefined,
          startPeriod: undefined,
          utbildningsniva: undefined,
        },
        langEn
      )
      expect(mRes.status().json).toHaveBeenCalledWith({
        searchData: { results: TEST_API_ANSWER_ALGEBRA.searchHits, type: ResultType.VERSION },
        errorCode: undefined,
      })
    })

    test('search by pattern with interface language swedish', async () => {
      searchCourseInstances.mockReturnValue(Promise.resolve(TEST_API_ANSWER_ALGEBRA))
      await performCourseSearch(mReq({ pattern: 'Algebra' }, langSv), mRes, mockNext())

      expect(ladokApi.searchCourseVersions).toHaveBeenCalledWith(
        {
          kodEllerBenamning: 'Algebra',
          avvecklad: undefined,
          organisation: undefined,
          sprak: undefined,
          startPeriod: undefined,
          utbildningsniva: undefined,
        },
        langSv
      )
      expect(mRes.status().json).toHaveBeenCalledWith({
        searchData: { results: TEST_API_ANSWER_ALGEBRA.searchHits, type: ResultType.VERSION },
        errorCode: undefined,
      })
    })

    test('search by one educational level param in english', async () => {
      searchCourseInstances.mockReturnValue(Promise.resolve(TEST_API_ANSWER_ALGEBRA))
      await performCourseSearch(mReq({ eduLevel: ['99'] }, langEn), mRes, mockNext())

      expect(ladokApi.searchCourseVersions).toHaveBeenCalledWith(
        {
          kodEllerBenamning: undefined,
          avvecklad: undefined,
          organisation: undefined,
          sprak: undefined,
          startPeriod: undefined,
          utbildningsniva: ['99'],
        },
        'en'
      )
      expect(mRes.status().json).toHaveBeenCalledWith({
        searchData: { results: TEST_API_ANSWER_ALGEBRA.searchHits, type: ResultType.VERSION },
        errorCode: undefined,
      })
    })

    test('search by all educational level param in english', async () => {
      searchCourseInstances.mockReturnValue(Promise.resolve(TEST_API_ANSWER_ALGEBRA))
      await performCourseSearch(mReq({ eduLevel: ['99', '1', '2', '3'] }, langEn), mRes, mockNext())

      expect(ladokApi.searchCourseVersions).toHaveBeenCalledWith(
        {
          kodEllerBenamning: undefined,
          avvecklad: undefined,
          organisation: undefined,
          sprak: undefined,
          startPeriod: undefined,
          utbildningsniva: ['99', '1', '2', '3'],
        },
        'en'
      )
      expect(mRes.status().json).toHaveBeenCalledWith({
        searchData: { results: TEST_API_ANSWER_ALGEBRA.searchHits, type: ResultType.VERSION },
        errorCode: undefined,
      })
    })

    test('search cancelled courses in english', async () => {
      searchCourseInstances.mockReturnValue(Promise.resolve(TEST_API_ANSWER_ALGEBRA))
      await performCourseSearch(mReq({ showOptions: ['showCancelled'] }, langEn), mRes, mockNext())

      expect(ladokApi.searchCourseVersions).toHaveBeenCalledWith(
        {
          kodEllerBenamning: undefined,
          avvecklad: 'true',
          organisation: undefined,
          sprak: undefined,
          startPeriod: undefined,
          utbildningsniva: undefined,
        },
        'en'
      )
      expect(mRes.status().json).toHaveBeenCalledWith({
        searchData: { results: TEST_API_ANSWER_ALGEBRA.searchHits, type: ResultType.VERSION },
        errorCode: undefined,
      })
    })

    test('search by school/department ABD in english', async () => {
      searchCourseInstances.mockReturnValue(Promise.resolve(TEST_API_ANSWER_ALGEBRA))
      await performCourseSearch(mReq({ department: 'ADB' }, langEn), mRes, mockNext())

      expect(ladokApi.searchCourseVersions).toHaveBeenCalledWith(
        {
          kodEllerBenamning: undefined,
          avvecklad: undefined,
          organisation: 'ADB',
          sprak: undefined,
          startPeriod: undefined,
          utbildningsniva: undefined,
        },
        'en'
      )
      expect(mRes.status().json).toHaveBeenCalledWith({
        searchData: { results: TEST_API_ANSWER_ALGEBRA.searchHits, type: ResultType.VERSION },
        errorCode: undefined,
      })
    })

    test('search all parameters in english', async () => {
      searchCourseInstances.mockReturnValue(Promise.resolve(TEST_API_ANSWER_ALGEBRA))
      await performCourseSearch(
        mReq(
          {
            eduLevel: ['99', '1', '2', '3'],
            department: 'ADB',
            semesters: ['HT2021', 'VT2021'],
            pattern: 'Algebra',
            showOptions: ['showCancelled', 'onlyMHU'],
          },
          langEn
        ),
        mRes,
        mockNext()
      )

      expect(ladokApi.searchCourseInstances).toHaveBeenCalledWith(
        {
          kodEllerBenamning: 'Algebra',
          avvecklad: 'true',
          organisation: 'ADB',
          startPeriod: ['HT2021', 'VT2021'],
          utbildningsniva: ['99', '1', '2', '3'],
          onlyMHU: 'true',
        },
        'en'
      )
      expect(mRes.status().json).toHaveBeenCalledWith({
        searchData: { results: TEST_API_ANSWER_ALGEBRA.searchHits, type: ResultType.INSTANCE },
        errorCode: undefined,
      })
    })
  })

  describe('calls searchCourseInstances', () => {
    test('search by pattern + english with interface language swedish', async () => {
      searchCourseInstances.mockReturnValue(Promise.resolve(TEST_API_ANSWER_ALGEBRA))
      await performCourseSearch(mReq({ pattern: 'Algebra', showOptions: ['onlyEnglish'] }, langSv), mRes, mockNext())

      expect(ladokApi.searchCourseInstances).toHaveBeenCalledWith(
        {
          kodEllerBenamning: 'Algebra',
          avvecklad: undefined,
          organisation: undefined,
          sprak: 'ENG',
          startPeriod: undefined,
          utbildningsniva: undefined,
        },
        langSv
      )
      expect(mRes.status().json).toHaveBeenCalledWith({
        searchData: { results: TEST_API_ANSWER_ALGEBRA.searchHits, type: ResultType.INSTANCE },
        errorCode: undefined,
      })
    })

    test('search by pattern + semesters/startPeriod with interface language swedish', async () => {
      searchCourseInstances.mockReturnValue(Promise.resolve(TEST_API_ANSWER_ALGEBRA))
      await performCourseSearch(mReq({ pattern: 'Algebra', semesters: ['HT2021', 'VT2021'] }, langSv), mRes, mockNext())

      expect(ladokApi.searchCourseInstances).toHaveBeenCalledWith(
        {
          kodEllerBenamning: 'Algebra',
          avvecklad: undefined,
          organisation: undefined,
          onlyMHU: undefined,
          sprak: undefined,
          startPeriod: ['HT2021', 'VT2021'],
          utbildningsniva: undefined,
        },
        langSv
      )
      expect(mRes.status().json).toHaveBeenCalledWith({
        searchData: { results: TEST_API_ANSWER_ALGEBRA.searchHits, type: ResultType.INSTANCE },
        errorCode: undefined,
      })
    })

    test('search by all extra options flag level param in english', async () => {
      searchCourseInstances.mockReturnValue(Promise.resolve(TEST_API_ANSWER_ALGEBRA))
      await performCourseSearch(mReq({ showOptions: ['onlyEnglish', 'showCancelled'] }, langEn), mRes, mockNext())

      expect(ladokApi.searchCourseInstances).toHaveBeenCalledWith(
        {
          kodEllerBenamning: undefined,
          avvecklad: 'true',
          organisation: undefined,
          sprak: 'ENG',
          startPeriod: undefined,
          utbildningsniva: undefined,
        },
        'en'
      )
      expect(mRes.status().json).toHaveBeenCalledWith({
        searchData: { results: TEST_API_ANSWER_ALGEBRA.searchHits, type: ResultType.INSTANCE },
        errorCode: undefined,
      })
    })

    // all parameters
    test('search all parameters in english', async () => {
      searchCourseInstances.mockReturnValue(Promise.resolve(TEST_API_ANSWER_ALGEBRA))
      await performCourseSearch(
        mReq(
          {
            eduLevel: ['99', '1', '2', '3'],
            department: 'ADB',
            semesters: ['HT2021', 'VT2021'],
            pattern: 'Algebra',
            showOptions: ['onlyEnglish', 'showCancelled', 'onlyMHU'],
          },
          langEn
        ),
        mRes,
        mockNext()
      )

      expect(ladokApi.searchCourseInstances).toHaveBeenCalledWith(
        {
          kodEllerBenamning: 'Algebra',
          avvecklad: 'true',
          organisation: 'ADB',
          sprak: 'ENG',
          startPeriod: ['HT2021', 'VT2021'],
          utbildningsniva: ['99', '1', '2', '3'],
          onlyMHU: 'true',
        },
        'en'
      )
      expect(mRes.status().json).toHaveBeenCalledWith({
        searchData: { results: TEST_API_ANSWER_ALGEBRA.searchHits, type: ResultType.INSTANCE },
        errorCode: undefined,
      })
    })
  })
})
