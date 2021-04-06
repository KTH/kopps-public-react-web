jest.mock('../configuration', () => ({ server: {} }))
jest.mock('../kopps/koppsApi', () => {})
jest.mock('../adldapClient', () => {})

const { _sortProgrammes: sortProgrammes } = require('./programmesListCtrl')

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

describe('Sort programmes', () => {
  test('by title and firstAdmissionTerm', done => {
    const sortedProgrammes = sortProgrammes(unsortedProgrammes)
    expect(sortedProgrammes).toEqual(expextedSortedProgrammes)
    done()
  })
})
