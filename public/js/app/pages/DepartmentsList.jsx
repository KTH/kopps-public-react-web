import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'reactstrap'
import { PageHeading, Heading, LinkList, Link } from '@kth/kth-reactstrap/dist/components/studinfo'
import { CollapseDetails } from '@kth/kth-reactstrap/dist/components/utbildningsinfo'

import Lead from '../components/Lead'
import Article from '../components/Article'
import FooterContent from '../components/FooterContent'

import { useStore } from '../mobx'
import i18n from '../../../../i18n'
import translate from '../util/translate'
import { departmentLink } from '../util/links'

function localeCompareDepartments(language) {
  return function compareDepartments(a, b) {
    return a.name.localeCompare(b.name, language)
  }
}

function DepartmentsLinkList({ departments }) {
  const { language } = useStore()
  const { browserConfig } = useStore()
  departments.sort(localeCompareDepartments(language))
  return (
    <LinkList>
      {departments.map(department => (
        <Link key={department.name} href={departmentLink(browserConfig.proxyPrefixPath.uri, department.code, language)}>
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
  const t = translate(i18n, language)
  return (
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
  )
}

function DepartmentsList() {
  const { language } = useStore()
  const t = translate(i18n, language)
  return (
    <>
      <Row>
        <Col>
          <PageHeading>{t('departments_list_header')}</PageHeading>
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
