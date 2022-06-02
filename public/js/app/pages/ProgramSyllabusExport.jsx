/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'

import PropTypes from 'prop-types'
import { saveAs } from 'file-saver'
import ElementWrapperForPDF from '../components/ElementWrapperForPDF'
import { programLinkYear1, replacePathNameWithHref } from '../util/links'
import translate from '../../../../domain/translate'
import generateProgramSyllabus from '../util/pdfApi'
import { getCompleteHTMLForPDFForObjImpElibExtent, getAppendixHTML } from '../config/pdfHtml/pdfHtmlForExport'
import { _isSpringTerm } from '../../../../domain/term'
import { ObjectivesForExport } from './Objectives'
import { ExtentContentForPDF } from './Extent'
import { EligilbiltyContentForPDF } from './Eligibility'
import { ImplementationContentForPDF } from './Implementation'
import { Appendix1PDFExport } from './Appendix1'
import { Appendix2PDFExport } from './Appendix2'

// eslint-disable-next-line react/prop-types
function ProgramSyllabusExport({ applicationStore }) {
  useEffect(() => {
    const pdfObjExtElgbImlpContainer = document.getElementById('pdfObjExtElgbImlpContainer')
    const pdfAppendix1Container = document.getElementById('pdfAppendix1Container')
    const pdfAppendix2Container = document.getElementById('pdfAppendix2Container')
    replacePathNameWithHref(pdfObjExtElgbImlpContainer)
    replacePathNameWithHref(pdfAppendix1Container)
    replacePathNameWithHref(pdfAppendix2Container)
    const {
      language,
      programmeCode,
      programmeName,
      programmeNameInOtherLanguage,
      credits,
      term,
      thisHostBaseUrl,
      pdfFunctionURL,
    } = applicationStore
    const t = translate(language)
    // get bottom left from translation and put program name and batch and term
    const bottomRightText = t('page_footer_pdf')
    // get header title
    const headerTitle = t('program_syllabus')
    // get program text for link
    const subHeaderText = t('program_syllabus_link_text')
    // get subheading link
    const subHeadingLink = thisHostBaseUrl + programLinkYear1(programmeCode, term, language)
    // get bottom right from translations and add appendix1 or appendix2 accordingly
    const appendix1 = t('appendix1')
    const appendix2 = t('appendix2')
    // get bottom left text
    const bottomLeftText = t('programme_syllabus_for')(programmeCode, term)
    const swedishTranslationText = t('swedish_translation_text')
    const semesterTranslatedObject = t('semester')
    const semester = _isSpringTerm(term) ? semesterTranslatedObject[1] : semesterTranslatedObject[2]
    const creditsText = t('course_credits')
    const semesterDescription = t('program_syllabus_semester_description')(
      semester.toLowerCase(),
      term.toString().charAt(term.toString().length - 3) + term.toString().charAt(term.toString().length - 2)
    )
    const completeHTMLForPdfObjExtElgbImlpContainer = getCompleteHTMLForPDFForObjImpElibExtent(
      headerTitle,
      subHeaderText,
      subHeadingLink,
      programmeName,
      programmeNameInOtherLanguage,
      credits,
      creditsText.toLowerCase(),
      semesterDescription,
      swedishTranslationText,
      pdfObjExtElgbImlpContainer.innerHTML,
      programmeCode + '-' + term,
      bottomLeftText,
      bottomRightText,
      language
    )

    const completeHTMLForPdfAppendix1Container = getAppendixHTML(
      programmeCode + '-' + term,
      bottomLeftText,
      appendix1 + ' , ' + bottomRightText,
      language,
      pdfAppendix1Container.innerHTML
    )

    const completeHTMLForPdfAppendix2Container = getAppendixHTML(
      programmeCode + '-' + term,
      bottomLeftText,
      appendix2 + ' , ' + bottomRightText,
      language,
      pdfAppendix2Container.innerHTML
    )
    const pdfResponse = generateProgramSyllabus(
      pdfFunctionURL,
      [
        completeHTMLForPdfObjExtElgbImlpContainer,
        completeHTMLForPdfAppendix1Container,
        completeHTMLForPdfAppendix2Container,
      ],
      programmeCode,
      term,
      thisHostBaseUrl
    )
    pdfResponse.then(pdfData => {
      saveAs(new Blob([pdfData], { type: 'application/pdf' }), programmeCode + '-' + term + '.pdf')
    })
  }, [])
  return (
    <>
      <div className="display-none">
        <div id="pdfObjExtElgbImlpContainer">
          <ElementWrapperForPDF
            component={ObjectivesForExport}
            applicationStore={applicationStore}
          ></ElementWrapperForPDF>
          <ElementWrapperForPDF
            component={ExtentContentForPDF}
            applicationStore={applicationStore}
          ></ElementWrapperForPDF>
          <ElementWrapperForPDF
            component={EligilbiltyContentForPDF}
            applicationStore={applicationStore}
          ></ElementWrapperForPDF>
          <ElementWrapperForPDF
            component={ImplementationContentForPDF}
            applicationStore={applicationStore}
          ></ElementWrapperForPDF>
        </div>
        <div id="pdfAppendix1Container">
          <ElementWrapperForPDF component={Appendix1PDFExport} applicationStore={applicationStore} />
        </div>
        <div id="pdfAppendix2Container">
          <ElementWrapperForPDF component={Appendix2PDFExport} applicationStore={applicationStore} />
        </div>
      </div>
    </>
  )
}

ProgramSyllabusExport.prototypes = {
  applicationStore: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
}

export default ProgramSyllabusExport
