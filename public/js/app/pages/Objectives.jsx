/* eslint-disable react/no-danger */
import React, { Fragment } from 'react'
import { Col, Row } from 'reactstrap'
import { Heading, PageHeading } from '@kth/kth-reactstrap/dist/components/studinfo'

import { useStore } from '../mobx'

import translate from '../../../../domain/translate'
import { formatLongTerm } from '../../../../domain/term'
import { formatISODate } from '../../../../domain/date'

import Article from '../components/Article'
import FooterContent from '../components/FooterContent'
import KoppsData from '../components/KoppsData'
import Sidebar from '../components/Sidebar'

function ObjectivesDates() {
  const { language, studyProgramme } = useStore()
  const t = translate(language)
  const { approvedAt, changedAt } = studyProgramme
  return (
    <p>
      {`${t('programme_objectives_changed')}: ${formatISODate(changedAt, language)}`}
      <br />
      {`${t('programme_objectives_approved')}: ${formatISODate(approvedAt, language)}`}
      <br />
    </p>
  )
}

function ProgrammeObjectives() {
  const { studyProgramme } = useStore()
  const { programmeObjectives } = studyProgramme
  return <KoppsData html={programmeObjectives} />
}

function KnowledgeObjectives() {
  const { language, studyProgramme } = useStore()
  const t = translate(language)
  const { knowledgeObjectives } = studyProgramme
  return (
    <>
      <Heading size="h2" text={t('programme_objectives_knowledge_and_understanding')} />
      <KoppsData html={knowledgeObjectives} />
    </>
  )
}

function SkillsObjectives() {
  const { language, studyProgramme } = useStore()
  const t = translate(language)
  const { skillsObjectives } = studyProgramme
  return (
    <>
      <Heading size="h2" text={t('programme_objectives_skills_and_abilities')} />
      <KoppsData html={skillsObjectives} />
    </>
  )
}

function AbilityObjectives() {
  const { language, studyProgramme } = useStore()
  const t = translate(language)
  const { abilityObjectives } = studyProgramme
  return (
    <>
      <Heading size="h2" text={t('programme_objectives_ability_to_judgements')} />
      <KoppsData html={abilityObjectives} />
    </>
  )
}

function ArticleContent() {
  return (
    <Article>
      <ObjectivesDates />
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
