/* eslint no-use-before-define: ["error", "nofunc"] */

// @ts-check

// eslint-disable-next-line no-unused-vars
import { observable } from 'mobx'
import axios from 'axios'

const kopps = axios.create({ baseURL: 'http://localhost:8010/proxy/api/kopps/v2' })

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

    koppsCourseData: null,
    koppsCourseSearch,
    /**
     * @method
     * @param {[]} programmes
     */
    setProgrammes,

    /**
     * @property {[]} programmes
     */
    programmes: [],
  }

  return store
}

async function koppsCourseSearch(textPattern) {
  this.koppsCourseData = await kopps.get('/courses/search', {
    params: {
      text_pattern: textPattern,
      educational_level: 'BASIC',
    },
  })
  // console.log(this.koppsCourseData)
}

function setLanguage(lang) {
  this.language = lang
}

function setMessage(text = 'Happy coding!! :)') {
  this.message = text
}

function setProgrammes(programmes = []) {
  this.programmes = programmes
}
