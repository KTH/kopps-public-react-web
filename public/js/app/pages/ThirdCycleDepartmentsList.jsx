import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'reactstrap'
import { PageHeading, Heading, LinkList, Link } from '@kth/kth-reactstrap/dist/components/studinfo'

import Article from '../components/Article'
import FooterContent from '../components/FooterContent'

import { useStore } from '../mobx'
import translate from '../../../../domain/translate'
import { thirdCycleDepartmentLink } from '../util/links'

function localeCompareDepartments(language) {
  return function compareDepartments(a, b) {
    return a.name.localeCompare(b.name, language)
  }
}

function DepartmentsLinkListResearch({ departments }) {
  const { language } = useStore()
  departments.sort(localeCompareDepartments(language))
  return (
    <LinkList>
      {departments.map(department => (
        <Link
          key={department.name}
          href={thirdCycleDepartmentLink(department.code, language)}
        >
          {department.name}
        </Link>
      ))}
    </LinkList>
  )
}

function CurrentSchools() {
  const { currentSchoolsWithDepartments } = useStore()
  return (
    <>
      {currentSchoolsWithDepartments.map(school => (
        <Fragment key={school.name}>
          <Heading size="h2" text={school.name} />
          <DepartmentsLinkListResearch departments={school.departments} />
        </Fragment>
      ))}
    </>
  )
}

function ThirdCycleDepartmentsList() {
  const { language } = useStore()
  const t = translate(language)
  return (
    <>
      <Row>
        <Col>
          <PageHeading>{t('main_menu_third_cycle_departments_list_header')}</PageHeading>
        </Col>
      </Row>
      <Row>
        <Col>
          <Article classNames={['paragraphs']}>
            <CurrentSchools />
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

DepartmentsLinkListResearch.propTypes = {
  departments: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
}

export default ThirdCycleDepartmentsList
