import React, { useState } from 'react'

import { observer } from 'mobx-react'
import { useStore } from '../mobx'

import i18n from '../../../../i18n'

function SearchInputField({ caption = 'N/A' }) {
  const { language: lang, koppsCourseSearch } = useStore()

  const [buttonClicked, setButtonClicked] = useState(false)

  return (
    <>
      <button type="button" onClick={() => koppsCourseSearch('Algebra')}>
        {/* TODO: handle  koppsCourseSearch('sf') when too much search-error-overflow*/}
        {caption}
      </button>
      {buttonClicked ? <p>{i18n.message('template_button_works', lang)}</p> : null}
    </>
  )
}

//const SyllabusTable = ({ translation, courseCode, language, syllabusPeriods = {} }) => {
const SyllabusTable = () => {
  const { language: translation } = useStore()
  const startDates = Object.keys(syllabusPeriods) || []
  startDates.sort().reverse()
  return (
    <>
      <h2>{translation.label_syllabuses}</h2>
      {startDates.length ? (
        <table className="table archive-table">
          <thead>
            <tr>
              <th scope="col">{translation.label_semesters}</th>
              <th scope="col" className="course-syllabus-header">
                {translation.label_syllabus}
              </th>
            </tr>
          </thead>
          <tbody>
            {startDates.map(startDate => {
              const { endDate: ed } = syllabusPeriods[startDate]
              const endDate = ed.toString()
              return row(translation, courseCode, language, startDate, endDate)
            })}
          </tbody>
        </table>
      ) : (
        <p className="inline-information">{translation.no_syllabuses}</p>
      )}
    </>
  )
}

export default observer(SearchInputField)
