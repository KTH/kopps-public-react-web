/* eslint-disable import/order */

// Now read the server config etc.
const config = require('./configuration').server

/* ***********************
 * ******* LOGGING *******
 * ***********************
 */
const log = require('@kth/log')

const packageFile = require('../package.json')

const logConfiguration = {
  name: packageFile.name,
  app: packageFile.name,
  env: process.env.NODE_ENV,
  level: config.logging.log.level,
  console: config.logging.console,
  stdout: config.logging.stdout,
  src: config.logging.src,
}

log.init(logConfiguration)

const server = require('@kth/server')

require('./api')
const AppRouter = require('kth-node-express-routing').PageRouter
const { getPaths } = require('kth-node-express-routing')
const { cortinaMiddleware } = require('@kth/cortina-block')

const { proxyPrefixPath, redirectProxyPath } = config
const _addDepartmentProxy = (uri = '') => `${proxyPrefixPath.department}${uri}`
const _addProxy = uri => `${proxyPrefixPath.uri}${uri}`
const _addProgramProxy = (uri = '') => `${proxyPrefixPath.programme}${uri}`
const _addProgrammesListProxy = (uri = '') => `${proxyPrefixPath.programmesList}${uri}`

// Expose the server and paths
server.locals.secret = new Map()
module.exports = server
module.exports.getPaths = () => getPaths()

/* **************************
 * ******* TEMPLATING *******
 * **************************
 */
const exphbs = require('express-handlebars')
const path = require('path')

server.set('views', path.join(__dirname, '/views'))
server.set('layouts', path.join(__dirname, '/views/layouts'))
server.set('partials', path.join(__dirname, '/views/partials'))
server.engine(
  'handlebars',
  exphbs.engine({
    defaultLayout: 'publicLayout',
    layoutsDir: server.settings.layouts,
    partialsDir: server.settings.partials,
  })
)
server.set('view engine', 'handlebars')
// Register handlebar helpers
require('./views/helpers')

/* ******************************
 * ******* ACCESS LOGGING *******
 * ******************************
 */
const accessLog = require('kth-node-access-log')

server.use(accessLog(config.logging.accessLog))

/* ****************************
 * ******* STATIC FILES *******
 * ****************************
 */
const browserConfig = require('./configuration').browser
const browserConfigHandler = require('kth-node-configuration').getHandler(browserConfig, getPaths())
const express = require('express')

// Removes the "X-Powered-By: Express header" that shows the underlying Express framework
server.disable('x-powered-by')

// helper
function setCustomCacheControl(res, path2) {
  if (express.static.mime.lookup(path2) === 'text/html') {
    // Custom Cache-Control for HTML files
    res.setHeader('Cache-Control', 'no-cache')
  }
}

// Files/statics routes--
// Map components HTML files as static content, but set custom cache control header, currently no-cache to force If-modified-since/Etag check.

const staticOption = { maxAge: 365 * 24 * 3600 * 1000 } // 365 days in ms is maximum

server.use(
  _addProxy('/static/js/components'),
  express.static('./dist/js/components', { setHeaders: setCustomCacheControl })
)

// Expose browser configurations
server.use(_addProxy('/static/browserConfig'), browserConfigHandler)

// Files/statics routes
server.use(_addProxy('/static/kth-style'), express.static('./node_modules/kth-style/dist', staticOption))
server.use(_addProxy('/assets'), express.static('./node_modules/@kth/style/assets', staticOption))

// Map static content like images, css and js.
server.use(_addProxy('/static'), express.static('./dist', staticOption))

server.use(_addProxy('/static/icon/favicon'), express.static('./public/favicon.ico', staticOption))

// / Return 404 if static file isn't found so we don't go through the rest of the pipeline
server.use(_addProxy('/static'), (req, res, next) => {
  const error = new Error('File not found: ' + req.originalUrl)
  error.status = 404
  next(error)
})

// QUESTION: Should this really be set here?
// http://expressjs.com/en/api.html#app.set
server.set('case sensitive routing', true)

/* *******************************
 * ******* REQUEST PARSING *******
 * *******************************
 */
const bodyParser = require('body-parser')

