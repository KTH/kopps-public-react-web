const {
  defaultProgrammeGroupHeading,
  preparatoryEducationalLevel,
  findProgrammeGroupHeading,
} = require('./programmeGroupHeading')

const tarkuDegree = { code: 'TARKU' }
const expectedTarkuHeading = 'TARKU'
const expectedTbasHeading = 'TBAS'
const expectedDefaultHeading = defaultProgrammeGroupHeading
const nonExistantDegree = { code: 'TEST' }
const emptyProgramme = {}
const preparatoryProgramme = { educationalLevel: preparatoryEducationalLevel }
const nonPreparatoryProgramme = { educationalLevel: 'TEST' }

describe('Find programme group heading', () => {
  test('by degree', done => {
    let foundProgrammeGroupHeading = findProgrammeGroupHeading(emptyProgramme, tarkuDegree)
    expect(foundProgrammeGroupHeading).toEqual(expectedTarkuHeading)
    foundProgrammeGroupHeading = findProgrammeGroupHeading(emptyProgramme, nonExistantDegree)
    expect(foundProgrammeGroupHeading).toEqual(expectedDefaultHeading)
    foundProgrammeGroupHeading = findProgrammeGroupHeading(emptyProgramme)
    expect(foundProgrammeGroupHeading).toEqual(expectedDefaultHeading)
    done()
  })
  test('by programme educational level', done => {
    let foundProgrammeGroupHeading = findProgrammeGroupHeading(preparatoryProgramme)
    expect(foundProgrammeGroupHeading).toEqual(expectedTbasHeading)
    foundProgrammeGroupHeading = findProgrammeGroupHeading(nonPreparatoryProgramme)
    expect(foundProgrammeGroupHeading).toEqual(expectedDefaultHeading)
    foundProgrammeGroupHeading = findProgrammeGroupHeading(emptyProgramme)
    expect(foundProgrammeGroupHeading).toEqual(expectedDefaultHeading)
    done()
  })
})
