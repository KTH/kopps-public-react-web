import React, { Fragment } from 'react'
import { Col, Row } from 'reactstrap'
import { PageHeading } from '@kth/kth-reactstrap/dist/components/studinfo'

import Article from '../components/Article'
import FooterContent from '../components/FooterContent'

import { useStore } from '../mobx'
import i18n from '../../../../i18n'
import translate from '../util/translate'

function DepartmentsList() {
  const { language, departmentName } = useStore()
  const t = translate(i18n, language)
  return (
    <>
      <Row>
        <Col>
          <PageHeading subHeading={departmentName}>{t('koppspublic_courses')}</PageHeading>
        </Col>
      </Row>
      <Row>
        <Col>
          <Article />
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
