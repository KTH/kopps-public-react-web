import React, { useState } from 'react'
import { formatLongTerm } from '../../../../domain/term'
import { useStore } from '../mobx'

import translate from '../../../../domain/translate'
import ProgramSyllabusExport from '../pages/ProgramSyllabusExport'

function Sidebar() {
  const applicationStore = useStore()
  const { language, programmeCode, term } = applicationStore
  const t = translate(language)
  const [renderPDFContent, setRenderPDFContent] = useState(false)

  return (
    <div id="sidebarContainer">
      <aside id="pdfSidebar" className="sidebar" aria-labelledby="pdf-sidebar-heading">
        <h2 id="pdf-sidebar-heading" className="sidebar-heading mb-2 mt-0">
          {t('programme_plan_pdf_header')}
        </h2>
        <p>{t('programme_plan_pdf_text')}</p>
        <button onClick={() => setRenderPDFContent(true)} onBlur={() => setRenderPDFContent(false)} className="link">
          {t('programme_plan_pdf')(programmeCode, formatLongTerm(term, language))}
        </button>
        {renderPDFContent && <ProgramSyllabusExport applicationStore={applicationStore} />}
      </aside>
    </div>
  )
}
export default Sidebar
