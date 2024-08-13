import React from 'react'
import { useStore } from '../../../mobx'

const { language } = useStore()

import { ListViewParams } from './types'

import { formatShortTerm } from '../../../../../../domain/term'

const ListView: React.FC<ListViewParams> = ({ results }) => {
  return (
    <>
      {results.map(({ course, searchHitInterval }, index) => {
        const { courseCode, title } = course
        const startTerm = searchHitInterval ? formatShortTerm(searchHitInterval.startTerm, language) : ''
        return (
          <p key={`${courseCode}${index}`}>
            <b>{title}</b> {courseCode} {startTerm && `- ${startTerm}`}
          </p>
        )
      })}
    </>
  )
}

export default ListView
