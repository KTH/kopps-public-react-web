/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Alert } from '@kth/kth-reactstrap/dist/components/studinfo'
import ElementWrapperForPDF from '../components/ElementWrapperForPDF'
import { programLinkYear1 } from '../util/links'
import { replacePathNameWithHref, getCurrentHost } from '../util/stringUtil'
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
  const [showError, setShowError] = useState(false)
  const [showLoader, setShowLoader] = useState(true)
  const [error, setError] = useState('')
  const [helpText, setHelpText] = useState('')
  const [errorHeader, setErrorHeader] = useState('')

  function detectMobOrTablet() {
    const toMatch = [/Android/i, /webOS/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i]
    return toMatch.some(toMatchItem => navigator.userAgent.match(toMatchItem))
  }

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
      educationalLevel,
      creditUnitAbbr,
    } = applicationStore
    const t = translate(language)
    // get bottom left from translation and put program name and batch and term
    const bottomRightText = t('page_footer_pdf')
    // get header title
    const headerTitle = t('program_syllabus')
    // get program text for link
    const subHeaderText = t('program_syllabus_link_text')
    // get subheading link
    const subHeadingLink = getCurrentHost(thisHostBaseUrl, false) + programLinkYear1(programmeCode, term, language)
    // get bottom right from translations and add appendix1 or appendix2 accordingly
    const appendix1 = t('appendix1')
    const appendix2 = t('appendix2')
    // translation text in english only if current language is in English
    const swedishTranslationText = t('swedish_translation_text')
    const semesterTranslatedObject = t('semester')
    const semester = _isSpringTerm(term) ? semesterTranslatedObject[1] : semesterTranslatedObject[2]
    // get credits translations
    const creditsText = educationalLevel === 'BASIC' ? t('credits') : creditUnitAbbr
    // get years from term
    const year = term.toString().charAt(term.toString().length - 3) + term.toString().charAt(term.toString().length - 2)
    // get program description
    const semesterDescription = t('program_syllabus_semester_description')(
      language === 'en' ? semester.toLowerCase() : semester.toUpperCase(),
      year
    )
    // get bottom left text
    const semesterText = language === 'sv' ? semester.toUpperCase() + year : semester.toLowerCase() + ' ' + year
    const bottomLeftText = t('programme_syllabus_for')(programmeCode, semesterText)
    // get appendix translations
    const appendix1PageHeadingText = t('programme_appendix1')
    const appendix2PageHeadingText = t('programme_appendix2')
    // get html for objective, implementation, Eligibilty, Implementation and extent
    const completeHTMLForPdfObjExtElgbImlpContainer = getCompleteHTMLForPDFForObjImpElibExtent(
      headerTitle,
      subHeaderText,
      subHeadingLink,
      programmeName,
      programmeNameInOtherLanguage,
      credits,
      creditsText,
      semesterDescription,
      swedishTranslationText,
      pdfObjExtElgbImlpContainer.innerHTML.replaceAll(
        language === 'en' ? '?l=en?l=en' : '?l=sv?l=sv',
        language === 'en' ? '?l=en' : '?l=sv'
      ),
      programmeCode + '-' + term + '.pdf | KTH',
      bottomLeftText,
      bottomRightText,
      language
    )
    // get html for Appendix 1
    const completeHTMLForPdfAppendix1Container = getAppendixHTML(
      programmeCode + '-' + term + '.pdf | KTH',
      appendix1PageHeadingText,
      programmeName,
      programmeCode,
      bottomLeftText,
      appendix1 + ' , ' + bottomRightText,
      language,
      pdfAppendix1Container.innerHTML.replaceAll(
        language === 'en' ? '?l=en?l=en' : '?l=sv?l=sv',
        language === 'en' ? '?l=en' : '?l=sv'
      ),
      'appendix1'
    )
    // get html for Appendix 2
    const completeHTMLForPdfAppendix2Container = getAppendixHTML(
      programmeCode + '-' + term + '.pdf | KTH',
      appendix2PageHeadingText,
      programmeName,
      programmeCode,
      bottomLeftText,
      appendix2 + ' , ' + bottomRightText,
      language,
      pdfAppendix2Container.innerHTML.replaceAll(
        language === 'en' ? '?l=en?l=en' : '?l=sv?l=sv',
        language === 'en' ? '?l=en' : '?l=sv'
      ),
      'appendix2'
    )

    const pdfResponse = generateProgramSyllabus(getCurrentHost(thisHostBaseUrl), {
      pages: [
        completeHTMLForPdfObjExtElgbImlpContainer,
        completeHTMLForPdfAppendix1Container,
        completeHTMLForPdfAppendix2Container,
      ],
      baseUrl: getCurrentHost(thisHostBaseUrl),
      course: programmeCode + '-' + term + '.pdf',
    })
    pdfResponse.then(
      pdfData => {
        const fileName = programmeCode + '-' + term
        const pdfContent = new File([pdfData], fileName + '.pdf', { type: 'application/pdf' })
        const fileURL = URL.createObjectURL(pdfContent)
        if (detectMobOrTablet()) {
          window.open(fileURL)
        } else {
          const xhr = new XMLHttpRequest()
          xhr.responseType = 'blob'
          xhr.onload = () => {
            const recoveredBlob = xhr.response
            const reader = new FileReader()
            reader.onload = () => {
              const blobAsDataUrl = reader.result
              const title = fileName + '.pdf | KTH'
              const embed = `<iframe src=${blobAsDataUrl} type="application/pdf" style="position:absolute; left: 0; top: 0;" width="100%" height="100%" title="${title}"></iframe>`
              document.write(embed)
              document.title = title
            }
            reader.readAsDataURL(recoveredBlob)
          }
          xhr.open('GET', fileURL)
          xhr.send()
        }
        setShowLoader(false)
      },
      () => {
        setShowError(true)
        setShowLoader(false)
        setErrorHeader(t('pdf_error').heading)
        setError(t('pdf_error').error)
        setHelpText(t('pdf_error').help)
      }
    )
  }, [])
  return (
    <>
      {showError && (
        <Alert type="danger">
          <h5>{errorHeader}</h5>
          <p>{error}</p>
          <p>
            {helpText}
            <a href="mailto:it-support@kth.se">it-support@kth.se</a>
          </p>
        </Alert>
      )}
      {showLoader && (
        <div role="status" className="spinner-border">
          <span className="sr-only">laddar...</span>
        </div>
      )}
      <div className="display-none">
        <div id="pdfObjExtElgbImlpContainer">
          <ElementWrapperForPDF
            component={ObjectivesForExport}
            applicationStore={applicationStore}
          ></ElementWrapperForPDF>
          <div className="page-break-inside">
            <ElementWrapperForPDF
              component={ExtentContentForPDF}
              applicationStore={applicationStore}
            ></ElementWrapperForPDF>
          </div>
          <div className="eligibilty-container">
            <ElementWrapperForPDF
              component={EligilbiltyContentForPDF}
              applicationStore={applicationStore}
            ></ElementWrapperForPDF>
          </div>
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
