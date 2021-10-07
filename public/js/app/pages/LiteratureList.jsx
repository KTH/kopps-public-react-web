/* eslint-disable react/no-danger */
import React, { Fragment } from 'react'
import { Col, Row } from 'reactstrap'
import { Heading, Link, PageHeading } from '@kth/kth-reactstrap/dist/components/studinfo'

import Article from '../components/Article'
import FooterContent from '../components/FooterContent'

import { useStore } from '../mobx'
import { useParams } from 'react-router-dom'

import i18n from '../../../../i18n'
import KoppsData from '../components/KoppsData'

const { formatLongTerm } = require('../../../../domain/term')

function LiteratureList() {
  const { languageIndex, language, schools, literature, selectedSchoolCode, selectedTerm} = useStore()
  console.log(`selectedSchoolCode:${selectedSchoolCode} selectedTerm:${selectedTerm}`)

  const selectedSchool =  schools.find(school => school.code === selectedSchoolCode)

  const { title, heading, subHeading, navHeading, intro, missing } = i18n.messages[languageIndex].literatureList

  // TODO: dont use inline style.
  const LitList =
    () => (<>
      {
        literature.map((lit) => {
          const hasLit = typeof lit.literature === 'string' && lit.literature.trim()
          const hasComment = typeof lit.literatureComment === 'string' && lit.literatureComment.trim()
          let text
          if (hasLit || hasComment) {
            text = <>
              {hasLit &&
               (<div className="literature">
                 <KoppsData html={lit.literature}/>
               </div>)
              }
              {hasComment &&
               (<div className="literatureComment">
                 <KoppsData html={lit.literatureComment}/>
               </div>)
              }
            </>
          } else {
            text = <p>{missing}</p>
          }
          return (
            <div id={`lit_${lit.courseCode}`}>
              <h2 style={{"fontSize": 1.5 + 'rem'}}>{`${lit.courseCode} ${lit.courseName}`}</h2>
              {text}
            </div>)
        })
      }
    </>)

  return (
    <>
      <Row>
        <Col>
          <PageHeading subHeading={subHeading(selectedSchool.name, formatLongTerm(selectedTerm, language))}>{heading}</PageHeading>
        </Col>
      </Row>
      <Row>
        <Col>
          <Article>
            <div className="mb-3"/>
            <p>{intro(selectedSchool.name, formatLongTerm(selectedTerm, language))}</p>
            <LitList />
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

export default LiteratureList
