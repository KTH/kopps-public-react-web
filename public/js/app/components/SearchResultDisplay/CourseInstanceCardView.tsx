import React from 'react'
import './style.scss'
import { CourseHeader } from './ListView'
import { useLanguage } from '../../hooks/useLanguage'
import { compareCourseDTOBy, createLinkElement, formatCourseInstance } from '../../util/searchHelper'
import { CourseInstanceSearchDTO } from '@kth/om-kursen-ladok-client/dist/search/types'

export const CourseInstanceCardView: React.FC<{ results: CourseInstanceSearchDTO[] }> = ({ results }) => {
  const { translation, languageShortname } = useLanguage()

  const { linkToInforKursval } = translation.generalSearch

  const { course_pace, course_campus, course_language } = translation.messages

  results.sort(compareCourseDTOBy('kod'))

  return (
    <>
      {results.map((course, index) => {
        const {
          courseCode,
          startTerm,
          title,
          credits,
          courseHasNoRounds,
          languages,
          studyPaces,
          campuses,
          periodTexts,
        } = formatCourseInstance(course, languageShortname)

        const InforKursvalLink = createLinkElement({
          text: linkToInforKursval,
          code: courseCode,
          startTerm,
          language: languageShortname,
          isExternal: true,
        })

        return (
          <div className="course-card" key={courseCode + index}>
            <CourseHeader
              title={title}
              credits={credits}
              courseCode={courseCode}
              periodTexts={periodTexts}
              courseHasNoRounds={courseHasNoRounds}
            />
            <div className="course-footer">
              <div className="course-details">
                <div className="course-location">
                  <span className="icon">{course_campus}</span>
                  {stringArrayToSpan(campuses)}
                </div>
                <div className="course-language">
                  <span className="icon">{course_language}</span>
                  {stringArrayToSpan(languages)}
                </div>
                <div className="course-pace">
                  <span className="icon">{course_pace}</span>
                  {stringArrayToSpan(studyPaces)}
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

const stringArrayToSpan = (arr: (number | string)[]) => {
  return arr.map(str => <span key={str}>{str}</span>)
}
