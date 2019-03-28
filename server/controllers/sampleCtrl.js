'use strict'

const api = require('../api')
const log = require('kth-node-log')
const { safeGet } = require('safe-utils')

const { toJS } = require('mobx')
const ReactDOMServer = require('react-dom/server')
let { staticFactory }  = require('../../dist/app.js')

const browserConfig = require('../configuration').browser
const serverConfig = require('../configuration').server
const paths = require('../server').getPaths()

module.exports = {
  getIndex: getIndex
}



async function  getIndex (req, res, next) {
  if (process.env['NODE_ENV'] === 'development') {
    delete require.cache[require.resolve('../../dist/app.js')]
    const tmp = require('../../dist/app.js')
    staticFactory = tmp.staticFactory
    // doAllAsyncBefore = tmp.doAllAsyncBefore
  }

  try {
    // const client = api.nodeApi.client
    // const paths = api.nodeApi.paths
    // const resp = yield client.getAsync(client.resolve(paths.getDataById.uri, { id: '123' }), { useCache: true })

    const renderProps = staticFactory()
    const message = await renderProps.props.children.props.routerStore.getData()
    console.log("message",message)
    renderProps.props.children.props.routerStore.setBrowserConfig(browserConfig, paths, serverConfig.hostUrl)
    renderProps.props.children.props.routerStore.__SSR__setCookieHeader(req.headers.cookie)

    const html = ReactDOMServer.renderToString(renderProps)

    res.render('sample/index', {
      html: html,
      title: 'TODO',
      initialState: JSON.stringify(hydrateStores(renderProps)),
      // lang: lang,
      description: 'TODO' // lang === 'sv' ? "KTH  för "+courseCode.toUpperCase() : "KTH course information "+courseCode.toUpperCase()
    })
  } catch (err) {
    log.error('Error in getIndex', { error: err })
    next(err)
  }
}

function hydrateStores (renderProps) {
  // This assumes that all stores are specified in a root element called Provider
  const props = renderProps.props.children.props
  const outp = {}
  for (let key in props) {
    if (typeof props[key].initializeStore === 'function') {
      outp[key] = encodeURIComponent(JSON.stringify(toJS(props[key], true)))
    }
  }
  return outp
}