server.use(bodyParser.json({ limit: '400kb' }))
const cookieParser = require('cookie-parser')

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(cookieParser())

/* ***********************
 * ******* SESSION *******
 * ***********************
 */
const session = require('@kth/session')

const options = config.session
options.sessionOptions.secret = config.sessionSecret
server.use(session(options))

/* ************************
 * ******* LANGUAGE *******
 * ************************
 */
const { languageHandler } = require('@kth/kth-node-web-common/lib/language')

// eslint-disable-next-line guard-for-in
for (const pageRoot in proxyPrefixPath) {
  // customized for kopps public
  server.use(proxyPrefixPath[pageRoot], languageHandler)
}

/* ********************************
 * ******* CRAWLER REDIRECT *******
 * ********************************
 */
const excludePath = proxyPrefixPath.uri + '(?!/static).*'
const excludeExpression = new RegExp(excludePath)
server.use(
  excludeExpression,
  require('@kth/kth-node-web-common/lib/web/crawlerRedirect')({
    hostUrl: config.hostUrl,
  })
)

/* ********************************
 * ******* No index middleware ****
 * ********************************
 */
server.use(require('./utils/noIndexMiddleware.js'))

/* **********************************
 * ******* SYSTEM ROUTES *******
 * **********************************
 */
const { System } = require('./controllers')

// System routes
const systemRoute = AppRouter()
// TODO: change systemroutes back to same place as static resources, after kp migration is done.
systemRoute.get('system.monitor', _addProxy('/_monitor'), System.monitor)
systemRoute.get('system.about', _addProxy('/_about'), System.about)
systemRoute.get('system.paths', _addProxy('/_paths'), System.paths)
systemRoute.get('system.robots', '/robots.txt', System.robotsTxt)
server.use('/', systemRoute.getRouter())

/* ******************************
 * ******* CORTINA BLOCKS *******
 * ******************************
 */
server.use(
  '/', //  customized to kopps-public
  cortinaMiddleware({
    blockApiUrl: config.blockApi.blockUrl,
    redisConfig: config.cache.cortinaBlock.redis,
    blocksConfig: config.blockApi.addBlocks,
    redisKey: config.cache.cortinaBlock.redisKey,
  })
)

/* **********************************
 * ******* APPLICATION ROUTES *******
 * **********************************
 */
const {
  StudyHandBook,
  ThirdCycleStudyDepartment,
  ThirdCycleStudySchoolsList,
  Public,
  ProgrammesList,
  SchoolsList,
  Department,
  Programme,
  Search,
  Curriculum,
  Objectives,
  Extent,
  Eligibility,
  Implementation,
  Appendix1,
  Appendix2,
  LiteratureList,
  PDFExport,
  SearchPage,
} = require('./controllers')
const { parseTerm } = require('../domain/term')

// App routes
const appRoute = AppRouter()

appRoute.get('redirect.pdf_program_plan', _addProgramProxy('/:programmeCodeAndTerm.pdf'), PDFExport.getIndex)

appRoute.get('public.studyhandbook', proxyPrefixPath.studyHandbook, StudyHandBook.getStudyBook)
appRoute.get(
  'public.departmentsListThirdCycleStudy',
  proxyPrefixPath.thirdCycleSchoolsAndDepartments,
  ThirdCycleStudySchoolsList.getAllSchoolsAndDepartmentsInThirdCycleStudy
)
appRoute.get(
  'public.departmentThirdCycleStudy',
  proxyPrefixPath.thirdCycleCoursesPerDepartment + '/:departmentCode',
  ThirdCycleStudyDepartment.getCoursesPerDepartment
)
appRoute.get('public.searchAllCourses', proxyPrefixPath.searchPage, SearchPage.searchAllCourses)
appRoute.get('public.searchAllCoursesResult', proxyPrefixPath.searchResult, SearchPage.searchAllCourses)
appRoute.get(
  'public.SearchThirdCycleCourses',
  proxyPrefixPath.thirdCycleCourseSearch,
  SearchPage.searchThirdCycleCourses
)
appRoute.get(
  'public.SearchThirdCycleCoursesResult',
  proxyPrefixPath.thirdCycleCourseSearchResult,
  SearchPage.searchThirdCycleCourses
)

