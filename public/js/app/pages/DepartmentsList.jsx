import React, { Fragment } from 'react'
import { Col, Row } from 'reactstrap'
import { PageHeading, Heading, LinkList, Link } from '@kth/kth-reactstrap/dist/components/studinfo'
import { CollapseDetails } from '@kth/kth-reactstrap/dist/components/utbildningsinfo'

import Lead from '../components/Lead'
import Article from '../components/Article'
import Footer from '../components/Footer'
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
          <Footer>
            <FooterContent />
          </Footer>
        </Col>
      </Row>
    </>
  )
}

export default DepartmentsList
