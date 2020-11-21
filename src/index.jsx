import React from 'react'
import ReactDOM from 'react-dom'
import {AppContainer} from 'react-hot-loader'
import App from './root'

import {store} from 'store/configureStore'
import {history} from 'reducers'

// Needed for React Developer Tools
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