appRoute.get('api.searchCourses', proxyPrefixPath.courseSearchInternApi + '/:lang', SearchPage.performCourseSearch)
appRoute.post('api.programmeSyllabusPDF', proxyPrefixPath.programmeSyllabusPDF, PDFExport.performPDFRenderFunction)

appRoute.get('redirect.departmentsListThirdCycleStudy', redirectProxyPath.thirdCycleRoot, (req, res) => {
  res.redirect(301, proxyPrefixPath.thirdCycleSchoolsAndDepartments)
})
appRoute.get('redirect.kurser-per-avdelning', redirectProxyPath.coursesPerDepartment, (req, res) => {
  res.redirect(301, _addDepartmentProxy())
})
appRoute.get('redirect.avdelning-kurser', redirectProxyPath.departmentCourses, (req, res) => {
  const { departmentCode } = req.params
  res.redirect(301, _addDepartmentProxy(`/${departmentCode}`))
})
appRoute.get('public.programmesList', _addProgrammesListProxy(), ProgrammesList.getProgrammesList)
appRoute.get('public.departmentsList', _addDepartmentProxy(), SchoolsList.getSchoolsList)
appRoute.get('public.department', _addDepartmentProxy('/:departmentCode'), Department.getIndex)
appRoute.get('public.programme', _addProgramProxy('/:programmeCode'), Programme.getIndex)
appRoute.get('redirect.kurser', redirectProxyPath.studentRoot, (req, res) => {
  res.redirect(301, _addProgrammesListProxy())
})
appRoute.get('redirect.program', _addProgramProxy(), (req, res) => {
  res.redirect(301, _addProgrammesListProxy())
})
appRoute.get(
  'redirect.objectives_Ht_Vt',
  _addProgramProxy('/:programmeCode/:term([VvHh][Tt][0-9]{2})/mal'),
  (req, res) => {
    const { programmeCode, term } = req.params
    const parsedTerm = parseTerm(term)
    if (!parsedTerm) {
      const error = new Error('Malformed term')
      error.statusCode = 404
      throw error
    }
    res.redirect(301, _addProgramProxy(`/${programmeCode}/${parsedTerm}/mal`))
  }
)

appRoute.get(
  'public.objectives_five_digit',
  _addProgramProxy('/:programmeCode/:term([0-9]{4}[1-2])/mal'),
  Objectives.getIndex
)
appRoute.get(
  'redirect.extent_Ht_Vt',
  _addProgramProxy('/:programmeCode/:term([VvHh][Tt][0-9]{2})/omfattning'),
  (req, res) => {
    const { programmeCode, term } = req.params
    const parsedTerm = parseTerm(term)
    if (!parsedTerm) {
      const error = new Error('Malformed term')
      error.statusCode = 404
      throw error
    }
    res.redirect(301, _addProgramProxy(`/${programmeCode}/${parsedTerm}/omfattning`))
  }
)
appRoute.get(
  'public.extent_five_digit',
  _addProgramProxy('/:programmeCode/:term([0-9]{4}[1-2])/omfattning'),
  Extent.getIndex
)
appRoute.get(
  'redirect.eligibility_Ht_Vt',
  _addProgramProxy('/:programmeCode/:term([VvHh][Tt][0-9]{2})/behorighet'),
  (req, res) => {
    const { programmeCode, term } = req.params
    const parsedTerm = parseTerm(term)
    if (!parsedTerm) {
      const error = new Error('Malformed term')
      error.statusCode = 404
      throw error
    }
    res.redirect(301, _addProgramProxy(`/${programmeCode}/${parsedTerm}/behorighet`))
  }
)
appRoute.get(
  'public.eligibility_five_digit',
  _addProgramProxy('/:programmeCode/:term([0-9]{4}[1-2])/behorighet'),
  Eligibility.getIndex
)
appRoute.get(
  'redirect.implementation_Ht_Vt',
  _addProgramProxy('/:programmeCode/:term([VvHh][Tt][0-9]{2})/genomforande'),
  (req, res) => {
    const { programmeCode, term } = req.params
    const parsedTerm = parseTerm(term)
    if (!parsedTerm) {
      const error = new Error('Malformed term')
      error.statusCode = 404
      throw error
    }
    res.redirect(301, _addProgramProxy(`/${programmeCode}/${parsedTerm}/genomforande`))
  }
)
appRoute.get(
  'public.implementation_five_digit',
  _addProgramProxy('/:programmeCode/:term([0-9]{4}[1-2])/genomforande'),
  Implementation.getIndex
)
appRoute.get(
  'redirect.appendix1_Ht_Vt',
  _addProgramProxy('/:programmeCode/:term([VvHh][Tt][0-9]{2})/kurslista'),
  (req, res) => {
    const { programmeCode, term } = req.params
    const parsedTerm = parseTerm(term)
    if (!parsedTerm) {
      const error = new Error('Malformed term')
      error.statusCode = 404
      throw error
    }
    res.redirect(301, _addProgramProxy(`/${programmeCode}/${parsedTerm}/kurslista`))
  }
)

