import React from 'react'

import { observer } from 'mobx-react'
import { useStore } from '../mobx'

import i18n from '../../../../i18n'

import { SearchInputField, SearchResultDisplay } from '../components/index'
import { Collapse } from '@kth/kth-kip-style-react-components'
import { Col, Row } from 'reactstrap'

const Start = () => {
  const { message, language: lang } = useStore()

  let helptexts = [
    'koppspublic_search_help_1',
    'koppspublic_search_help_2',
    'koppspublic_search_help_3',
    'koppspublic_search_help_4',
    'koppspublic_search_help_5',
    'koppspublic_search_help_7',
    'koppspublic_search_help_8',
    'koppspublic_search_help_9',
  ].map(s => i18n.message(s, lang))

  return (
    <main id="mainContent">
      <Row>
        <Col>
          <h1>Sök kurs</h1>
          <p>{i18n.message('koppspublic_search_introduction', lang)}</p>
          <Collapse isOpen={true} color="blue" buttonText={i18n.message('koppspublic_search_help_h', lang)}>
            <ul>
              {helptexts.map((value, index) => {
                return <li>{value}</li>
              })}
            </ul>
          </Collapse>

          <SearchInputField caption={"Sök"}></SearchInputField>

          <SearchResultDisplay></SearchResultDisplay>
        </Col>
      </Row>
    </main>
  )
}

export default observer(Start)
