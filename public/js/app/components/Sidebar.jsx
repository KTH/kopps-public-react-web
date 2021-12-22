import React from 'react'
import { Link } from '@kth/kth-reactstrap/dist/components/studinfo'
import { programSyllabusLink } from '../util/links'
import { formatLongTerm } from '../../../../domain/term'
import { useStore } from '../mobx'

import translate from '../../../../domain/translate'

function Sidebar() {
  const { language, programmeCode, term } = useStore()
  const t = translate(language)
  const syllabusLink = programSyllabusLink(programmeCode, term, language)

  return (
    <div id="sidebarContainer">
      <aside id="pdfSidebar" className="sidebar" aria-labelledby="pdf-sidebar-heading">
        <h2 id="pdf-sidebar-heading" className="sidebar-heading mb-2 mt-0">
          {t('programme_plan_pdf_header')}
        </h2>
        <p>{t('programme_plan_pdf_text')}</p>
        <Link href={syllabusLink} type="pdf-post-link" target="_blank">
          {t('programme_plan_pdf')(programmeCode, formatLongTerm(term, language))}
        </Link>
      </aside>
    </div>
  )
}
export default Sidebar
