'use strict'

const { searchCourses, getAllProgrammes } = require('./ladokApi')
const { createApiClient } = require('@kth/om-kursen-ladok-client')
const serverConfig = {
  ladokMellanlagerApi: 'https://example.com/api',
}

jest.mock('../configuration', () => ({
  server: serverConfig,
}))

jest.mock('@kth/om-kursen-ladok-client')

describe('ladokApi', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  describe.skip('getAllProgrammes', () => {
    it('should call createApiClient with the correct configuration', async () => {
      const mockClient = {
        getAllProgrammes: jest.fn().mockResolvedValue([]),
      }
      createApiClient.mockReturnValue(mockClient)

      await getAllProgrammes()

      expect(createApiClient).toHaveBeenCalledWith(serverConfig.ladokMellanlagerApi)
    })
  })

  describe.skip('searchCourses', () => {
    it('should call createApiClient with the correct configuration', async () => {
      const mockClient = {
        searchCourses: jest.fn().mockResolvedValue([]),
      }
      createApiClient.mockReturnValue(mockClient)

      const pattern = 'testPattern'
      const lang = 'en'
      await searchCourses(pattern, lang)

      expect(createApiClient).toHaveBeenCalledWith(serverConfig.ladokMellanlagerApi)
    })

    it('should call searchCourses on the client with the correct arguments', async () => {
      const mockClient = {
        searchCourses: jest.fn().mockResolvedValue([]),
      }
      createApiClient.mockReturnValue(mockClient)

      const pattern = 'testPattern'
      const lang = 'en'
      await searchCourses(pattern, lang)

      expect(mockClient.searchCourses).toHaveBeenCalledWith(pattern, lang)
    })

    it('should return the courses from the client', async () => {
      const mockCourses = [{ id: 1, name: 'Course 1' }]
      const mockClient = {
        searchCourses: jest.fn().mockResolvedValue(mockCourses),
      }
      createApiClient.mockReturnValue(mockClient)

      const pattern = 'testPattern'
      const lang = 'en'
      const result = await searchCourses(pattern, lang)

      expect(result).toEqual(mockCourses)
    })

    it('should throw an error if the client throws an error', async () => {
      const mockClient = {
        searchCourses: jest.fn().mockRejectedValue(new Error('Client error')),
      }
      createApiClient.mockReturnValue(mockClient)

      const pattern = 'testPattern'
      const lang = 'en'

      await expect(searchCourses(pattern, lang)).rejects.toThrow('Client error')
    })
  })
})
