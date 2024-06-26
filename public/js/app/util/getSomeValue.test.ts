import getSomeValue from './getSomeValue'

describe('Test getSomeValue function', () => {
  test('It should multiply a number by two', () => {
    const nr = 5
    expect(getSomeValue(5)).toEqual(10)
  })
})
