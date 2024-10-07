import React from 'react'
import './style.scss'

import { useStore } from '../../mobx'

import { ListViewParams } from './types'
import i18n from '../../../../../i18n'

import { compareCoursesBy, inforKursvalLink, periodsStr } from '../../util/newSearchHelper'

const ListView: React.FC<ListViewParams> = ({ results }) => {
  const { language, languageIndex } = useStore()

  const { generalSearch } = i18n.messages[languageIndex]

  const { courseHasNoRounds, linkToInforKursval } = generalSearch

  return (
    <>
      {results.sort(compareCoursesBy('kod')).map((course, index) => {
        const {
          kod: courseCode,
          benamning: title,
          omfattning: { formattedWithUnit: credits = '' } = {},
          period: periods = [],
          startperiod: startPeriods = [],
          studietakt: studyPaces = [],
          undervisningssprak: languages = [],
          studieort: campuses = [],
        } = course || {}

        const allPeriods = periods.map(
          ({
            startperiod: { inDigits: startTerm = '' } = {},
            forstaUndervisningsdatum: {
              date: startDate = '',
              year: startPeriodYear = '',
              week: startWeek = '',
              period: startPeriod = '',
            } = {},
            sistaUndervisningsdatum: {
              date: endDate = '',
              year: endPeriodYear = '',
              week: endWeek = '',
              period: endPeriod = '',
            } = {},
            tillfallesperioderNummer = undefined,
          }) => ({
            startTerm,
            startDate,
            startPeriodYear,
            startWeek,
            startPeriod,
            endDate,
            endPeriodYear,
            endWeek,
            endPeriod,
            tillfallesperioderNummer,
          })
        )

        const allStudyPaces = studyPaces.map(({ takt: coursePace = '' }) => ({
          coursePace,
        }))

        const allLanguages = languages.map(({ name: courseLanguage = '' }) => ({
          courseLanguage,
        }))

        const allCampuses = campuses.map(({ name: courseCampus = '' }) => ({
          courseCampus,
        }))

        const allStartPeriods = startPeriods.map(({ code: startTerm = '', inDigits = '' }) => ({
          startTerm,
          inDigits,
        }))

        const startTerm = allStartPeriods.length === 1 ? allStartPeriods[0].startTerm : undefined

        let periodTexts = []
        periodTexts = allPeriods.map(
          ({
            startPeriod,
            startPeriodYear,
            endPeriod,
            endPeriodYear,
            tillfallesperioderNummer,
          }: {
            startPeriod: string
            startPeriodYear: number
            endPeriod: string
            endPeriodYear: number
            tillfallesperioderNummer: number
          }) => periodsStr(startPeriod, startPeriodYear, endPeriod, endPeriodYear, tillfallesperioderNummer, language)
        )

        const areAllPeriodTextsEmpty = periodTexts.every((value: string) => !value.trim())

        const InforKursvalLink = inforKursvalLink(linkToInforKursval, courseCode, startTerm, language)
        return (
          <div className="course-card" key={courseCode + index}>
            <div className="course-header">
              <h3>
                {title}, {credits}
              </h3>
              <span className="course-code">{courseCode}</span>
              <span className="course-period">
                {periodTexts.map((periodText: string, index: number) => `${index != 0 ? ',' : ''} ${periodText}`)}
              </span>
              {(areAllPeriodTextsEmpty || periodTexts.length === 0) && <i>{courseHasNoRounds}</i>}
            </div>
            <div className="course-footer">
              <div className="course-details">
                <div className="course-location">
                  {allCampuses.map(({ courseCampus }: { courseCampus: string }, index: number) => (
                    <span key={courseCampus + index}>{courseCampus}</span>
                  ))}
                </div>
                <div className="course-language">
                  {allLanguages.map(({ courseLanguage }: { courseLanguage: string }, index: number) => (
                    <span key={courseLanguage + index}>{courseLanguage}</span>
                  ))}
                </div>
                <div className="course-pace">
                  {allStudyPaces.map(({ coursePace }: { coursePace: number }, index: number) => (
                    <span key={coursePace + index}>{coursePace}%</span>
                  ))}
                </div>
              </div>
              <div className="course-link">{InforKursvalLink}</div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default ListView
