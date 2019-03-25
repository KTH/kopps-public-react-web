'use strict'

const api = require('../api')
const log = require('kth-node-log')
const { safeGet } = require('safe-utils')
const React = require('react')
const ReactDOMServer = require('react-dom/server')
const { StaticRouter } = require('react-router')
let { appFactory } = require('../../dist/js/app.js')

module.exports = {
  getIndex: getIndex
}

function* getIndex(req, res, next) {
  if (process.env['NODE_ENV'] === 'development') {
    delete require.cache[require.resolve('../../dist/js/app.js')]
    const tmp = require('../../dist/js/app.js')
    appFactory = tmp.appFactory
    // doAllAsyncBefore = tmp.doAllAsyncBefore
  }
  console.log('appFactory', appFactory)

  try {
    // const client = api.nodeApi.client
    // const paths = api.nodeApi.paths
    // const resp = yield client.getAsync(client.resolve(paths.getDataById.uri, { id: '123' }), { useCache: true })
    const context = {}
    const renderProps = React.createElement(
      StaticRouter,
      {
        location: req.url,
        context
      },
      appFactory()
    )
    renderProps.props.children.props.routerStore.getData()
    const html = ReactDOMServer.renderToString(renderProps)

    res.render('sample/index', {
      html: html,
      title: 'TODO',
      // lang: lang,
      description: 'TODO' // lang === 'sv' ? "KTH  för "+courseCode.toUpperCase() : "KTH course information "+courseCode.toUpperCase()
    })
  } catch (err) {
    log.error('Error in getIndex', { error: err })
    next(err)
  }
}
