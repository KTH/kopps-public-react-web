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
          omfattning: {
            formattedWithUnit: credits = ""
          } = {},
          forstaUndervisningsdatum: { period: startPeriod = '', year: startPeriodYear = '' } = {},
          sistaUndervisningsdatum: { period: endPeriod = '', year: endPeriodYear = '' } = {},
          tillfallesperioderNummer = '',
          startperiod: { inDigits: startTerm = '' } = {},
          studietakt: { takt: coursePace = '' } = {},
          undervisningssprak: { name: courseLanguage = '' } = {},
          studieort: { name: courseCampus = '' } = {},
        } = course || {}

        let periodText = undefined
        periodText = periodsStr(
          startPeriod,
          startPeriodYear,
          endPeriod,
          endPeriodYear,
          tillfallesperioderNummer,
          language
        )
        const InforKursvalLink = inforKursvalLink(linkToInforKursval, courseCode, startTerm, language)
        return (
          <div className="course-card" key={courseCode + index}>
            <div className="course-header">
              <h3>
                {title}, {credits}
              </h3>
              <span className="course-code">{courseCode}</span>
              {periodText && <span className="course-period">{periodText}</span>}
              {periodText === '' && <i>{courseHasNoRounds}</i>}
            </div>
            <div className="course-footer">
              <div className="course-details">
                <div className="course-location">
                  <span>{courseCampus}</span>
                </div>
                <div className="course-language">
                  <span>{courseLanguage}</span>
                </div>
                <div className="course-pace">
                  <span>{coursePace}%</span>
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
