/* eslint no-use-before-define: ["error", "nofunc"] */

// @ts-check

// eslint-disable-next-line no-unused-vars
import { observable } from 'mobx'

export default createApplicationStore

function createApplicationStore() {
  const store = {
    /**
     * @property {string} language
     */
    language: null,
    /**
     * @method
     * @param {string} lang
     */
    setLanguage,

    /**
     * @property {string} message
     */
    message: 'Hallo',
    /**
     * @method
     * @param {string} text
     */
    setMessage,
  }

  return store
}

function setLanguage(lang) {
  this.language = lang
}

function setMessage(text = 'Happy coding!! :)') {
  this.message = text
}
