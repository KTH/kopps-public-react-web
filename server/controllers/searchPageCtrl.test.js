const log = require('@kth/log')

const koppsApi = require('../kopps/koppsApi')
const ladokApi = require('../ladok/ladokApi')
const { TEST_API_ANSWER_ALGEBRA } = require('../mocks/mockLadokApi')
const { performCourseSearch } = require('./searchPageCtrl')

jest.mock('../configuration', () => ({ server: {} }))
jest.mock('../ladok/ladokApi', () => ({ searchCourses: jest.fn() }))
jest.mock('../kopps/koppsApi', () => ({ searchCourses: jest.fn() }))
jest.mock('@kth/log')
log.info = jest.fn()
log.debug = jest.fn()
log.error = jest.fn()

const { searchCourses } = ladokApi

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
    searchCourses.mockReturnValue(Promise.resolve(TEST_API_ANSWER_ALGEBRA))
    await performCourseSearch(mReq({ pattern: 'Algebra' }, langEn), mRes, mockNext())

    expect(ladokApi.searchCourses).toHaveBeenCalledWith(
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
    expect(mRes.status().json).toBeCalledWith(TEST_API_ANSWER_ALGEBRA)
  })

  test('search by pattern in swedish', async () => {
    searchCourses.mockReturnValue(Promise.resolve(TEST_API_ANSWER_ALGEBRA))
    await performCourseSearch(mReq({ pattern: 'Algebra' }, langSv), mRes, mockNext())

    expect(ladokApi.searchCourses).toHaveBeenCalledWith(
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
    expect(mRes.status().json).toBeCalledWith(TEST_API_ANSWER_ALGEBRA)
  })

  test('search by one educational level param in english', async () => {
    searchCourses.mockReturnValue(Promise.resolve(TEST_API_ANSWER_ALGEBRA))
    await performCourseSearch(mReq({ eduLevel: ['0'] }, langEn), mRes, mockNext())

    expect(ladokApi.searchCourses).toHaveBeenCalledWith(
      {
        kodEllerBenamning: undefined,
        avvecklad: undefined,
        organisation: undefined,
        sprak: undefined,
        startPeriod: undefined,
        utbildningsniva: ['FUPKURS'],
      },
      'en'
    )
    expect(mRes.status().json).toBeCalledWith(TEST_API_ANSWER_ALGEBRA)
  })
  test('search by all educational level param in english', async () => {
    searchCourses.mockReturnValue(Promise.resolve(TEST_API_ANSWER_ALGEBRA))
    await performCourseSearch(mReq({ eduLevel: ['0', '1', '2', '3'] }, langEn), mRes, mockNext())

    expect(ladokApi.searchCourses).toHaveBeenCalledWith(
      {
        kodEllerBenamning: undefined,
        avvecklad: undefined,
        organisation: undefined,
        sprak: undefined,
        startPeriod: undefined,
        utbildningsniva: ['FUPKURS', '2007GKURS', '2007AKURS', '2007FKURS'],
      },
      'en'
    )
    expect(mRes.status().json).toBeCalledWith(TEST_API_ANSWER_ALGEBRA)
  })
  // showOptions
  test('search cancelled courses in english', async () => {
    searchCourses.mockReturnValue(Promise.resolve(TEST_API_ANSWER_ALGEBRA))
    await performCourseSearch(mReq({ showOptions: ['showCancelled'] }, langEn), mRes, mockNext())

    expect(ladokApi.searchCourses).toHaveBeenCalledWith(
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
    expect(mRes.status().json).toBeCalledWith(TEST_API_ANSWER_ALGEBRA)
  })
  test('search by all extra options flag level param in english', async () => {
    searchCourses.mockReturnValue(Promise.resolve(TEST_API_ANSWER_ALGEBRA))
    await performCourseSearch(mReq({ showOptions: ['onlyEnglish', 'showCancelled'] }, langEn), mRes, mockNext())

    expect(ladokApi.searchCourses).toHaveBeenCalledWith(
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
    expect(mRes.status().json).toBeCalledWith(TEST_API_ANSWER_ALGEBRA)
  })

  // department
  test('search by school/department ABD in english', async () => {
    searchCourses.mockReturnValue(Promise.resolve(TEST_API_ANSWER_ALGEBRA))
    await performCourseSearch(mReq({ department: 'ADB' }, langEn), mRes, mockNext())

    expect(ladokApi.searchCourses).toHaveBeenCalledWith(
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
    expect(mRes.status().json).toBeCalledWith(TEST_API_ANSWER_ALGEBRA)
  })

  // all parameters
  test('search all parameters in english', async () => {
    searchCourses.mockReturnValue(Promise.resolve(TEST_API_ANSWER_ALGEBRA))
    await performCourseSearch(
      mReq(
        {
          eduLevel: ['0', '1', '2', '3'],
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

    expect(ladokApi.searchCourses).toHaveBeenCalledWith(
      {
        kodEllerBenamning: 'Algebra',
        avvecklad: 'true',
        organisation: 'ADB',
        sprak: 'ENG',
        startPeriod: ['HT2021', 'VT2021'],
        utbildningsniva: ['FUPKURS', '2007GKURS', '2007AKURS', '2007FKURS'],
      },
      'en'
    )
    expect(mRes.status().json).toBeCalledWith(TEST_API_ANSWER_ALGEBRA)
  })
})
