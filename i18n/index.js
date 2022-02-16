'use strict'

/**
 * Extension of the i18n module that depends on the server configuration
 * and is therefore not consumable by the server.
 */

const i18n = require('kth-node-i18n')

// Include error messages from @kth/kth-node-web-common package
const errorMessagesEnglish = require('@kth/kth-node-web-common/lib/i18n/errorMessages.en')
const errorMessagesSwedish = require('@kth/kth-node-web-common/lib/i18n/errorMessages.sv')

// Include application messasges
const messagesEnglish = require('./messages.en')
const messagesSwedish = require('./messages.se')

// Add the error messages to the application defined messages before pushing them.
messagesSwedish.messages = { ...messagesSwedish.messages, ...errorMessagesSwedish.messages }
messagesEnglish.messages = { ...messagesEnglish.messages, ...errorMessagesEnglish.messages }

i18n.messages.push(messagesEnglish, messagesSwedish)

module.exports = i18n
