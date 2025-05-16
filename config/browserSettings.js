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

const markHtmlFromKopps = Boolean(getEnv('MARK_HTML_FROM_KOPPS', devDefaults(true))) // TODO: needs to be removed after we are don with all kopps to ladok replacements
const markHtmlFromLadok = Boolean(getEnv('MARK_HTML_FROM_LADOK', devDefaults(true)))

module.exports = { markHtmlFromKopps, markHtmlFromLadok }
