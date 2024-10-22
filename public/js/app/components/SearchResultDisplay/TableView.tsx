import React from 'react'

import './style.scss'

import { useStore } from '../../mobx'

import translate from '../../../../../domain/translate'
import { sortAndParseByCourseCodeForTableView } from '../../util/searchHelper'

import { TableViewParams } from './types'
import { SortableTable } from '@kth/kth-reactstrap/dist/components/studinfo'

const TableView: React.FC<TableViewParams> = ({ results }) => {
  const { language, languageIndex } = useStore()
  const t = translate(language)

  const headers = [
    t('course_code'),
    t('course_name'),
    t('course_scope'),
    t('course_educational_level'),
    t('course_language'),
    t('course_pace'),
    t('course_campus'),
    t('department_period_abbr'),
  ]

  const coursesForTableView = sortAndParseByCourseCodeForTableView(results, language)

  return (
    <div className="table-container">
      <SortableTable headers={headers} data={coursesForTableView} includeNumeric />
    </div>
  )
}

export default TableView
