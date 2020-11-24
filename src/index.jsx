import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import App, {store, history} from './root'

window.React = React

const render = Component => {
  ReactDOM.render(
    <AppContainer>
      <Component store={store} history={history} />
    </AppContainer>,
    document.getElementById('root'),
  )
}
render(App)

// Hot reloading for dev purposes
if (module.hot) {
  module.hot.accept('./root.jsx', () => {
    const NextApp = require('./root').default
    render(NextApp)
  })
}
