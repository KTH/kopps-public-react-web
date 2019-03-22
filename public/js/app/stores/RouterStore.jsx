import { observable, action } from 'mobx'

class RouterStore {
@observable test = ''

    @action getData(){
        this.test= 'En massa data'
    }

    initializeStore (storeName) {
        const store = this
       
        if (typeof window !== 'undefined' && window.__initialState__ && window.__initialState__[storeName]) {
          /* TODO: 
          const util = globalRegistry.getUtility(IDeserialize, 'kursinfo-web')
          const importData = JSON.parse(decodeURIComponent(window.__initialState__[storeName]))
          console.log("importData",importData, "util",util)
          for (let key in importData) {
            // Deserialize so we get proper ObjectPrototypes
            // NOTE! We need to escape/unescape each store to avoid JS-injection
            store[key] = util.deserialize(importData[key])
          }
          delete window.__initialState__[storeName]*/
    
          const tmp = JSON.parse(decodeURIComponent(window.__initialState__[storeName]))
          for (let key in tmp) {
            store[key] = tmp[key]
            delete tmp[key]
          }
      
          // Just a nice helper message
          if (Object.keys(window.__initialState__).length === 0) {
            window.__initialState__ = 'Mobx store state initialized'
          }
        }
      }
}

export {RouterStore}