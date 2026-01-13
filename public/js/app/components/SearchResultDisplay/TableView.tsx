import React from 'react'

import './style.scss'

import translate from '../../../../../domain/translate'
import { parseCourseVersionsForTableView, parseCourseInstancesForTableView } from '../../util/searchHelper'

import { SortableTable } from '@kth/kth-reactstrap/dist/components/studinfo'
import { DataItem } from '../../util/types/SearchDisplayTypes'
import { useLanguage } from '../../hooks/useLanguage'
import { ResultType } from 'kopps-public-react-web/shared/ResultType'
import { SearchData } from 'kopps-public-react-web/shared/SearchTypes'
import { LanguageCode } from 'kopps-public-react-web/shared/languageUtil'

const TableView: React.FC<{
  searchData: SearchData
}> = ({ searchData }) => {
  const { languageShortname } = useLanguage()

  const { headers, data } = getTableData(searchData, languageShortname)

  return (
    <div className="table-container">
      <SortableTable headers={headers} data={data} includeNumeric />
    </div>
  )
}

const getTableData = (
  searchData: SearchData,
  languageShortname: LanguageCode
): { headers: string[]; data: DataItem[][] } => {
  const t = translate(languageShortname)

  const COURSE_VERSION_HEADERS: string[] = [
    t('course_code'),
    t('course_name'),
    t('course_scope'),
    t('course_educational_level'),
  ]
  const COURSE_INSTANCE_HEADERS: string[] = [
    ...COURSE_VERSION_HEADERS,
    t('course_language'),
    t('course_pace'),
    t('course_campus'),
    t('department_period_abbr'),
  ]

  switch (searchData.type) {
    case ResultType.VERSION:
      return {
        headers: COURSE_VERSION_HEADERS,
        data: parseCourseVersionsForTableView(searchData.results, languageShortname),
      }
    case ResultType.INSTANCE:
      return {
        headers: COURSE_INSTANCE_HEADERS,
        data: parseCourseInstancesForTableView(searchData.results, languageShortname),
      }
  }
}

export default TableView
