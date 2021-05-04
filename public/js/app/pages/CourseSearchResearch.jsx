import React, { useEffect, useState } from 'react'
import { observer } from 'mobx-react'
import { Col, Row } from 'reactstrap'
import { CollapseDetails } from '@kth/kth-kip-style-react-components'
import { useStore } from '../mobx'
import i18n from '../../../../i18n'
import { PageHeading, Heading } from '@kth/kth-reactstrap/dist/components/studinfo'
import Lead from '../components/Lead'
import { SearchInputField, SearchResultDisplay } from '../components/index'

const CourseSearchResearch = props => {
  const { language: lang, textPattern: initialPattern } = useStore()
  const [pattern, setPattern] = useState(initialPattern)
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

  // useEffect(() => {
  //   const { history } = props
  //   console.log('history', history)
  //   // if (history) {
  //   //   history.push({
  //   //     search: '',
  //   //   })
  //   // }
  // }, [pattern])

  function handleSubmit(pattern) {
    //Todo: mimic as in old kopps-public after submit changes url
    setPattern(pattern)
  }

  return (
    <main id="mainContent">
      <Row>
        <Col>
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
        </Col>
      </Row>
      <Row>
        <Col>
          <SearchInputField caption="Sök" pattern={pattern} onSubmit={handleSubmit} />
        </Col>
      </Row>
      <Row>
        <Col>
          <a href="/student/kurser/sokkurs">
            På sidan Sök kurs kan du med hjälp av sökkriterier söka bland KTHs samtliga kurser inklusive forskarkurser.
          </a>
        </Col>
      </Row>
      <Row>
        <Col>
          <SearchResultDisplay searchParameters={{ pattern, eduLevels: ['3'] }} />
        </Col>
      </Row>
    </main>
  )
}

export default observer(CourseSearchResearch)
