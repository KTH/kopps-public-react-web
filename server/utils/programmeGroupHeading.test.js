const {
  preparatoryEducationalLevel,
  _programmeGroupHeading: programmeGroupHeading,
  find,
} = require('./programmeGroupHeading')

const tarkuDegree = { code: programmeGroupHeading.TARKU }
const expectedTarkuHeading = programmeGroupHeading.TARKU
const expectedTbasHeading = programmeGroupHeading.TBAS
const expectedDefaultHeading = programmeGroupHeading.default
const nonExistantDegree = { code: 'TEST' }
const emptyProgramme = {}
const preparatoryProgramme = { educationalLevel: preparatoryEducationalLevel }
const nonPreparatoryProgramme = { educationalLevel: 'TEST' }

describe('Find programme group heading', () => {
  test('by degree', done => {
    let foundProgrammeGroupHeading = find(emptyProgramme, tarkuDegree)
    expect(foundProgrammeGroupHeading).toEqual(expectedTarkuHeading)
    foundProgrammeGroupHeading = find(emptyProgramme, nonExistantDegree)
    expect(foundProgrammeGroupHeading).toEqual(expectedDefaultHeading)
    foundProgrammeGroupHeading = find(emptyProgramme)
    expect(foundProgrammeGroupHeading).toEqual(expectedDefaultHeading)
    done()
  })
  test('by programme educational level', done => {
    let foundProgrammeGroupHeading = find(preparatoryProgramme)
    expect(foundProgrammeGroupHeading).toEqual(expectedTbasHeading)
    foundProgrammeGroupHeading = find(nonPreparatoryProgramme)
    expect(foundProgrammeGroupHeading).toEqual(expectedDefaultHeading)
    foundProgrammeGroupHeading = find(emptyProgramme)
    expect(foundProgrammeGroupHeading).toEqual(expectedDefaultHeading)
    done()
  })
})
