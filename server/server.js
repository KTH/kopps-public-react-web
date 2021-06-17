/* eslint-disable import/order */
const server = require('kth-node-server')

// Now read the server config etc.
const config = require('./configuration').server
require('./api')
const AppRouter = require('kth-node-express-routing').PageRouter
const { getPaths } = require('kth-node-express-routing')

if (config.appInsights && config.appInsights.instrumentationKey) {
  const appInsights = require('applicationinsights')

  appInsights
    .setup(config.appInsights.instrumentationKey)
    .setAutoDependencyCorrelation(false)
    .setAutoCollectRequests(true)
    .setAutoCollectPerformance(true)
    .setAutoCollectExceptions(false)
    .setAutoCollectDependencies(true)
    .setAutoCollectConsole(true)
    .start()
}

// Expose the server and paths
server.locals.secret = new Map()
module.exports = server
module.exports.getPaths = () => getPaths()

/* ***********************
 * ******* LOGGING *******
 * ***********************
 */
const log = require('kth-node-log')
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
  exphbs({
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

// helper
function setCustomCacheControl(res, path2) {
  if (express.static.mime.lookup(path2) === 'text/html') {
    // Custom Cache-Control for HTML files
    res.setHeader('Cache-Control', 'no-cache')
  }
}

// Files/statics routes--
// Map components HTML files as static content, but set custom cache control header, currently no-cache to force If-modified-since/Etag check.
server.use(
  config.proxyPrefixPath.uri + '/static/js/components',
  express.static('./dist/js/components', { setHeaders: setCustomCacheControl })
)

// Expose browser configurations
server.use(config.proxyPrefixPath.uri + '/static/browserConfig', browserConfigHandler)
// Files/statics routes
server.use(config.proxyPrefixPath.uri + '/static/kth-style', express.static('./node_modules/kth-style/dist'))
// Map static content like images, css and js.
server.use(config.proxyPrefixPath.uri + '/static', express.static('./dist'))

server.use(config.proxyPrefixPath.uri + '/static/icon/favicon', express.static('./public/favicon.ico'))

// Return 404 if static file isn't found so we don't go through the rest of the pipeline
server.use(config.proxyPrefixPath.uri + '/static', (req, res, next) => {
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
const cookieParser = require('cookie-parser')

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(cookieParser())

/* ***********************
 * ******* SESSION *******
 * ***********************
 */
const session = require('kth-node-session')

const options = config.session
options.sessionOptions.secret = config.sessionSecret
server.use(session(options))

/* ************************
 * ******* LANGUAGE *******
 * ************************
 */
const { languageHandler } = require('kth-node-web-common/lib/language')

// eslint-disable-next-line guard-for-in
for (const pageRoot in config.proxyPrefixPath) {
  server.use(config.proxyPrefixPath[pageRoot], languageHandler)
}

/* ******************************
 * ******* CORTINA BLOCKS *******
 * ******************************
 */
server.use(
  '/',
  require('kth-node-web-common/lib/web/cortina')({
    blockUrl: config.blockApi.blockUrl,
    proxyPrefixPath: config.proxyPrefixPath.uri,
    hostUrl: config.hostUrl,
    redisConfig: config.cache.cortinaBlock.redis,
    globalLink: config.blockApi.globalLink,
  })
)

/* ********************************
 * ******* CRAWLER REDIRECT *******
 * ********************************
 */
const excludePath = config.proxyPrefixPath.uri + '(?!/static).*'
const excludeExpression = new RegExp(excludePath)
server.use(
  excludeExpression,
  require('kth-node-web-common/lib/web/crawlerRedirect')({
    hostUrl: config.hostUrl,
  })
)

/* **********************************
 * ******* APPLICATION ROUTES *******
 * **********************************
 */
const {
  StudyHandBook,
  System,
  ThirdCycleStudy,
  Public,
  EmbeddedPage,
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
} = require('./controllers')
const { parseTerm } = require('../domain/term')

const appEndpointsPrefix = '/kp-react'

// System routes
const systemRoute = AppRouter()
// TODO: change systemroutes back to same place as static resources, after kp migration is done.
systemRoute.get('system.monitor', appEndpointsPrefix + '/_monitor', System.monitor)
systemRoute.get('system.about', appEndpointsPrefix + '/_about', System.about)
systemRoute.get('system.paths', appEndpointsPrefix + '/_paths', System.paths)
systemRoute.get('system.robots', '/robots.txt', System.robotsTxt)
server.use('/', systemRoute.getRouter())

// Embedded page (html-based api) routes
const embeddedPageRoute = AppRouter()
embeddedPageRoute.get(
  'EmbeddedPage.emptyFovSearch',
  appEndpointsPrefix + '/embedded/fovsearch',
  EmbeddedPage.emptyFovSearch
)
embeddedPageRoute.post('EmbeddedPage.fovSearch', appEndpointsPrefix + '/embedded/fovsearch', EmbeddedPage.fovSearch)
server.use('/', embeddedPageRoute.getRouter())

// App routes
const appRoute = AppRouter()
appRoute.get('system.ready', config.proxyPrefixPath.uri + '/_ready', Public.getReady)
appRoute.get('example', config.proxyPrefixPath.uri + '/example', Public.getIndex)
appRoute.get('public.studyhandbook', config.proxyPrefixPath.studyHandbook, StudyHandBook.getStudyBook)
appRoute.get('dev.fovkurser', config.proxyPrefixPath.uri + '/utbildning/kurser/fovkurser', Public.getFovSearch)
appRoute.get(
  'public.departmentsListThirdCycleStudy',
  config.proxyPrefixPath.thirdCycleSchoolsAndDepartments,
  ThirdCycleStudy.getAllSchoolsAndDepartments
)
appRoute.get(
  'public.departmentThirdCycleStudy',
  config.proxyPrefixPath.thirdCycleCoursesPerDepartment + '/:departmentCode',
  ThirdCycleStudy.getCoursesPerDepartment
)
appRoute.get(
  'public.searchThirdCycleCourses',
  config.proxyPrefixPath.thirdCycleCourseSearch,
  Search.searchThirdCycleCourses
)
appRoute.get('public.searchAllCourses', config.proxyPrefixPath.courseSearch, Search.searchAllCourses)
appRoute.get('api.searchCourses', config.proxyPrefixPath.uri + '/intern-api/sok/:lang', Search.performCourseSearch)

appRoute.get('redirect.departmentsListThirdCycleStudy', '/utbildning/forskarutbildning/kurser/', (req, res) => {
  res.redirect(301, config.proxyPrefixPath.thirdCycleSchoolsAndDepartments)
})
appRoute.get('redirect.kurser-per-avdelning', '/student/kurser/kurser-per-avdelning/', (req, res) => {
  res.redirect(301, config.proxyPrefixPath.department)
})
appRoute.get('redirect.avdelning-kurser', '/student/kurser/avdelning/:departmentCode/kurser/', (req, res) => {
  const { departmentCode } = req.params
  res.redirect(301, `${config.proxyPrefixPath.department}/${departmentCode}`)
})
appRoute.get('public.programmesList', config.proxyPrefixPath.programmesList, ProgrammesList.getProgrammesList)
appRoute.get('public.departmentsList', config.proxyPrefixPath.department, SchoolsList.getSchoolsList)
appRoute.get('public.department', config.proxyPrefixPath.department + '/:departmentCode', Department.getIndex)
appRoute.get('public.programme', config.proxyPrefixPath.programme + '/:programmeCode', Programme.getIndex)
appRoute.get('redirect.kurser', config.proxyPrefixPath.studentRoot, (req, res) => {
  res.redirect(301, config.proxyPrefixPath.programmesList)
})
appRoute.get('redirect.program', config.proxyPrefixPath.programme, (req, res) => {
  res.redirect(301, config.proxyPrefixPath.programmesList)
})
appRoute.get(
  'redirect.objectives_Ht_Vt',
  config.proxyPrefixPath.programme + '/:programmeCode/:term([VvHh][Tt][0-9]{2})/mal',
  (req, res) => {
    const { programmeCode, term } = req.params
    const parsedTerm = parseTerm(term)
    if (!parsedTerm) {
      const error = new Error('Malformed term')
      error.statusCode = 404
      throw error
    }
    res.redirect(301, `${config.proxyPrefixPath.programme}/${programmeCode}/${parsedTerm}/mal`)
  }
)
appRoute.get(
  'public.objectives_five_digit',
  config.proxyPrefixPath.programme + '/:programmeCode/:term([0-9]{4}[1-2])/mal',
  Objectives.getIndex
)
appRoute.get(
  'redirect.extent_Ht_Vt',
  config.proxyPrefixPath.programme + '/:programmeCode/:term([VvHh][Tt][0-9]{2})/omfattning',
  (req, res) => {
    const { programmeCode, term } = req.params
    const parsedTerm = parseTerm(term)
    if (!parsedTerm) {
      const error = new Error('Malformed term')
      error.statusCode = 404
      throw error
    }
    res.redirect(301, `${config.proxyPrefixPath.programme}/${programmeCode}/${parsedTerm}/omfattning`)
  }
)
appRoute.get(
  'public.extent_five_digit',
  config.proxyPrefixPath.programme + '/:programmeCode/:term([0-9]{4}[1-2])/omfattning',
  Extent.getIndex
)
appRoute.get(
  'redirect.eligibility_Ht_Vt',
  config.proxyPrefixPath.programme + '/:programmeCode/:term([VvHh][Tt][0-9]{2})/behorighet',
  (req, res) => {
    const { programmeCode, term } = req.params
    const parsedTerm = parseTerm(term)
    if (!parsedTerm) {
      const error = new Error('Malformed term')
      error.statusCode = 404
      throw error
    }
    res.redirect(301, `${config.proxyPrefixPath.programme}/${programmeCode}/${parsedTerm}/behorighet`)
  }
)
appRoute.get(
  'public.eligibility_five_digit',
  config.proxyPrefixPath.programme + '/:programmeCode/:term([0-9]{4}[1-2])/behorighet',
  Eligibility.getIndex
)
appRoute.get(
  'redirect.implementation_Ht_Vt',
  config.proxyPrefixPath.programme + '/:programmeCode/:term([VvHh][Tt][0-9]{2})/genomforande',
  (req, res) => {
    const { programmeCode, term } = req.params
    const parsedTerm = parseTerm(term)
    if (!parsedTerm) {
      const error = new Error('Malformed term')
      error.statusCode = 404
      throw error
    }
    res.redirect(301, `${config.proxyPrefixPath.programme}/${programmeCode}/${parsedTerm}/genomforande`)
  }
)
appRoute.get(
  'public.implementation_five_digit',
  config.proxyPrefixPath.programme + '/:programmeCode/:term([0-9]{4}[1-2])/genomforande',
  Implementation.getIndex
)
appRoute.get(
  'redirect.appendix1_Ht_Vt',
  config.proxyPrefixPath.programme + '/:programmeCode/:term([VvHh][Tt][0-9]{2})/kurslista',
  (req, res) => {
    const { programmeCode, term } = req.params
    const parsedTerm = parseTerm(term)
    if (!parsedTerm) {
      const error = new Error('Malformed term')
      error.statusCode = 404
      throw error
    }
    res.redirect(301, `${config.proxyPrefixPath.programme}/${programmeCode}/${parsedTerm}/kurslista`)
  }
)
appRoute.get(
  'public.appendix1_five_digit',
  config.proxyPrefixPath.programme + '/:programmeCode/:term([0-9]{4}[1-2])/kurslista',
  Appendix1.getIndex
)
appRoute.get(
  'redirect.appendix2_Ht_Vt',
  config.proxyPrefixPath.programme + '/:programmeCode/:term([VvHh][Tt][0-9]{2})/inriktningar',
  (req, res) => {
    const { programmeCode, term } = req.params
    const parsedTerm = parseTerm(term)
    if (!parsedTerm) {
      const error = new Error('Malformed term')
      error.statusCode = 404
      throw error
    }
    res.redirect(301, `${config.proxyPrefixPath.programme}/${programmeCode}/${parsedTerm}/inriktningar`)
  }
)
appRoute.get(
  'public.appendix2_five_digit',
  config.proxyPrefixPath.programme + '/:programmeCode/:term([0-9]{4}[1-2])/inriktningar',
  Appendix2.getIndex
)
appRoute.get(
  'redirect.curriculumRoot_five_digit',
  config.proxyPrefixPath.programme + '/:programmeCode/:term([0-9]{4}[1-2])',
  (req, res) => {
    const { programmeCode, term } = req.params
    const studyYear = 'arskurs1'
    res.redirect(301, `${config.proxyPrefixPath.programme}/${programmeCode}/${term}/${studyYear}`)
  }
)
appRoute.get(
  'redirect.curriculumRoot_Ht_Vt',
  config.proxyPrefixPath.programme + '/:programmeCode/:term([VvHh][Tt][0-9]{2})',
  (req, res) => {
    const { programmeCode, term } = req.params
    const parsedTerm = parseTerm(term)
    if (!parsedTerm) {
      const error = new Error('Malformed term')
      error.statusCode = 404
      throw error
    }
    const studyYear = 'arskurs1'
    res.redirect(301, `${config.proxyPrefixPath.programme}/${programmeCode}/${parsedTerm}/${studyYear}`)
  }
)
appRoute.get(
  'redirect.curriculum_Ht_Vt',
  config.proxyPrefixPath.programme + '/:programmeCode/:term([VvHh][Tt][0-9]{2})/arskurs:studyYear([1-5])',
  (req, res) => {
    const { programmeCode, term, studyYear } = req.params
    const parsedTerm = parseTerm(term)
    if (!parsedTerm) {
      const error = new Error('Malformed term')
      error.statusCode = 404
      throw error
    }
    res.redirect(301, `${config.proxyPrefixPath.programme}/${programmeCode}/${parsedTerm}/arskurs${studyYear}`)
  }
)
appRoute.get(
  'public.curriculumRoot_five_digit',
  config.proxyPrefixPath.programme + '/:programmeCode/:term([0-9]{4}[1-2])/arskurs:studyYear([1-5])',
  Curriculum.getIndex
)
server.use('/', appRoute.getRouter())

// Not found etc
server.use(System.notFound)
server.use(System.final)

// Register handlebar helpers
require('./views/helpers')
