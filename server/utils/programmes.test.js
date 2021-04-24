const { filterOutInvalidTerms } = require('./programmes')

const noApprovedStudyProgrammeTerms = { approvedStudyProgrammeTerms: [] }
const onlyFirstAdmissionTerms = {
  firstAdmissionTerm: '20181',
  approvedStudyProgrammeTerms: ['20172', '20181', '20191', '20201', '20211', '20221'],
}
const onlyLastAdmissionTerms = {
  lastAdmissionTerm: '20211',
  approvedStudyProgrammeTerms: ['20172', '20181', '20191', '20201', '20211', '20221'],
}
const bothFirstAndLastAdmissionTerms = {
  firstAdmissionTerm: '20181',
  lastAdmissionTerm: '20211',
  approvedStudyProgrammeTerms: ['20172', '20181', '20191', '20201', '20211', '20221'],
}
const expectedOnlyFirstAdmissionTerms = ['20181', '20191', '20201', '20211', '20221']
const expectedOnlyLastAdmissionTerms = ['20172', '20181', '20191', '20201', '20211']
const expectedBothFirstAndLastAdmissionTerms = ['20181', '20191', '20201', '20211']

describe('Filter out invalid terms', () => {
  test('with no approved study programme terms', () => {
    const filteredTerms = filterOutInvalidTerms(noApprovedStudyProgrammeTerms)
    expect(filteredTerms).toEqual([])
  })
  test('with only first admission term', () => {
    const filteredTerms = filterOutInvalidTerms(onlyFirstAdmissionTerms)
    expect(filteredTerms).toEqual(expectedOnlyFirstAdmissionTerms)
  })
  test('with only last admission term', () => {
    const filteredTerms = filterOutInvalidTerms(onlyLastAdmissionTerms)
    expect(filteredTerms).toEqual(expectedOnlyLastAdmissionTerms)
  })
  test('with both first and last admission term', () => {
    const filteredTerms = filterOutInvalidTerms(bothFirstAndLastAdmissionTerms)
    expect(filteredTerms).toEqual(expectedBothFirstAndLastAdmissionTerms)
  })
})
