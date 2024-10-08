import React, { Fragment } from 'react'
import { Col, Row } from 'reactstrap'
import { Link, PageHeading, SortableTable } from '@kth/kth-reactstrap/dist/components/studinfo'

import Article from '../components/Article'
import FooterContent from '../components/FooterContent'

import { useStore } from '../mobx'
import translate from '../../../../domain/translate'
import { courseLink } from '../util/links'
import { translateCreditUnitAbbr } from '../util/translateCreditUnitAbbr'

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

function sortAndParseCourses(courses, language) {
  courses.sort(compareCoursesBy('code'))
  const parsedCourses = courses.map(({ code, title, credits, creditUnitAbbr, level }) => [
    codeCell(code),
    titleCell(code, title),
    `${credits} ${translateCreditUnitAbbr(language, creditUnitAbbr)}`,
    level,
  ])
  return parsedCourses
}

function DepartmentsList() {
  const { language, departmentName, departmentCourses } = useStore()
  const t = translate(language)

  const headers = [t('course_code'), t('course_name'), t('course_scope'), t('course_educational_level')]
  const courses = sortAndParseCourses(departmentCourses, language)
  return (
    <>
      <Row>
        <Col>
          <PageHeading subHeading={departmentName}>{t('courses')}</PageHeading>
        </Col>
      </Row>
      <Row>
        <Col>
          <Article>
            <SortableTable headers={headers} data={courses} includeNumeric />
          </Article>
        </Col>
      </Row>
      <Row>
        <Col>
          <FooterContent />
        </Col>
      </Row>
    </>
  )
}

export default DepartmentsList
