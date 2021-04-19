import React from 'react'

import getMenuData from '../config/menuData'
import mockGetMenuData from './mocks/mockMenuData'

describe('Check if getMenuData is correctly fetching menuData', () => {
  test('in English', done => {
    const lang = 'en'
    const menuData = getMenuData(lang, 'localhost://kopps-public') //move to mocks
    const expectedMenuData = mockGetMenuData(lang)
    expect(menuData).toEqual(expectedMenuData)

    done()
  })

  test('in Swedish', done => {
    const lang = 'sv'
    const menuData = getMenuData(lang, 'localhost://kopps-public') //move to mocks
    const expectedMenuData = mockGetMenuData(lang)
    expect(menuData).toEqual(expectedMenuData)

    done()
  })
})
