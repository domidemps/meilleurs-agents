/** @jsx jsx */
import {css, jsx} from '@emotion/core'
import React from 'react'
import {Provider} from 'react-redux'
import {MuiThemeProvider} from '@material-ui/core/styles'
import {Route, Switch} from 'react-router-dom'
import {ConnectedRouter, connectRouter, routerMiddleware} from 'connected-react-router'
import thunk from 'redux-thunk'
import promise from 'redux-promise'

import theme from 'styles/material_ui_raw_theme_file'
import MessageView from './containers/MessageView'
import Header from './containers/Header'
import MessagesList from './containers/MessagesList'
import {applyMiddleware, combineReducers, compose, createStore} from 'redux'
import {createBrowserHistory} from 'history'
import realtors from './reducers/realtors'
import messages from './reducers/messages'
import breakpoints from './styles/breakpoints'
import media from './styles/media'

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
  ${media.phone`
    .messagesList {
      width: 100%;
    }
    .messageView {
      width: 100%;
    }
  `}
`

export const history = createBrowserHistory()

const middlewares = [thunk, promise, routerMiddleware(history)]

export const store = createStore(
  combineReducers({
    realtors,
    messages,
    router: connectRouter(history),
  }),
  undefined,
  compose(applyMiddleware(...middlewares)),
)

const MainPage = () => {
  return (
    <div css={styles}>
      <div className="appBody" />
    </div>
  )
}

const MessagesListPage = () => {
  return (
    <div css={styles}>
      <div className="appBody">
        <MessagesList className="messagesList" key="messagesList" />
      </div>
    </div>
  )
}

const MessageViewPage = () => {
  return (
    <div css={styles}>
      <div className="appBody">
        {window.innerWidth >= breakpoints.phone ? (
          <MessagesList className="messagesList" key="messagesList" />
        ) : null}
        <MessageView className="messageView" key="messageView" />
      </div>
    </div>
  )
}

const App = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <MuiThemeProvider theme={theme}>
            <div>
              <Header />
              <Switch>
                <Route exact path="/" render={() => <MainPage />} />
                <Route exact path="/realtor/:agencyId" render={() => <MessagesListPage />} />
                <Route
                  exact
                  path="/realtor/:agencyId/message/:messageId"
                  render={() => <MessageViewPage />}
                />
                <Route render={() => <div>Page not found</div>} />
              </Switch>
            </div>
          </MuiThemeProvider>
        </ConnectedRouter>
      </Provider>
    </div>
  )
}
export default App
