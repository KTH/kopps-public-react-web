import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'reactstrap'
import { PageHeading, Heading, LinkList, Link } from '@kth/kth-reactstrap/dist/components/studinfo'
import { CollapseDetails } from '@kth/kth-reactstrap/dist/components/utbildningsinfo'

import Lead from '../components/Lead'
import Article from '../components/Article'
import FooterContent from '../components/FooterContent'

import { useStore } from '../mobx'
import translate from '../../../../domain/translate'
import { departmentLink } from '../util/links'

import { localeCompareDepartments } from '../../../../domain/departments'

function DepartmentsLinkList({ departments }) {
  const { language } = useStore()
  departments.sort(localeCompareDepartments(language))
  return (
    <LinkList>
      {departments.map(department => (
        <Link key={department.name} href={departmentLink(department.code, language)}>
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
          <DepartmentsLinkList departments={school.departments} />
        </Fragment>
      ))}
    </>
  )
}

function DeprecatedSchools() {
  const { language, deprecatedSchoolsWithDepartments } = useStore()
  const t = translate(language)

  return deprecatedSchoolsWithDepartments && deprecatedSchoolsWithDepartments.length ? (
    <>
      <h2>{t('departments_deprecated_schools')}</h2>
      <CollapseDetails title={t('departments_deprecated_schools_collapsible')}>
        {deprecatedSchoolsWithDepartments.map(school => (
          <Fragment key={school.name}>
            <Heading size="h3" text={school.name} />
            <DepartmentsLinkList departments={school.departments} />
          </Fragment>
        ))}
      </CollapseDetails>
    </>
  ) : null
}

function DepartmentsList() {
  const { language } = useStore()
  const t = translate(language)
  return (
    <>
      <Row>
        <Col>
          <PageHeading>{t('courses_by_school')}</PageHeading>
          <Lead text={t('departments_list_lead')} />
        </Col>
      </Row>
      <Row>
        <Col>
          <Article>
            <CurrentSchools />
            <DeprecatedSchools />
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

DepartmentsLinkList.propTypes = {
  departments: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
}

export default DepartmentsList
