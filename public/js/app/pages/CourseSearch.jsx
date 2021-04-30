import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { Col, Row } from 'reactstrap'
import { CollapseDetails } from '@kth/kth-kip-style-react-components'
import { useStore } from '../mobx'
import i18n from '../../../../i18n'
import { PageHeading, Heading } from '@kth/kth-reactstrap/dist/components/studinfo'
import Lead from '../components/Lead'
import { SearchInputField, SearchResultDisplay } from '../components/index'

const Start = () => {
  const { language: lang } = useStore()
  const [pattern, setPattern] = useState('')
  const helptexts = [
    'koppspublic_search_help_1',
    'koppspublic_search_help_2',
    'koppspublic_search_help_3',
    'koppspublic_search_help_4',
    'koppspublic_search_help_5',
    'koppspublic_search_help_7',
    'koppspublic_search_help_8',
    'koppspublic_search_help_9',
  ].map(s => i18n.message(s, lang))

  function handleSubmit(pattern) {
    // todo: useContext instead of props drilling
    // or useStore for reloadiing page with urls props
    setPattern(pattern)
  }

  return (
    <main id="mainContent">
      <Row>
        <Col>
          {/* <h1>Sök kurs</h1> */}
          <PageHeading>Sök forskarkurs</PageHeading>
          <Lead text="Här kan du söka bland KTHs forskarutbildningskurser." />
          {/* <p>{i18n.message('koppspublic_search_introduction', lang)}</p> */}
          <CollapseDetails color="white" title={i18n.message('koppspublic_search_help_h', lang)}>
            <ul>
              {helptexts.map(value => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </CollapseDetails>

          <SearchInputField caption="Sök" pattern={pattern} onSubmit={handleSubmit} />
          {/* research only link */}
          <a href="/student/kurser/sokkurs">
            På sidan Sök kurs kan du med hjälp av sökkriterier söka bland KTHs samtliga kurser inklusive forskarkurser.
          </a>

          <SearchResultDisplay pattern={pattern} />
        </Col>
      </Row>
    </main>
  )
}

export default observer(Start)
