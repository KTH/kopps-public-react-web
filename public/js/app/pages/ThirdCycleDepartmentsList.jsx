import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { Col, Row } from 'reactstrap'
import { PageHeading, Heading, LinkList, Link, Text } from '@kth/kth-reactstrap/dist/components/studinfo'
import { CollapseDetails } from '@kth/kth-reactstrap/dist/components/utbildningsinfo'

import Article from '../components/Article'
import FooterContent from '../components/FooterContent'

import { useStore } from '../mobx'
import translate from '../../../../domain/translate'
import { localeCompareDepartments } from '../../../../domain/departments'
import { replaceSiteLinkForThirdCyclePages, thirdCycleDepartmentLink } from '../util/links'

function DepartmentsLinkListResearch({ departments }) {
  const { language } = useStore()
  departments.sort(localeCompareDepartments(language))
  return (
    <LinkList>
      {departments.map(department => (
        <Link key={department.name} href={thirdCycleDepartmentLink(department.code, language)}>
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

function DeprecatedSchools() {
  const { language, deprecatedSchoolsWithDepartments } = useStore()
  const t = translate(language)
  return (
    <>
      <h2>{t('departments_deprecated_schools')}</h2>
      <CollapseDetails title={t('departments_deprecated_schools_collapsible')}>
        {deprecatedSchoolsWithDepartments.map(school => (
          <Fragment key={school.name}>
            <Heading size="h3" text={school.name} />
            <DepartmentsLinkListResearch departments={school.departments} />
          </Fragment>
        ))}
      </CollapseDetails>
    </>
  )
}

function ThirdCycleDepartmentsList() {
  const { language } = useStore()
  const t = translate(language)
  const pageName = t('third_cycle_courses_by_school')
  const pageDescription = t('third_cycle_courses_by_school_description')

  React.useEffect(() => {
    let isMounted = true
    if (isMounted) replaceSiteLinkForThirdCyclePages(pageName, language)
    return () => (isMounted = false)
  })

  return (
    <>
      <Row>
        <Col>
          <PageHeading>{pageName}</PageHeading>
        </Col>
      </Row>
      <Row>
        <Col>
          <p>{pageDescription}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          <Article classNames={['paragraphs']}>
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

DepartmentsLinkListResearch.propTypes = {
  departments: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      code: PropTypes.string.isRequired,
    }).isRequired
  ).isRequired,
}

export default ThirdCycleDepartmentsList