appRoute.get(
  'public.appendix1_five_digit',
  _addProgramProxy('/:programmeCode/:term([0-9]{4}[1-2])/kurslista'),
  Appendix1.getIndex
)
appRoute.get(
  'redirect.appendix2_Ht_Vt',
  _addProgramProxy('/:programmeCode/:term([VvHh][Tt][0-9]{2})/inriktningar'),
  (req, res) => {
    const { programmeCode, term } = req.params
    const parsedTerm = parseTerm(term)
    if (!parsedTerm) {
      const error = new Error('Malformed term')
      error.statusCode = 404
      throw error
    }
    res.redirect(301, _addProgramProxy(`/${programmeCode}/${parsedTerm}/inriktningar`))
  }
)
appRoute.get(
  'public.appendix2_five_digit',
  _addProgramProxy('/:programmeCode/:term([0-9]{4}[1-2])/inriktningar'),
  Appendix2.getIndex
)
appRoute.get(
  'redirect.curriculumRoot_five_digit',
  _addProgramProxy('/:programmeCode/:term([0-9]{4}[1-2])'),
  (req, res) => {
    const { programmeCode, term } = req.params
    const studyYear = 'arskurs1'
    res.redirect(301, _addProgramProxy(`/${programmeCode}/${term}/${studyYear}`))
  }
)
appRoute.get(
  'redirect.curriculumRoot_Ht_Vt',
  _addProgramProxy('/:programmeCode/:term([VvHh][Tt][0-9]{2})'),
  (req, res) => {
    const { programmeCode, term } = req.params
    const parsedTerm = parseTerm(term)
    if (!parsedTerm) {
      const error = new Error('Malformed term')
      error.statusCode = 404
      throw error
    }
    const studyYear = 'arskurs1'
    res.redirect(301, _addProgramProxy(`/${programmeCode}/${parsedTerm}/${studyYear}`))
  }
)
appRoute.get(
  'redirect.curriculum_Ht_Vt',
  _addProgramProxy('/:programmeCode/:term([VvHh][Tt][0-9]{2})/arskurs:studyYear([1-5])'),
  (req, res) => {
    const { programmeCode, term, studyYear } = req.params
    const parsedTerm = parseTerm(term)
    if (!parsedTerm) {
      const error = new Error('Malformed term')
      error.statusCode = 404
      throw error
    }
    res.redirect(301, _addProgramProxy(`/${programmeCode}/${parsedTerm}/arskurs${studyYear}`))
  }
)
appRoute.get(
  'public.curriculumRoot_five_digit',
  _addProgramProxy('/:programmeCode/:term([0-9]{4}[1-2])/arskurs:studyYear([1-5])'),
  Curriculum.getIndex
)
appRoute.get(
  'public.programme_literature_list',
  proxyPrefixPath.literatureList + '/:term([0-9]{4}[1-2])/:school([A-Z]+)',
  LiteratureList.getLiteratureList
)

server.use('/', appRoute.getRouter())

// Not found etc
server.use(System.notFound)
server.use(System.final)

// Register handlebar helpers
require('./views/helpers')
