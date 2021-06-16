'use strict'

const registerHeaderContentHelper = require('kth-node-web-common/lib/handlebars/helpers/headerContent')
const log = require('kth-node-log')
const config = require('../../configuration').server
const packageFile = require('../../../package.json')

let { version } = packageFile

try {
  const buildVersion = require('../../../config/version')
  version = version + '-' + buildVersion.jenkinsBuild
} catch (err) {
  log.error(err.message)
}

/*
  Register standard helpers:

    - withVersion
    - extend
    - prefixScript
    - prefixStyle
    - render

*/
registerHeaderContentHelper({
  proxyPrefixPath: config.proxyPrefixPath.uri,
  version,
})

/**
 * Add any application specific helpers here, you can find some
 * packaged helpers in https://github.com/KTH/kth-node-web-common/tree/master/lib/handlebars/helpers
 * Those only need to be required. Docs embedded in source.
 */
require('kth-node-web-common/lib/handlebars/helpers/breadcrumbs')(
  config.hostUrl,
  'host_name',
  config.proxyPrefixPath.uri,
  'site_name'
)
require('kth-node-web-common/lib/handlebars/helpers/contentedit')

const i18n = require('../../../i18n')
require('kth-node-web-common/lib/handlebars/helpers/createI18nHelper')(i18n)
require('kth-node-web-common/lib/handlebars/helpers/safe')

const handlebars = require('handlebars')
handlebars.registerHelper('eq', (var1, var2) => {
  return var1.toString() === var2.toString()
})
handlebars.registerHelper('getSwedishFormattedCredits', course => {
  return course.credits.toFixed(1).toString().replace('.', ',') + ' hp'
})
handlebars.registerHelper('getAnmalningsKod', course => {
  return course.applicationCodes[0]
})
handlebars.registerHelper('getCourseLink', course => {
  return `https://www.kth.se/student/kurser/kurs/${course.code}`
})
