function getHTMLHead(title, footerContentLeft, footerContentRight) {
  return `<html>
  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta http-equiv='X-UA-Compatible' content='IE=Edge'/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0,shrink-to-fit=no,user-scalable=yes">
  <title>${title}</title>
  <link rel="stylesheet" type="text/css" href="https://www.kth.se/social/static/css/personal_menu.38703eb3cd14.css">
<style type="text/css">
@page {
  @bottom-left {
      content: "${footerContentLeft}";
      font-family: "Helvetica Neue", Helvetica, Arial, Sans-Serif;
      font-size: 12pt;
      line-height: 1.4;
      vertical-align: top;
      padding-top: 6pt;
      padding-bottom: 18pt;
      border-top: 2px solid #555555;
  }
  @bottom-right {
      content: "${footerContentRight};
      font-family: "Helvetica Neue", Helvetica, Arial, Sans-Serif;
      font-size: 12pt;
      line-height: 1.4;
      vertical-align: top;
      padding-top: 6pt;
      padding-bottom: 18pt;
      white-space: nowrap;
      border-top: 2px solid #555555;
  }
}
  .table .active-period {
   background-color: #e6ecf5;
   color: #333333;
   text-align: center;
  }

  .table b.course-comment {
   font-weight: normal;
   font-style: italic;
   display: block;
  }

  .table td.credits {
   white-space: nowrap;
  }

  table, th, td {
    border: 0.5px solid grey;
    border-collapse: collapse;
  }
  
  table {
      width: 100%;
  }

  .appendix-container {
    page-break-inside : avoid;
  }

  .pdfBodyWrapper {
    padding-left: 1.5em;
    padding-right: 1.5em;
  }
  
  h1, h2, h3 {
    font-family: "Helvetica Neue", Helvetica, Arial, Sans-Serif;
    font-weight: 100;
  }

  h4 {
    font-family: "Helvetica Neue", Helvetica, Arial, Sans-Serif;
  }

  .extent-container {
    page-break-inside: avoid;
  }

  .supplementary-container {
    page-break-inside: avoid;
  }

  .elective-container {
    page-break-inside: avoid;
  }

  .eligibilty-container {
    page-break-inside: avoid;
    page-break-after: always;
  }

  .implementation-container {
    page-break-inside: avoid;
  }

  body {
    margin-top: 2em;
  }

</style>
  </head>`
}

export function getCompleteHTMLForPDFForObjImpElibExtent(
  pageHeading,
  pageSubHeading,
  pageSubHeadingLink,
  programmeName,
  programmeNameInOtherLanguage,
  credits,
  creditsText,
  semesterDescription,
  swedish_translation_text,
  body,
  title,
  footerContentLeft,
  footerContentRight,
  language
) {
  return `<!DOCTYPE html>
    ${getHTMLHead(title, footerContentLeft, footerContentRight)}
        <body>
            <div class=content" id="page">
                        <header>
                          <div class="pdfBodyWrapper">
                              <figure>
                                  <img id="logo" class="kth_logo" src="images/kth_logo_593.jpg" alt="KTH:s logotyp" height="100" width="100">
                              </figure>
                          </div>
                         </header>
                       <div class="pdfBodyWrapper">
                           <article id="mainContent" role="main" class="article standard" lang="${language}">
                               <header role="presentation" id="articleHeader">
                                   <h1 id="page-heading"
                                       aria-labelledby="page-heading page-sub-heading" style="font-size : 3em">${pageHeading}</h1>
                                       <p><a href="${pageSubHeadingLink}">${pageSubHeading}</a></p>
                                       <h1 style="font-size : 3em">${
                                         programmeName + ' ' + credits + ' ' + creditsText
                                       }</h1>
                                       <h2 id="page-sub-heading" aria-hidden="true">${programmeNameInOtherLanguage}</h2>
                               </header>
                                       <p><i>${semesterDescription}</i></p>
                                       ${
                                         language === 'en'
                                           ? `
                                       <span>${swedish_translation_text}</span>`
                                           : ''
                                       }
                                       ${body}
                            </article>
                        </div>
             </div>
        </body>
    </html>`
}

export function getAppendixHTML(
  title,
  pageHeading,
  programmeName,
  programmeCode,
  footerContentLeft,
  footerContentRight,
  language,
  body,
  type
) {
  return `<!DOCTYPE html>
    ${getHTMLHead(title, footerContentLeft, footerContentRight)}
        <body>
            <div class=content" id="page">
                      <header>
                        <div class="pdfBodyWrapper">
                            <figure>
                                <img id="logo" class="kth_logo" src="images/kth_logo_593.jpg" alt="KTH:s logotyp" height="100" width="100">
                            </figure>
                        </div>
                      </header>
                       <div class="pdfBodyWrapper">
                           <article id="mainContent" role="main" class="article standard" lang="${language}">
                           <header role="presentation" id="articleHeader">
                                       <h1 id="page-heading"
                                       aria-labelledby="page-heading page-sub-heading" style="font-size : 3em">${pageHeading}</h1>
                                       <h2 id="page-sub-heading" aria-hidden="true" style="font-size : 2em">${programmeName} (${programmeCode})</h2>
                          </header>
                          ${
                            type === 'appendix1'
                              ? `<div class="appendix-container">
                          ${body}
                          </div>`
                              : body
                          }   
                           </article>
                      </div>
              </div>
        </body>
    </html>`
}
