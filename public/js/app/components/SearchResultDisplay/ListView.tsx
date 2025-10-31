import React from 'react'
import './style.scss'

import { useLanguage } from '../../hooks/useLanguage'
import { CourseVersionCardView } from './CourseVersionCardView'
import { CourseInstanceCardView } from './CourseInstanceCardView'
import { ResultType } from 'kopps-public-react-web/shared/ResultType'
import { SearchData } from 'kopps-public-react-web/shared/SearchTypes'

export const ListView: React.FC<{
  searchData: SearchData
}> = ({ searchData }) => {
  const { type, results } = searchData

  switch (type) {
    case ResultType.VERSION:
      return <CourseVersionCardView results={results} />
    case ResultType.INSTANCE:
      return <CourseInstanceCardView results={results} />
  }
}

export const CourseHeader: React.FC<{
  title: string
  credits: string
  courseCode: string
  periodTexts?: string
  courseHasNoRounds?: boolean
}> = ({ title, credits, courseCode, periodTexts, courseHasNoRounds }) => {
  const { translation } = useLanguage()
  const { generalSearch } = translation

  return (
    <div className="course-header">
      <h3>
        {title}, {credits}
      </h3>
      <span className="course-code">{courseCode}</span>
      {periodTexts && periodTexts.length > 0 && <span className="course-period">{periodTexts}</span>}
      {courseHasNoRounds && <i>{generalSearch.courseHasNoRounds}</i>}
    </div>
  )
}

export default ListView
