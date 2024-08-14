import React from 'react'
import './style.scss'

import { useStore } from '../../mobx'

import translate from '../../../../../domain/translate'
import { flatCoursesArr, sortAndParseByCourseCodeForTableView } from '../../util/newSearchHelper'

import { TableViewParams } from './types'
import { SortableTable } from '@kth/kth-reactstrap/dist/components/studinfo'

const TableView: React.FC<TableViewParams> = ({ results }) => {
  const { language, languageIndex } = useStore()
  const t = translate(language)

  const { courses, hasSearchHitInterval } = flatCoursesArr(results)

  const sliceUntilNum = hasSearchHitInterval ? 5 : 4
  const headers = [
    t('course_code'),
    t('course_name'),
    t('course_scope'),
    t('course_educational_level'),
    t('department_period_abbr'),
  ].slice(0, sliceUntilNum)

  const coursesForTableView = sortAndParseByCourseCodeForTableView(courses, sliceUntilNum, language)

  return (
    <div className="table-container">
      <SortableTable headers={headers} data={coursesForTableView} includeNumeric />
    </div>
  )
}

export default TableView
