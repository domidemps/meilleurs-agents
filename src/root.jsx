import React from 'react'
import {Provider} from 'react-redux'
import {MuiThemeProvider} from '@material-ui/core/styles'
import {PersistGate} from 'redux-persist/integration/react'
import {Route, Switch} from 'react-router'
import {ConnectedRouter} from 'connected-react-router'

import theme from 'styles/material_ui_raw_theme_file'
import {persistor, store} from './store/configureStore'
import MainPage from './containers/MainPage'

require('./main.css')

const App = ({history}) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <PersistGate loading={null} persistor={persistor}>
          <MuiThemeProvider theme={theme}>
            <div>
              <Switch>
                <Route exact path="/" render={() => <MainPage />} />
                <Route render={() => <div>Page not found</div>} />
              </Switch>
            </div>
          </MuiThemeProvider>
        </PersistGate>
      </ConnectedRouter>
    </Provider>
  )
}
export default App
