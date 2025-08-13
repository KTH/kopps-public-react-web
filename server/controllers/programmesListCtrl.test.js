jest.mock('../configuration', () => ({
  server: {
    ladokMellanlagerApi: { baseUrl: 'http://mock-ladok-url' },
    proxyPrefixPath: { programmesList: '', uri: '' },
    toolbar: { url: '' },
  },
}))
jest.mock('../kopps/koppsApi', () => {})

const { _categorizeProgrammes: categorizeProgrammes, _sortProgrammes: sortProgrammes } = require('./programmesListCtrl')

const unsortedProgrammes = [
  { title: 'Q', firstAdmissionTerm: '20201' },
  { title: 'D', firstAdmissionTerm: '20211' },
  { title: 'A' },
  { title: 'A' },
  { title: 'D', firstAdmissionTerm: '20201' },
  { title: 'R', firstAdmissionTerm: '20211', programmeCode: 'AAA' },
  { title: 'R', firstAdmissionTerm: '20201', programmeCode: 'DDD' },
  { title: 'R', firstAdmissionTerm: '20211', programmeCode: 'CCC' },
  { title: 'C' },
]

const expextedSortedProgrammes = [
  { title: 'A' },
  { title: 'A' },
  { title: 'C' },
  { title: 'D', firstAdmissionTerm: '20201' },
  { title: 'D', firstAdmissionTerm: '20211' },
  { title: 'Q', firstAdmissionTerm: '20201' },
  { title: 'R', firstAdmissionTerm: '20201', programmeCode: 'DDD' },
  { title: 'R', firstAdmissionTerm: '20211', programmeCode: 'AAA' },
  { title: 'R', firstAdmissionTerm: '20211', programmeCode: 'CCC' },
]

const emptyProgramme = {}
const tarkuDegreeCode = 'TARKU'
const cingDegreeCode = 'CING'
const tarkuDegreeProgrammeA = {
  title: 'A',
  degrees: [{ code: tarkuDegreeCode }],
}
const tarkuDegreeProgrammeB = {
  title: 'B',
  degrees: [{ code: tarkuDegreeCode }],
}
const tarkuDegreeProgrammeWithLastAdmissionTerm = {
  title: 'B',
  lastAdmissionTerm: '20201',
  degrees: [{ code: tarkuDegreeCode }],
}
const cingDegreeProgrammeA = {
  title: 'A',
  degrees: [{ code: cingDegreeCode }],
}
const cingDegreeProgrammeB = {
  title: 'B',
  degrees: [{ code: cingDegreeCode }],
}
const cingDegreeProgrammeWithLastAdmissionTerm = {
  title: 'B',
  lastAdmissionTerm: '20201',
  degrees: [{ code: cingDegreeCode }],
}

const uncategorizedProgrammes = [
  emptyProgramme,
  tarkuDegreeProgrammeB,
  tarkuDegreeProgrammeA,
  tarkuDegreeProgrammeWithLastAdmissionTerm,
  cingDegreeProgrammeB,
  cingDegreeProgrammeA,
  cingDegreeProgrammeWithLastAdmissionTerm,
]

const expectedCategorizedProgrammes = new Map([
  [
    'TARKU',
    {
      first: [
        { degrees: [{ code: 'TARKU' }], title: 'A' },
        { degrees: [{ code: 'TARKU' }], title: 'B' },
      ],
      second: [{ degrees: [{ code: 'TARKU' }], lastAdmissionTerm: '20201', title: 'B' }],
    },
  ],
  [
    'CING',
    {
      first: [
        { degrees: [{ code: 'CING' }], title: 'A' },
        { degrees: [{ code: 'CING' }], title: 'B' },
      ],
      second: [{ degrees: [{ code: 'CING' }], lastAdmissionTerm: '20201', title: 'B' }],
    },
  ],
  ['YHOGE', { first: [], second: [] }],
  ['GKAND', { first: [], second: [] }],
  ['HOGSK', { first: [], second: [] }],
  ['TMAST', { first: [], second: [] }],
  ['GMAGB', { first: [], second: [] }],
  ['TBAS', { first: [], second: [] }],
  ['OVRIGA', { first: [], second: [] }],
])

describe('Sort programmes', () => {
  test('by title, firstAdmissionTerm, and programmeCode', done => {
    const sortedProgrammes = sortProgrammes(unsortedProgrammes)
    expect(sortedProgrammes).toEqual(expextedSortedProgrammes)
    done()
  })
})

describe('Categorize programmes', () => {
  test('by degree', done => {
    const categorizedProgrammes = categorizeProgrammes(uncategorizedProgrammes)
    expect(categorizedProgrammes).toEqual(expectedCategorizedProgrammes)
    done()
  })
})
