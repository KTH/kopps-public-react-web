/**
 *
 *            Server specific settings
 *
 * *************************************************
 * * WARNING! Secrets should be read from env-vars *
 * *************************************************
 *
 */
const {
  getEnv,
  devDefaults,
  unpackRedisConfig,
  // unpackNodeApiConfig,
  unpackKOPPSConfig,
} = require('kth-node-configuration')

// DEFAULT SETTINGS used for dev, if you want to override these for you local environment, use env-vars in .env
const devPort = devDefaults(3000)
const devSsl = devDefaults(false)
const devUrl = devDefaults('http://localhost:' + devPort)
// const devNodeApi = devDefaults('http://localhost:3001/api/node?defaultTimeout=10000') // required=true&
const devSessionKey = devDefaults('node-web.sid')
const devSessionUseRedis = devDefaults(true)
const devRedis = devDefaults('redis://localhost:6379/')
const devKoppsApi = devDefaults('https://api-r.referens.sys.kth.se/api/kopps/v2/?defaultTimeout=60000')
// END DEFAULT SETTINGS
const devProgramSyallabusPDFURL = devDefaults('http://localhost:7071/api/PDFRenderFunction')

module.exports = {
  hostUrl: getEnv('SERVER_HOST_URL', devUrl),
  useSsl: String(getEnv('SERVER_SSL', devSsl)).toLowerCase() === 'true',
  port: getEnv('SERVER_PORT', devPort),
  ssl: {
    // In development we don't have SSL feature enabled
    pfx: getEnv('SERVER_CERT_FILE', ''),
    passphrase: getEnv('SERVER_CERT_PASSPHRASE', ''),
  },

  // API keys
  apiKey: {
    nodeApi: getEnv('NODE_API_KEY', devDefaults('1234')),
  },

  // Kopps
  koppsApi: unpackKOPPSConfig('KOPPS_API_BASEURL', devKoppsApi),

  // Service API's
  nodeApi: {
    // nodeApi: unpackNodeApiConfig('NODE_API_URI', devNodeApi),
  },

  // Cortina
  blockApi: {
    blockUrl: getEnv('CM_HOST_URL', devDefaults('https://www-r.referens.sys.kth.se/cm/')),
    addBlocks: {
      studentSecondaryMenu: '1.1066515',
      studentMegaMenu: '1.1066510',
      studentSearch: '1.1066521',
      studentFooter: '1.1066523',
    },
    globalLink: true,
  },

  // Logging
  logging: {
    log: {
      level: getEnv('LOGGING_LEVEL', 'debug'),
    },
    accessLog: {
      useAccessLog: getEnv('LOGGING_ACCESS_LOG', true),
    },
  },
  clientLogging: {
    level: 'debug',
  },
  cache: {
    cortinaBlock: {
      redis: unpackRedisConfig('REDIS_URI', devRedis),
      redisKey: 'CortinaBlock_kopps-public-react-web_',
    },
    koppsApi: {
      redis: unpackRedisConfig('REDIS_URI', devRedis),
      expireTime: 3600,
    },
  },

  // Session
  sessionSecret: getEnv('SESSION_SECRET', devDefaults('1234567890')),
  session: {
    key: getEnv('SESSION_KEY', devSessionKey),
    useRedis: String(getEnv('SESSION_USE_REDIS', devSessionUseRedis)).toLowerCase() === 'true',
    sessionOptions: {
      // do not set session secret here!!
      cookie: {
        secure: String(getEnv('SESSION_SECURE_COOKIE', false)).toLowerCase() === 'true',
        path: getEnv('SERVICE_PUBLISH', '/student/kurser'),
        sameSite: getEnv('SESSION_SAME_SITE_COOKIE', 'Lax'),
      },
      proxy: String(getEnv('SESSION_TRUST_PROXY', true)).toLowerCase() === 'true',
    },
    redisOptions: unpackRedisConfig('REDIS_URI', devRedis),
  },

  toolbar: {
    url: getEnv('TOOLBAR_URL', devDefaults('https://www-r.referens.sys.kth.se/social/toolbar/widget.js')),
  },

  programSyllabusForPDF: {
    uri: getEnv('PDF_RENDER_FUNCTION', devProgramSyallabusPDFURL),
  },

  programSyallbusKeyForPDF: {
    key: getEnv('PDF_RENDER_FUNCTION_SUBSCRIPTION_KEY', ''),
  },
}
