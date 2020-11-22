import {combineReducers} from 'redux'
import {createBrowserHistory} from 'history'
import {connectRouter} from 'connected-react-router'
import realtors from './realtors'

export const history = createBrowserHistory()

export default (state, action) => {
  return combineReducers({
    realtors,
    router: connectRouter(history),
  })(state, action)
}
