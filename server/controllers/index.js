'use strict'

/**
 * Declares all of our different controllers and exposes them
 * with some sweet names.
 */

module.exports = {
  System: require('./systemCtrl'),
  Sample: require('./sampleCtrl'),
  Public: require('./publicSiteCtrl'),
  EmbeddedPage: require('./embeddedPagesCtrl'),
}
