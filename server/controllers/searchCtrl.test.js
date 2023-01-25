const log = require('@kth/log')

const koppsApi = require('../kopps/koppsApi')
const { TEST_API_ANSWER_ALGEBRA } = require('../mocks/mockKoppsApi')
const { performCourseSearch } = require('./searchCtrl')

jest.mock('../configuration', () => ({ server: {} }))
jest.mock('../kopps/koppsApi', () => ({ getSearchResults: jest.fn() }))
jest.mock('@kth/log')
log.info = jest.fn()
log.debug = jest.fn()
log.error = jest.fn()

const { getSearchResults } = koppsApi

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
  const next = {}
  return next
}
describe('Controller searchCtrl, function performCourseSearch', () => {
  test('search by pattern in english', async () => {
    getSearchResults.mockReturnValue(Promise.resolve(TEST_API_ANSWER_ALGEBRA))
    await performCourseSearch(mReq({ pattern: 'Algebra' }, langEn), mRes, mockNext())

    expect(koppsApi.getSearchResults).toHaveBeenCalledWith('text_pattern=Algebra', langEn)
    expect(mRes.status().json).toBeCalledWith(TEST_API_ANSWER_ALGEBRA)
  })

  test('search by pattern in swedish', async () => {
    getSearchResults.mockReturnValue(Promise.resolve(TEST_API_ANSWER_ALGEBRA))
    await performCourseSearch(mReq({ pattern: 'Algebra' }, langSv), mRes, mockNext())

    expect(koppsApi.getSearchResults).toHaveBeenCalledWith('text_pattern=Algebra', langSv)
    expect(mRes.status().json).toBeCalledWith(TEST_API_ANSWER_ALGEBRA)
  })

  test('search by one educational level param in english', async () => {
    getSearchResults.mockReturnValue(Promise.resolve(TEST_API_ANSWER_ALGEBRA))
    await performCourseSearch(mReq({ eduLevel: ['0'] }, langEn), mRes, mockNext())

    expect(koppsApi.getSearchResults).toHaveBeenCalledWith('educational_level=PREPARATORY', 'en')
    expect(mRes.status().json).toBeCalledWith(TEST_API_ANSWER_ALGEBRA)
  })
  test('search by all educational level param in english', async () => {
    getSearchResults.mockReturnValue(Promise.resolve(TEST_API_ANSWER_ALGEBRA))
    await performCourseSearch(mReq({ eduLevel: ['0', '1', '2', '3'] }, langEn), mRes, mockNext())

    expect(koppsApi.getSearchResults).toHaveBeenCalledWith(
      'educational_level=PREPARATORY&educational_level=BASIC&educational_level=ADVANCED&educational_level=RESEARCH',
      'en'
    )
    expect(mRes.status().json).toBeCalledWith(TEST_API_ANSWER_ALGEBRA)
  })
  // showOptions
  test('search cancelled courses in english', async () => {
    getSearchResults.mockReturnValue(Promise.resolve(TEST_API_ANSWER_ALGEBRA))
    await performCourseSearch(mReq({ showOptions: ['showCancelled'] }, langEn), mRes, mockNext())

    expect(koppsApi.getSearchResults).toHaveBeenCalledWith('flag=include_non_active', 'en')
    expect(mRes.status().json).toBeCalledWith(TEST_API_ANSWER_ALGEBRA)
  })
  test('search by all extra options flag level param in english', async () => {
    getSearchResults.mockReturnValue(Promise.resolve(TEST_API_ANSWER_ALGEBRA))
    await performCourseSearch(
      mReq({ showOptions: ['onlyEnglish', 'showCancelled', 'onlyMHU'] }, langEn),
      mRes,
      mockNext()
    )

    expect(koppsApi.getSearchResults).toHaveBeenCalledWith(
      'flag=in_english_only&flag=include_non_active&flag=only_mhu',
      'en'
    )
    expect(mRes.status().json).toBeCalledWith(TEST_API_ANSWER_ALGEBRA)
  })

  // period
  test('search by third spring period (Spring 2021 period 3) in english', async () => {
    getSearchResults.mockReturnValue(Promise.resolve(TEST_API_ANSWER_ALGEBRA))
    await performCourseSearch(mReq({ period: ['20211:3'] }, langEn), mRes, mockNext())

    expect(koppsApi.getSearchResults).toHaveBeenCalledWith('term_period=20211%3A3', 'en')
    expect(mRes.status().json).toBeCalledWith(TEST_API_ANSWER_ALGEBRA)
  })

  test('search by fourth spring period (Spring 2021 period 4) in english', async () => {
    getSearchResults.mockReturnValue(Promise.resolve(TEST_API_ANSWER_ALGEBRA))
    await performCourseSearch(mReq({ period: ['20211:4'] }, langEn), mRes, mockNext())

    expect(koppsApi.getSearchResults).toHaveBeenCalledWith('term_period=20211%3A4', 'en')
    expect(mRes.status().json).toBeCalledWith(TEST_API_ANSWER_ALGEBRA)
  })

  test('search by summer period 2021 sommar when both spring and autumn periods are presented in a list in english', async () => {
    getSearchResults.mockReturnValue(Promise.resolve(TEST_API_ANSWER_ALGEBRA))
    await performCourseSearch(mReq({ period: ['2021:summer'] }, langEn), mRes, mockNext())

    expect(koppsApi.getSearchResults).toHaveBeenCalledWith('term_period=20211%3A5&term_period=20212%3A0', 'en')
    expect(mRes.status().json).toBeCalledWith(TEST_API_ANSWER_ALGEBRA)
  })

  test('search by first autumn period (Autumn 2021 period 1) in english', async () => {
    getSearchResults.mockReturnValue(Promise.resolve(TEST_API_ANSWER_ALGEBRA))
    await performCourseSearch(mReq({ period: ['20212:1'] }, langEn), mRes, mockNext())

    expect(koppsApi.getSearchResults).toHaveBeenCalledWith('term_period=20212%3A1', 'en')
    expect(mRes.status().json).toBeCalledWith(TEST_API_ANSWER_ALGEBRA)
  })

  test('search by second autumn period (Autumn 2021 period 2) in english', async () => {
    getSearchResults.mockReturnValue(Promise.resolve(TEST_API_ANSWER_ALGEBRA))
    await performCourseSearch(mReq({ period: ['20212:2'] }, langEn), mRes, mockNext())

    expect(koppsApi.getSearchResults).toHaveBeenCalledWith('term_period=20212%3A2', 'en')
    expect(mRes.status().json).toBeCalledWith(TEST_API_ANSWER_ALGEBRA)
  })

  test('search by several periods in english', async () => {
    getSearchResults.mockReturnValue(Promise.resolve(TEST_API_ANSWER_ALGEBRA))
    await performCourseSearch(mReq({ period: ['2021:summer', '20212:2', '20211:4'] }, langEn), mRes, mockNext())

    expect(koppsApi.getSearchResults).toHaveBeenCalledWith(
      'term_period=20211%3A5&term_period=20212%3A0&term_period=20212%3A2&term_period=20211%3A4',
      'en'
    )
    expect(mRes.status().json).toBeCalledWith(TEST_API_ANSWER_ALGEBRA)
  })

  // department
  test('search by school/department ABD in english', async () => {
    getSearchResults.mockReturnValue(Promise.resolve(TEST_API_ANSWER_ALGEBRA))
    await performCourseSearch(mReq({ department: 'ADB' }, langEn), mRes, mockNext())

    expect(koppsApi.getSearchResults).toHaveBeenCalledWith('department_prefix=ADB', 'en')
    expect(mRes.status().json).toBeCalledWith(TEST_API_ANSWER_ALGEBRA)
  })

  // all parameters
  test('search by school/department ABD in english', async () => {
    getSearchResults.mockReturnValue(Promise.resolve(TEST_API_ANSWER_ALGEBRA))
    await performCourseSearch(
      mReq(
        {
          eduLevel: ['0', '1', '2', '3'],
          department: 'ADB',
          period: ['20212:2', '20211:4'],
          pattern: 'Algebra',
          showOptions: ['onlyEnglish', 'showCancelled', 'onlyMHU'],
        },
        langEn
      ),
      mRes,
      mockNext()
    )

    expect(koppsApi.getSearchResults).toHaveBeenCalledWith(
      'educational_level=PREPARATORY&educational_level=BASIC&educational_level=ADVANCED&educational_level=RESEARCH&flag=in_english_only&flag=include_non_active&flag=only_mhu&term_period=20212%3A2&term_period=20211%3A4&text_pattern=Algebra&department_prefix=ADB',
      'en'
    )
    expect(mRes.status().json).toBeCalledWith(TEST_API_ANSWER_ALGEBRA)
  })
})
