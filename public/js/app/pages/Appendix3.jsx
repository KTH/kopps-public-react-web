import { PageHeading } from '@kth/kth-reactstrap/dist/components/studinfo'
import React from 'react'

import Article from '../components/Article'
import { useStore } from '../mobx'

function Appendix3() {
  const { programmeCode, courseListLadok } = useStore()
  const years = [
    courseListLadok.year1,
    courseListLadok.year2,
    courseListLadok.year3,
    courseListLadok.year4,
    courseListLadok.year5,
  ]

  return (
    <>
      <PageHeading subHeading={programmeCode}>PoC: Kurslista från Ladok</PageHeading>
      <Article>
        <p>{courseListLadok.info}</p>
        {years.map((year, index) => (
          <div key={index}>
            {year && (
              <>
                <h2>Årskurs {index + 1}</h2>
                <div dangerouslySetInnerHTML={{ __html: year }}></div>
              </>
            )}
          </div>
        ))}
      </Article>
    </>
  )
}

export default Appendix3
