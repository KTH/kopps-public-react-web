function getHTMLHead(title, footerContentLeft, footerContentRight) {
  return `<html>
  <head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta http-equiv='X-UA-Compatible' content='IE=Edge'/>
  <meta name="viewport" content="width=device-width,initial-scale=1.0,shrink-to-fit=no,user-scalable=yes">
  <title>${title}</title>
    
<link rel="shortcut icon" href="https://www.kth.se/student/kurser/img/kth-style/icons/favicon.ico">
<link type="text/css" href="koppspublic.css" rel="stylesheet" />
<link type="text/css" href="koppspublic-pdf.css" rel="stylesheet" />
<link rel="stylesheet" type="text/css" href="https://www.kth.se/social/static/css/personal_menu.38703eb3cd14.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.2.1/dist/css/bootstrap.min.css" integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS" crossorigin="anonymous">

<script src="https://www.kth.se/student/kurser/static/kth-style/js/klaro-no-css.js?v=2.0.0-NOT%20SET%20BY%20JENKINS"></script>
<script src="https://www.kth.se/student/kurser/static/vendor.js?v=2.0.0-NOT%20SET%20BY%20JENKINS"></script>
<script src="https://www.kth.se/student/kurser/static/browserConfig?v=2.0.0-NOT%20SET%20BY%20JENKINS"></script>
<script src="https://www.kth.se/student/kurser/static/kth-style/js/menus.js?v=2.0.0-NOT%20SET%20BY%20JENKINS"></script>
<script src="https://www.kth.se/student/kurser/static/kth-style/js/backtotop.js?v=2.0.0-NOT%20SET%20BY%20JENKINS"></script>
<style type="text/css">
@page {
  @bottom-left {
      content: "${footerContentLeft}";
      font-family: Open Sans, Arial, Helvetica Neue, helvetica, sans-serif;
      font-size: 12pt;
      line-height: 1.4;
      vertical-align: top;
      padding-top: 6pt;
      padding-bottom: 18pt;
      border-top: 2px solid #555555;
  }
  @bottom-right {
      content: "${footerContentRight};
      font-family: Open Sans, Arial, Helvetica Neue, helvetica, sans-serif;
      font-size: 12pt;
      line-height: 1.4;
      vertical-align: top;
      padding-top: 6pt;
      padding-bottom: 18pt;
      white-space: nowrap;
      border-top: 2px solid #555555;
  }
  size: landscape; 
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
.sidebar {
background-color: #f6f6f6;
padding: 20px;
margin-bottom: 15px;
}
.sidebar p {
font-family: 'Open Sans', Arial, 'Helvetica Neue', helvetica, sans-serif;
font-size: 1rem;
}
.sidebar :last-child {
margin-bottom: 0;
}
.sidebar-heading {
font-size: 1.25rem;
margin-bottom: 1rem;
}
.utbildningsplan.paragraphs > :first-child {
margin-top: 0;
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
                           <figure class="block figure defaultTheme mainLogo">
                               <img id="logo" class="kth_logo" src="images/kth_logo_593.jpg" alt="KTH:s logotyp" height="100" width="100">
                           </figure>
                       </header>
                       <br/>
                       <br/>
                       <br/>
                           <article id="mainContent" role="main" class="article standard" lang="${language}">
                               <header role="presentation" id="articleHeader">
                                   <h1 id="page-heading"
                                       aria-labelledby="page-heading page-sub-heading">${pageHeading}</h1>
                                       <a href="${pageSubHeadingLink}">${pageSubHeading}</a>
                                       <br/>
                                       <br/>
                                       <h1>${programmeName + ' ' + credits + ' ' + creditsText}</h1>
                                       </header>
                                       <br/>
                                       <h2>${programmeNameInOtherLanguage}</h2>
                                       <br/>
                                       <span style="font-style: italic">${semesterDescription}</span>
                                       <br/>
                                       <br/>
                                       ${
                                         language === 'en'
                                           ? `
                                       <span>${swedish_translation_text}</span> <br/><br/><br/>`
                                           : '<br/>'
                                       }
                                       ${body}
                    </article>
        </body>
    </html>`
}

export function getAppendixHTML(title, footerContentLeft, footerContentRight, language, body) {
  return `<!DOCTYPE html>
    ${getHTMLHead(title, footerContentLeft, footerContentRight)}
        <body>
            <div class=content" id="page">
                       <header>
                           <figure class="block figure defaultTheme mainLogo">
                               <img id="logo" class="kth_logo" src="images/kth_logo_593.jpg" alt="KTH:s logotyp" height="70" width="70">
                           </figure>
                       </header>
                       <br/>
                       <br/>
                       <br/>
                           <article id="mainContent" role="main" class="article standard" lang="${language}">
                                       ${body}
                    </article>
        </body>
    </html>`
}
