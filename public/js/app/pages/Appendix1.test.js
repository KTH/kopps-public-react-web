import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import { useStore } from '../mobx'
import Appendix1 from './Appendix1'
import { applicationStores } from './mocks/Appendix1ApplicationStore'
import commonSettings from '../config/mocks/mockCommonSettings'

const mockDate = new Date('2022-08-18 16:00')

jest.setTimeout(1000)

jest.mock('../mobx')
jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(),
}))

describe('Component <Appendix1>', () => {
  beforeAll(() => {
    jest.spyOn(global, 'Date').mockImplementation(() => mockDate)
  })

  afterAll(() => {
    jest.spyOn(global, 'Date').mockRestore()
  })

  test('Use CMETE Program Application Store to test Appendix1 Content', async () => {
    applicationStores[0].setBrowserConfig(commonSettings, 'https://www-r.referens.sys.kth.se/')
    useStore.mockReturnValue(applicationStores[0])

    render(<Appendix1 />)
    expect(screen.getByText('Bilaga 1: Kurslista')).toBeInTheDocument()
    expect(
      screen.getByText('Utbildningsplan kull HT2022, Civilingenjörsutbildning i medieteknik (CMETE)')
    ).toBeInTheDocument()
    expect(screen.getByText('Gemensamma kurser')).toBeInTheDocument()
    expect(screen.getByText('Årskurs 1')).toBeInTheDocument()
    expect(screen.getByText('Obligatoriska kurser (64,0 hp)')).toBeInTheDocument()
    expect(screen.getByText('Årskurs 2')).toBeInTheDocument()
    expect(screen.getByText('Obligatoriska kurser (65,0 hp)')).toBeInTheDocument()
    expect(screen.getByText('Årskurs 3')).toBeInTheDocument()
    expect(screen.getByText('Obligatoriska kurser (52,0 hp)')).toBeInTheDocument()
    expect(screen.getByText('Villkorligt valfria kurser')).toBeInTheDocument()
    expect(screen.getByText('Information om villkorligt valfria kurser')).toBeInTheDocument()
    expect(screen.getByText('Årskurs 4')).toBeInTheDocument()
    expect(
      screen.getByText(
        'Under årskurs 4-5 följer studenterna ett masterprogram. De masterprogram som är mappade mot CMETE är följande program:'
      )
    ).toBeInTheDocument()

    expect(screen.getByText('Årskurs 5')).toBeInTheDocument()
    expect(screen.getByText('Under årskurs 4-5 läses ett masterprogram.')).toBeInTheDocument()
  })

  test('Use CMAST Program Application Store to test Appendix1 Content', async () => {
    applicationStores[1].setBrowserConfig(commonSettings, 'https://www-r.referens.sys.kth.se/')
    useStore.mockReturnValue(applicationStores[1])

    render(<Appendix1 />)
    expect(screen.getByText('Bilaga 1: Kurslista')).toBeInTheDocument()
    expect(
      screen.getByText('Utbildningsplan kull HT2022, Civilingenjörsutbildning i maskinteknik (CMAST)')
    ).toBeInTheDocument()
    expect(screen.getByText('Gemensamma kurser')).toBeInTheDocument()
    expect(screen.getByText('Master, flyg- och rymdteknik (AEE)')).toBeInTheDocument()
    expect(screen.getByText('Master, fordonsteknik (FOR)')).toBeInTheDocument()
    expect(screen.getByText('Master, industriell ekonomi (INE)')).toBeInTheDocument()
    expect(screen.getByText('Internationell inriktning, franska (INTF)')).toBeInTheDocument()
    expect(screen.getByText('Internationell inriktning, spanska (INTS)')).toBeInTheDocument()
    expect(screen.getByText('Internationell inriktning, tyska (INTT)')).toBeInTheDocument()
    expect(screen.getByText('Spår, innovationsledning och produktutveckling (IPDE)')).toBeInTheDocument()
    expect(screen.getByText('Spår, maskinkonstruktion (IPUB)')).toBeInTheDocument()
    expect(screen.getByText('Spår, mekatronik (IPUC)')).toBeInTheDocument()
    expect(screen.getByText('Master, marina system (MRS)')).toBeInTheDocument()
    expect(screen.getByText('Master, matematik (MTH)')).toBeInTheDocument()
    expect(screen.getByText('Master, kärnenergiteknik (NEE)')).toBeInTheDocument()
    expect(screen.getByText('Master, industriell produktion (PRM)')).toBeInTheDocument()
    expect(screen.getByText('Master, hållbar energiteknik (SUE)')).toBeInTheDocument()
    expect(screen.getByText('Master, teknik och hållbar utveckling (SUT)')).toBeInTheDocument()
    expect(screen.getByText('Spår, Fluidmekanik (TEMA)')).toBeInTheDocument()
    expect(screen.getByText('Spår, Hållfasthetsteknik (TEMB)')).toBeInTheDocument()
    expect(screen.getByText('Spår, Ljud och vibrationer (TEMC)')).toBeInTheDocument()
  })

  test('Use TBTMD Program Application Store to test Appendix1 Content', async () => {
    applicationStores[2].setBrowserConfig(commonSettings, 'https://www-r.referens.sys.kth.se/')
    useStore.mockReturnValue(applicationStores[2])

    render(<Appendix1 />)
    expect(screen.getByText('Appendix 1: Course list')).toBeInTheDocument()
    expect(
      screen.getByText('Programme syllabus for studies starting in Spring 2020, Technical Preparatory Semester (TBTMD)')
    ).toBeInTheDocument()
    expect(screen.getByText('General Courses')).toBeInTheDocument()
    expect(screen.getByText('Study year 1')).toBeInTheDocument()
    expect(screen.getByText('Mandatory courses (30.0 fup)')).toBeInTheDocument()
    expect(screen.getByText('KH0024')).toBeInTheDocument()
    expect(screen.getByText('KH0025')).toBeInTheDocument()
    expect(screen.getByText('Mathematics for Technical Preparatory Year II')).toBeInTheDocument()
    expect(screen.getByText('Physics for Technical Preparatory Year II')).toBeInTheDocument()
    expect(screen.getByText('12.0 fup')).toBeInTheDocument()
    expect(screen.getByText('18.0 fup')).toBeInTheDocument()
  })
})
