/* eslint-disable react/prop-types */

import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import { toHaveNoViolations } from 'jest-axe'

import createApplicationStore from '../stores/createApplicationStore'
import commonSettings from '../config/mocks/mockCommonSettings'
import { studyProgramme, studyYearCourses, supplementaryInfo } from '../config/mocks/mockPDFApplicationStoreData'
import ElementWrapperForPDF from '../components/ElementWrapperForPDF'
import { ObjectivesForExport } from './Objectives'
import { ExtentContentForPDF } from './Extent'
import { EligilbiltyContentForPDF } from './Eligibility'
import { ImplementationContentForPDF } from './Implementation'
import { Appendix1PDFExport } from './Appendix1'
import { Appendix2PDFExport } from './Appendix2'

expect.extend(toHaveNoViolations)

const programmeName = {
  sv: 'Arkitektutbildning',
  en: 'Degree Programme in Architecture',
}
const lengthInStudyYears = 5
const studyYears = [1, 2, 3, 4, 5]
const credits = 300
const creditUnitAbbr = 'hp'
const term = '20222'
const programmeCode = 'ARKIT'
const langSv = 'sv'
const langEn = 'en'
const storeId = 'pdfStore'

const applicationStore = createApplicationStore(storeId)
applicationStore.setBrowserConfig(commonSettings)
applicationStore.setProgrammeCode(programmeCode)
applicationStore.setLengthInStudyYears(lengthInStudyYears)
applicationStore.setTerm(term)
applicationStore.setStudyProgramme(studyProgramme)
applicationStore.studyYear = [...studyYears]
applicationStore.studyYearCourses = studyYearCourses
applicationStore.supplementaryInfo = supplementaryInfo
applicationStore.setCredits(credits)
applicationStore.setCreditUnitAbbr(creditUnitAbbr)

const WrapperProgrammeSyllabusExport = ({ lang, component: Component }) => {
  applicationStore.setLanguage(lang)
  applicationStore.setProgrammeName(programmeName[lang])
  applicationStore.setLanguage(lang)
  applicationStore.setProgrammeNameInOtherLanguage(lang === 'en' ? programmeName.sv : programmeName.en)
  const updatedApplicationStore = {
    ...applicationStore,
  }
  return <ElementWrapperForPDF component={Component} applicationStore={updatedApplicationStore}></ElementWrapperForPDF>
}

describe('Render component Objectives for export with English and swedish language within RouterWrapper', () => {
  // eslint-disable-next-line jest/expect-expect
  test('simple render in English', async () => {
    render(<WrapperProgrammeSyllabusExport lang={langEn} component={ObjectivesForExport} />)
    const h1Header = screen.getByRole('heading', { level: 1 })
    expect(h1Header).toHaveTextContent('Programme objectives')
  })
  // eslint-disable-next-line jest/expect-expect
  test('simple render in Swedish', async () => {
    render(<WrapperProgrammeSyllabusExport lang={langSv} component={ObjectivesForExport} />)
    const h1Header = screen.getByRole('heading', { level: 1 })
    expect(h1Header).toHaveTextContent('Utbildningens mål')
  })
})

describe('Render component ExtentContentForPDF for export with English and swedish language within RouterWrapper', () => {
  // eslint-disable-next-line jest/expect-expect
  test('simple render in English', async () => {
    render(<WrapperProgrammeSyllabusExport lang={langEn} component={ExtentContentForPDF} />)
    const h1Header = screen.getByRole('heading', { level: 1 })
    expect(h1Header).toHaveTextContent('Extent and content of the programme')
  })
  // eslint-disable-next-line jest/expect-expect
  test('simple render in Swedish', async () => {
    render(<WrapperProgrammeSyllabusExport lang={langSv} component={ExtentContentForPDF} />)
    const h1Header = screen.getByRole('heading', { level: 1 })
    expect(h1Header).toHaveTextContent('Utbildningens omfattning och innehåll')
  })
})

describe('Render component EligilbiltyContentForPDF for export with English and swedish language within RouterWrapper', () => {
  // eslint-disable-next-line jest/expect-expect
  test('simple render in English', async () => {
    render(<WrapperProgrammeSyllabusExport lang={langEn} component={EligilbiltyContentForPDF} />)
    const h1Header = screen.getByRole('heading', { level: 1 })
    expect(h1Header).toHaveTextContent('Eligibility and selection')
  })
  // eslint-disable-next-line jest/expect-expect
  test('simple render in Swedish', async () => {
    render(<WrapperProgrammeSyllabusExport lang={langSv} component={EligilbiltyContentForPDF} />)
    const h1Header = screen.getByRole('heading', { level: 1 })
    expect(h1Header).toHaveTextContent('Behörighet och urval')
  })
})

describe('Render component ImplementationContentForPDF for export with English and swedish language within RouterWrapper', () => {
  // eslint-disable-next-line jest/expect-expect
  test('simple render in English', async () => {
    render(<WrapperProgrammeSyllabusExport lang={langEn} component={ImplementationContentForPDF} />)
    const h1Header = screen.getByRole('heading', { level: 1 })
    expect(h1Header).toHaveTextContent('Implementation of the education')
  })
  // eslint-disable-next-line jest/expect-expect
  test('simple render in Swedish', async () => {
    render(<WrapperProgrammeSyllabusExport lang={langSv} component={ImplementationContentForPDF} />)
    const h1Header = screen.getByRole('heading', { level: 1 })
    expect(h1Header).toHaveTextContent('Utbildningens genomförande')
  })
})

describe('Render component Appendix1PDFExport for export with English and swedish language within RouterWrapper', () => {
  // eslint-disable-next-line jest/expect-expect
  test('simple render in English', async () => {
    render(<WrapperProgrammeSyllabusExport lang={langEn} component={Appendix1PDFExport} />)
  })
  // eslint-disable-next-line jest/expect-expect
  test('simple render in Swedish', async () => {
    render(<WrapperProgrammeSyllabusExport lang={langSv} component={Appendix1PDFExport} />)
  })
})

describe('Render component Appendix2PDFExport for export with English and swedish language within RouterWrapper', () => {
  // eslint-disable-next-line jest/expect-expect
  test('simple render in English', async () => {
    render(<WrapperProgrammeSyllabusExport lang={langEn} component={Appendix2PDFExport} />)
  })
  // eslint-disable-next-line jest/expect-expect
  test('simple render in Swedish', async () => {
    render(<WrapperProgrammeSyllabusExport lang={langSv} component={Appendix2PDFExport} />)
  })
})
