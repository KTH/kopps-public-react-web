import React from 'react'
import { ReactDOM } from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { Provider } from 'mobx-react'

// Store
import RouterStore from './stores/RouterStore'

// Components
import Start from './view/Start'

const routerStore = new RouterStore()
routerStore.initializeStore('routerStore')
console.log('!!!!routerStore', routerStore)

function appFactory () {
  return (
    <Provider routerStore={routerStore}>
      <Switch>
        <Route path='/' component={Start} />
      </Switch>
    </Provider>

  )
}

if (typeof window !== 'undefined') {
  console.log('appFactory!!!!!!!!!!!!!!!', appFactory())
  ReactDOM.render(<BrowserRouter /* history={browserNativeHistoryApiWrapper} */>{appFactory()}</BrowserRouter>, document.getElementById('kth-node'))
}

export { appFactory }
