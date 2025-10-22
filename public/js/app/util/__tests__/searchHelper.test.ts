import { AcademicSemester } from '@kth/om-kursen-ladok-client'
import { LanguageCode } from '../languageUtil'
import { newPeriodString } from '../searchHelper'
import { SemesterNumber } from 'shared/semesterUtils'
import { KTHPeriodLabel } from '@kth/om-kursen-ladok-client/dist/kth/KTHPeriod/KTHPeriod'

describe('searchHelper', () => {
  describe('newPeriodString', () => {
    describe('in Swedish', () => {
      it.each(['P0', 'P1', 'P2'])(
        'generates string for autumn periods if only start period given: %s',
        (period: KTHPeriodLabel) => {
          expect(
            newPeriodString(LanguageCode.Swedish, {
              start: {
                period,
                semester: new AcademicSemester(2025, SemesterNumber.Autumn),
              },
            })
          ).toStrictEqual(`${period} HT25`)
        }
      )

      it.each(['P3', 'P4', 'P5'])(
        'generates string for spring periods if only start period given: %s',
        (period: KTHPeriodLabel) => {
          expect(
            newPeriodString(LanguageCode.Swedish, {
              start: {
                period,
                semester: new AcademicSemester(2024, SemesterNumber.Spring),
              },
            })
          ).toStrictEqual(`${period} VT24`)
        }
      )

      it.each(['P0', 'P1', 'P2'])(
        'generates end string for autumn periods if start and end period in same year: %s',
        (period: KTHPeriodLabel) => {
          expect(
            newPeriodString(LanguageCode.Swedish, {
              start: {
                period: 'P3',
                semester: new AcademicSemester(2025, SemesterNumber.Spring),
              },
              end: {
                period,
                semester: new AcademicSemester(2025, SemesterNumber.Autumn),
              },
            })
          ).toStrictEqual(`P3 VT25 - ${period} HT25`)
        }
      )
      it.each(['P3', 'P4', 'P5'])(
        'generates end string for spring periods if start and end period in different years: %s',
        (period: KTHPeriodLabel) => {
          expect(
            newPeriodString(LanguageCode.Swedish, {
              start: {
                period: 'P1',
                semester: new AcademicSemester(2025, SemesterNumber.Autumn),
              },
              end: {
                period,
                semester: new AcademicSemester(2026, SemesterNumber.Spring),
              },
            })
          ).toStrictEqual(`P1 HT25 - ${period} VT26`)
        }
      )
    })

    describe('in English', () => {
      it.each(['P0', 'P1', 'P2'])(
        'generates string for autumn periods if only start period given: %s',
        (period: KTHPeriodLabel) => {
          expect(
            newPeriodString(LanguageCode.English, {
              start: {
                period,
                semester: new AcademicSemester(2025, SemesterNumber.Autumn),
              },
            })
          ).toStrictEqual(`${period} Autumn 25`)
        }
      )

      it.each(['P3', 'P4', 'P5'])(
        'generates string for spring periods if only start period given: %s',
        (period: KTHPeriodLabel) => {
          expect(
            newPeriodString(LanguageCode.English, {
              start: {
                period,
                semester: new AcademicSemester(2024, SemesterNumber.Spring),
              },
            })
          ).toStrictEqual(`${period} Spring 24`)
        }
      )

      it.each(['P0', 'P1', 'P2'])(
        'generates end string for autumn periods if start and end period in same year: %s',
        (period: KTHPeriodLabel) => {
          expect(
            newPeriodString(LanguageCode.English, {
              start: {
                period: 'P3',
                semester: new AcademicSemester(2025, SemesterNumber.Spring),
              },
              end: {
                period,
                semester: new AcademicSemester(2025, SemesterNumber.Autumn),
              },
            })
          ).toStrictEqual(`P3 Spring 25 - ${period} Autumn 25`)
        }
      )
      it.each(['P3', 'P4', 'P5'])(
        'generates end string for spring periods if start and end period in different years: %s',
        (period: KTHPeriodLabel) => {
          expect(
            newPeriodString(LanguageCode.English, {
              start: {
                period: 'P1',
                semester: new AcademicSemester(2025, SemesterNumber.Autumn),
              },
              end: {
                period,
                semester: new AcademicSemester(2026, SemesterNumber.Spring),
              },
            })
          ).toStrictEqual(`P1 Autumn 25 - ${period} Spring 26`)
        }
      )
    })
  })
})
