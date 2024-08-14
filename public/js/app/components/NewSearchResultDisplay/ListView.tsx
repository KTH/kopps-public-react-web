import React from 'react'
import './style.scss'

import { useStore } from '../../mobx'

import { ListViewParams } from './types'
import i18n from '../../../../../i18n'

import { compareCoursesBy, flatCoursesArr, inforKursvalLink, periodsStr } from '../../util/newSearchHelper'

const ListView: React.FC<ListViewParams> = ({ results }) => {
  const { language, languageIndex } = useStore()

  const { generalSearch } = i18n.messages[languageIndex]

  const { courseHasNoRounds, linkToInforKursval } = generalSearch

  const { courses, hasSearchInterval } = flatCoursesArr(results)
  return (
    <>
      {courses.sort(compareCoursesBy('courseCode')).map((course, index) => {
        const {
          courseCode,
          title,
          credits,
          creditUnitAbbr,
          startTerm,
          endTerm,
          endPeriod,
          startPeriod,
        } = course

        let periodText = undefined
        if (hasSearchInterval) {
          periodText = periodsStr(startPeriod, startTerm, endPeriod, endTerm, language) || courseHasNoRounds
        }
        const InforKursvalLink = inforKursvalLink(linkToInforKursval, courseCode, startTerm, language)
        return (
          <div className="course-card">
            <div className="course-header">
              <h3>
                {title}, {credits} {creditUnitAbbr}
              </h3>
              <span className="course-code">{courseCode}</span>
              {periodText && <span className="course-period">{periodText}</span>}
            </div>
            {/* 
            <p className="course-description">
              we dont have it now
            </p> 
            */}
            <div className="course-details">
              {/* 
              <div className="course-location">
                <img alt="Location Icon" />
                <span></span>
              </div>
              <div className="course-language">
                <img alt="Language Icon" />
                <span></span>
              </div>
              <div className="course-pace">
                <img alt="Pace Icon" />
                <span></span>
              </div> 
              We don't have them now
              */}
              <div className="course-link">{InforKursvalLink}</div>
            </div>
          </div>
        )
      })}
    </>
  )
}

export default ListView
