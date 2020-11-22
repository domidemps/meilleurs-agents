/** @jsx jsx */
import {css, jsx} from '@emotion/core'
import React from 'react'
import {Provider} from 'react-redux'
import {MuiThemeProvider} from '@material-ui/core/styles'
import {PersistGate} from 'redux-persist/integration/react'
import {Route, Switch} from 'react-router'
import {ConnectedRouter} from 'connected-react-router'

import theme from 'styles/material_ui_raw_theme_file'
import {persistor, store} from './store/configureStore'
import MessageView from './containers/MessageView'
import Header from './containers/AppBar'
import MessagesList from './containers/MessagesList'

require('./main.css')

const styles = css`
  .appBody {
    display: flex;
  }
  .messagesList {
    width: 30%;
    display: flex;
  }
  .messageView {
    width: 70%;
  }
`

const App = ({history}) => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <PersistGate loading={null} persistor={persistor}>
          <MuiThemeProvider theme={theme}>
            <div>
              <Header />
              <Switch>
                <Route exact path="/">
                  <div css={styles}>
                    <div className="appBody">
                      <MessagesList className="messagesList" key="messagesList" />
                    </div>
                  </div>
                </Route>
                <Route exact path="/message/:id">
                  <div css={styles}>
                    <div className="appBody">
                      <MessagesList className="messagesList" key="messagesList" />
                      <MessageView className="messageView" key="messageView" />
                    </div>
                  </div>
                </Route>
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
