import React, { useState } from 'react'

import { observer } from 'mobx-react'
import { Col, Row } from 'reactstrap'

import { Link, PageHeading, SortableTable } from '@kth/kth-reactstrap/dist/components/studinfo'
import Article from '../components/Article'
import { useStore } from '../mobx'

import translate from '../../../../domain/translate'
// import { ErrorBoundary } from 'react-error-boundary'

import { courseLink } from '../util/links'
import { formatShortTerm } from '../../../../domain/term'

function codeCell(code) {
  const { language } = useStore()
  return {
    content: <Link href={courseLink(code, language)}>{code}</Link>,
    sortKey: code,
  }
}

function titleCell(code, title) {
  const { language } = useStore()
  return {
    content: <Link href={courseLink(code, language)}>{title}</Link>,
    sortKey: title,
  }
}

function compareCoursesBy(key) {
  return function compare(a, b) {
    if (a[key] < b[key]) {
      return -1
    }
    if (a[key] > b[key]) {
      return 1
    }
    return 0
  }
}

function sortAndParseByCourseCode(courses) {
  courses.sort(compareCoursesBy('courseCode'))
  const parsedCourses = courses.map(
    ({ courseCode: code, title, credits, creditUnitAbbr, educationalLevel: level, startPeriod, startTerm }) => [
      codeCell(code),
      titleCell(code, title),
      `${credits} ${creditUnitAbbr}`,
      level,
      `P${startPeriod} ${formatShortTerm(startTerm)}`,
      //P5 VT22
      // P5 spring 21
    ]
  )
  return parsedCourses
}

const SearchTableView = ({ unsortedSearchResults }) => {
  const { language } = useStore()

  const t = translate(language)

  const headers = [
    t('department_course_code'),
    t('department_course_name'),
    t('department_course_credits'),
    t('department_course_educational_level'),
    t('department_period_abbr'),
  ]
  const { searchHits } = unsortedSearchResults
  const flattCoursesArr = searchHits.map(({ course, searchHitInterval }) => ({ ...course, ...searchHitInterval }))
  const courses = sortAndParseByCourseCode(flattCoursesArr)
  const hitsNumber = courses.length
  return (
    <Row>
      <Col>
        <Article>
          {language === 'en' ? (
            <p>
              Your search returned <b>{hitsNumber}</b> result(s).
            </p>
          ) : (
            <p>
              Din sökning gav <b>{hitsNumber}</b> resultat.
            </p>
          )}
          <SortableTable headers={headers} data={courses} />
        </Article>
      </Col>
    </Row>
  )
}
export default SearchTableView
