'use strict'

const api = require('../api')
const log = require('kth-node-log')
const serverConfig = require('../configuration').server

const { getServerSideFunctions } = require('../utils/serverSideRendering')

async function getIndex(req, res, next) {
  try {
    const { uri: basename } = serverConfig.proxyPrefixPath

    const serverSideFunctions = getServerSideFunctions()

    const html = serverSideFunctions.render({ applicationStore: {}, location: req.url, basename })

    res.render('sample/index', {
      html,
      title: 'TODO',
      initialState: '""',
      // lang: lang,
      description: 'TODO' // lang === 'sv' ? "KTH  för "+courseCode.toUpperCase() : "KTH course information "+courseCode.toUpperCase()
    })
  } catch (err) {
    log.error('Error in getIndex', { error: err })
    next(err)
  }
}

module.exports = {
  getIndex
}
