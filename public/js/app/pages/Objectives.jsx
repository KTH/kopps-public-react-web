/* eslint-disable react/no-danger */
import React, { Fragment } from 'react'
import { Col, Row } from 'reactstrap'
import { Heading, PageHeading } from '@kth/kth-reactstrap/dist/components/studinfo'

import { useStore } from '../mobx'

import translate from '../../../../domain/translate'
import { formatLongTerm } from '../../../../domain/term'

import Article from '../components/Article'
import FooterContent from '../components/FooterContent'
import LadokData from '../components/LadokData'
import Sidebar from '../components/Sidebar'

function ProgrammeObjectives() {
  const { studyProgramme } = useStore()
  const { utbildningensMal: programmeObjectives } = studyProgramme
  return <LadokData html={programmeObjectives} />
}

function KnowledgeObjectives() {
  const { language, studyProgramme } = useStore()
  const t = translate(language)
  const { kunskapOchForstaelse: knowledgeObjectives } = studyProgramme
  return (
    <>
      <Heading size="h2" text={t('programme_objectives_knowledge_and_understanding')} />
      <LadokData html={knowledgeObjectives} />
    </>
  )
}

function SkillsObjectives() {
  const { language, studyProgramme } = useStore()
  const t = translate(language)
  const { fardigheterOchFormagor: skillsObjectives } = studyProgramme
  return (
    <>
      <Heading size="h2" text={t('programme_objectives_skills_and_abilities')} />
      <LadokData html={skillsObjectives} />
    </>
  )
}

function AbilityObjectives() {
  const { language, studyProgramme } = useStore()
  const t = translate(language)
  const { varderingsformagaOchForhallningssatt: abilityObjectives } = studyProgramme
  return (
    <>
      <Heading size="h2" text={t('programme_objectives_ability_to_judgements')} />
      <LadokData html={abilityObjectives} />
    </>
  )
}

function ArticleContent() {
  return (
    <Article>
      <ProgrammeObjectives />
      <KnowledgeObjectives />
      <SkillsObjectives />
      <AbilityObjectives />
    </Article>
  )
}

export function ObjectivesForExport() {
  const { language } = useStore()
  const t = translate(language)
  const pageHeading = t('programme_objectives')
  return (
    <>
      <Row>
        <Col>
          <PageHeading>{pageHeading}</PageHeading>
        </Col>
      </Row>
      <Row>
        <Col>
          <Article>
            <ProgrammeObjectives />
            <KnowledgeObjectives />
            <SkillsObjectives />
            <AbilityObjectives />
          </Article>
        </Col>
      </Row>
    </>
  )
}

function Objectives() {
  const { language, programmeName, programmeCode, term } = useStore()
  const t = translate(language)
  const pageHeading = t('programme_objectives')
  const subHeading = `${t('programme_admitted_year')} ${formatLongTerm(
    term,
    language
  )}, ${programmeName} (${programmeCode})`

  return (
    <>
      <Row>
        <Col>
          <PageHeading subHeading={subHeading}>{pageHeading}</PageHeading>
        </Col>
      </Row>
      <Row>
        <Col>
          <ArticleContent />
        </Col>
        <Col xs="12" xl="3">
          <Sidebar />
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

export default Objectives
