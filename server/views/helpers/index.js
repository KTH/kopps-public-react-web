'use strict'

const Handlebars = require('handlebars')

const registerHeaderContentHelper = require('@kth/kth-node-web-common/lib/handlebars/helpers/headerContent')
const { registerBreadcrumbHelper } = require('@kth/kth-node-web-common/lib/handlebars/helpers/breadcrumbs')
const { registerLanguageLinkHelper } = require('@kth/kth-node-web-common/lib/handlebars/helpers/languageLink')
const log = require('@kth/log')
const config = require('../../configuration').server
const packageFile = require('../../../package.json')
const { getCurrentTerm } = require('../../../domain/term.js')
const translate = require('../../../domain/translate')

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
 * packaged helpers in https://github.com/KTH/@kth/kth-node-web-common/tree/master/lib/handlebars/helpers
 * Those only need to be required. Docs embedded in source.
 */
registerBreadcrumbHelper()
registerLanguageLinkHelper()
require('@kth/kth-node-web-common/lib/handlebars/helpers/contentedit')

const i18n = require('../../../i18n')
require('@kth/kth-node-web-common/lib/handlebars/helpers/createI18nHelper')(i18n)
require('@kth/kth-node-web-common/lib/handlebars/helpers/safe')

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
  return `${config.proxyPrefixPath.uri}/kurs/${course.code}`
})
handlebars.registerHelper('getQueryParams', (queryParams, course) => {
  const nextTerm = getCurrentTerm(new Date(course.startDate))
  return queryParams.start && queryParams.start !== 'current'
    ? `?startterm=${queryParams.start}`
    : `?startterm=${nextTerm}`
})
handlebars.registerHelper('languageControl', lang => {
  const otherLang = lang === 'sv' ? 'en' : 'sv'
  const label = translate(otherLang)('other_lang')
  return new Handlebars.SafeString(`
    <div class="col-auto text-right">
      <a href="?l=${otherLang}" hrefLang=${otherLang}>
        ${label}
      </a>
    </div>
  `)
})
