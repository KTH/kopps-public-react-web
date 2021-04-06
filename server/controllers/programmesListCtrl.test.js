jest.mock('../configuration', () => ({ server: {} }))
jest.mock('../kopps/koppsApi', () => {})
jest.mock('../adldapClient', () => {})

const { _sortProgrammes: sortProgrammes } = require('./programmesListCtrl')

const unsortedProgrammes = [{ title: 'Q' }, { title: 'A' }, { title: 'D' }, { title: 'C' }]

const expextedSortedProgrammes = [{ title: 'A' }, { title: 'C' }, { title: 'D' }, { title: 'Q' }]

describe('Sort programmes', () => {
  test('by title', done => {
    const sortedProgrammes = sortProgrammes(unsortedProgrammes)
    expect(sortedProgrammes).toEqual(expextedSortedProgrammes)
    done()
  })
})
