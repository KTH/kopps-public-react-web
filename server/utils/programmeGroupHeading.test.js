const {
  programmeGroupHeadings,
  defaultProgrammeGroupHeading,
  preparatoryEducationalLevel,
  find,
} = require('./programmeGroupHeading')

const tarkuDegree = { code: programmeGroupHeadings.TARKU }
const expectedTarkuHeading = programmeGroupHeadings.TARKU
const expectedTbasHeading = programmeGroupHeadings.TBAS
const expectedDefaultHeading = defaultProgrammeGroupHeading
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
