const { convertToLadokSearchParams } = require('../ladokSearchParams')

describe('convertToLadokSearchParams', () => {
  test.each(['someSearchTerm', 'someOtherSearchTerm'])('adds "pattern": %s as "kodEllerBenamning"', pattern => {
    expect(convertToLadokSearchParams({ pattern })).toStrictEqual({
      kodEllerBenamning: pattern,
    })
  })

  test('translates eduLevel', () => {
    const eduLevel = [0, 1, 2, 3, 4]
  })

  // test('showCancelled', () => {
  //   expect(convertToLadokSearchParams({ pattern, showOptions: ['showCancelled'] })).toStrictEqual({
  //     kodEllerBenamning: pattern,
  //   })
  // })
})

// {
//   showOptions: [
//     "showCancelled",
//     "onlyEnglish",
//   ],
//   pattern: "mathematics",
// }
