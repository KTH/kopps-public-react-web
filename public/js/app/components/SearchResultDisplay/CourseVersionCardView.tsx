import React from 'react'
import './style.scss'
import { CourseVersionDTO } from '@kth/om-kursen-ladok-client/dist/search/types'
import { CourseHeader } from './ListView'
import { compareCourseDTOBy, createLinkElement } from '../../util/searchHelper'
import { useLanguage } from '../../hooks/useLanguage'

export const CourseVersionCardView: React.FC<{
  results: CourseVersionDTO[]
}> = ({ results }) => {
  results.sort(compareCourseDTOBy('kod'))

  return (
    <>
      {results.map((courseVersion: CourseVersionDTO, index: number) => (
        <CourseVersionCard key={courseVersion.kod + index} courseVersion={courseVersion} />
      ))}
    </>
  )
}

const CourseVersionCard: React.FC<{
  courseVersion: CourseVersionDTO
}> = ({ courseVersion: { kod, benamning, omfattning } }) => {
  const { translation, languageShortname } = useLanguage()

  const { linkToInforKursval } = translation.generalSearch
  const InforKursvalLink = createLinkElement({
    text: linkToInforKursval,
    code: kod,
    language: languageShortname,
    isExternal: true,
  })

  return (
    <div className="course-card">
      <CourseHeader title={benamning} credits={omfattning} courseCode={kod} />
      <div className="course-footer">
        <div className="course-details">
          <div className="course-link">{InforKursvalLink}</div>
        </div>
      </div>
    </div>
  )
}
