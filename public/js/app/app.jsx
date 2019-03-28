import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { StaticRouter } from 'react-router'
import { configure } from 'mobx'
import { Provider } from 'mobx-react'

// css
import '../../css/node-web.scss'
// Store
import RouterStore from './stores/RouterStore'
// Components
import Start from './view/Start'
 


function staticFactory () {
  
  return (
    <StaticRouter >
      {appFactory()}
    </StaticRouter>
  )
}

function appFactory() {
  if (process.env['NODE_ENV'] !== 'production') {
    configure({
      isolateGlobalState: true
    })
  }
  
  const routerStore = new RouterStore()

  if (typeof window !== 'undefined') {
    routerStore.initializeStore('routerStore')
  }

  return (
    <Provider routerStore = {routerStore}>
      <Switch>
        <Route path='/' component={Start}/>
      </Switch>
    </Provider>
  )
}

if (typeof window !== 'undefined') {
  ReactDOM.render(<BrowserRouter>{appFactory()}</BrowserRouter>, document.getElementById('kth-node'))
}

export { staticFactory }