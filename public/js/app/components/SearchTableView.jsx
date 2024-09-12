import React from 'react'

import { Col, Row } from 'reactstrap'
import PropTypes from 'prop-types'

import { Link, SortableTable } from '@kth/kth-reactstrap/dist/components/studinfo'
import { useStore } from '../mobx'

import translate from '../../../../domain/translate'
import i18n from '../../../../i18n'

import { courseLink } from '../util/links'
import { formatShortTerm } from '../../../../domain/term'
import Article from './Article'
import { translateCreditUnitAbbr } from '../util/translateCreditUnitAbbr'

function codeCell(code, startTerm) {
  const { language } = useStore()

  return {
    content: <Link href={courseLink(code, language, { term: startTerm })}>{code}</Link>,
    sortKey: code,
  }
}

function titleCell(code, title, startTerm) {
  const { language } = useStore()
  return {
    content: <Link href={courseLink(code, language, { term: startTerm })}>{title}</Link>,
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

function periodsStr(startPeriod, startTerm, endPeriod, endTerm) {
  const { language } = useStore()
  // P5 VT21
  // P5 spring 21 - P0 autumn 21
  if (!startTerm || !startPeriod.toString()) return ''
  if (!endTerm || !endPeriod.toString()) return `P${startPeriod} ${formatShortTerm(startTerm, language)}`
  if (startPeriod === endPeriod && startTerm === endTerm)
    return `P${startPeriod} ${formatShortTerm(startTerm, language)}`
  return `P${startPeriod} ${formatShortTerm(startTerm, language)} - P${endPeriod} ${formatShortTerm(endTerm, language)}`
}

function sortAndParseByCourseCode(courses, languageIndex, language, sliceUntilNum) {
  const { bigSearch } = i18n.messages[languageIndex]
  courses.sort(compareCoursesBy('courseCode'))
  const parsedCourses = courses.map(
    ({
      courseCode: code,
      title,
      credits,
      creditUnitAbbr,
      educationalLevel: level,
      startPeriod,
      startTerm,
      endPeriod,
      endTerm,
    }) =>
      [
        codeCell(code, startTerm),
        titleCell(code, title, startTerm),
        `${credits} ${translateCreditUnitAbbr(language, creditUnitAbbr)}`,
        bigSearch[level] || '',
        periodsStr(startPeriod, startTerm, endPeriod, endTerm) || '',
      ].slice(0, sliceUntilNum)
  )
  return parsedCourses
}

const SearchTableView = ({ unsortedSearchResults }) => {
  const { searchHits } = unsortedSearchResults

  if (!searchHits) return null

  const { language, languageIndex } = useStore()

  const t = translate(language)

  let hasSearchHitInterval = false

  const flatCoursesArr = searchHits.map(({ course, searchHitInterval }) => {
    if (searchHitInterval) hasSearchHitInterval = true
    return {
      ...course,
      ...searchHitInterval,
    }
  })

  const sliceUntilNum = hasSearchHitInterval ? 5 : 4
  const headers = [
    t('course_code'),
    t('course_name'),
    t('course_scope'),
    t('course_educational_level'),
    t('department_period_abbr'),
  ].slice(0, sliceUntilNum)

  const courses = sortAndParseByCourseCode(flatCoursesArr, languageIndex, language, sliceUntilNum)

  const hitsNumber = courses.length
  return (
    <Row>
      <Col>
        <Article>
          {language === 'en' ? (
            <p data-testid="number-of-results">
              {'Your search returned '}
              <b>{hitsNumber}</b>
              {' result(s).'}
            </p>
          ) : (
            <p data-testid="number-of-results">
              {`Din sökning gav `}
              <b>{hitsNumber}</b>
              {' resultat.'}
            </p>
          )}
          <SortableTable headers={headers} data={courses} includeNumeric />
        </Article>
      </Col>
    </Row>
  )
}

export const searchHitsPropsShape = {
  searchHits: PropTypes.arrayOf(
    PropTypes.shape({
      course: PropTypes.shape({
        courseCode: PropTypes.string,
        creditUnitAbbr: PropTypes.string,
        credits: PropTypes.number,
        educationalLevel: PropTypes.string,
        title: PropTypes.string,
      }).isRequired,
      searchHitInterval: PropTypes.shape({
        endPeriod: PropTypes.number,
        endTerm: PropTypes.string,
        startPeriod: PropTypes.number,
        startTerm: PropTypes.string,
      }),
    })
  ),
}
SearchTableView.propTypes = {
  unsortedSearchResults: PropTypes.shape(searchHitsPropsShape),
}

SearchTableView.defaultProps = {
  unsortedSearchResults: {},
}
export default SearchTableView
