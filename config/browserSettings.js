/**
 *
 *            Browser specific settings
 *
 * **************************************************
 * * WARNING! Never access any secrets in this file *
 * **************************************************
 *
 */
const { getEnv, devDefaults } = require('kth-node-configuration')

const markHtmlFromKopps = Boolean(getEnv('MARK_HTML_FROM_KOPPS', devDefaults(true)))

module.exports = { markHtmlFromKopps }
