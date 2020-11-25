import React from 'react'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import renderer from 'react-test-renderer'
import {createMemoryHistory} from 'history'
import {Router, Switch} from 'react-router-dom'

import Header from '../../containers/Header'

export const history = createMemoryHistory({initialEntries: ['/']})

describe('Header', () => {
  const store = configureStore([thunk])({
    realtors: {
      agencies: [
        {
          id: 101,
          logo: 'http://placehold.it/100x100?text=Agence+101',
          name: 'Agence #101',
          unread_messages: 73,
        },
        {
          id: 102,
          logo: 'http://placehold.it/100x100?text=Agence+102',
          name: 'Agence #102',
          unread_messages: 68,
        },
        {
          id: 103,
          logo: 'http://placehold.it/100x100?text=Agence+103',
          name: 'Agence #103',
          unread_messages: 76,
        },
      ],
      selectedAgency: '101',
      unreadMessages: 73,
    },
  })
  it('renders correctly for computers/tablets', () => {
    global.innerWidth = 600
    expect(
      renderer.create(
        <Provider store={store}>
          <Router history={history}>
            <Switch>
              <Header/>
            </Switch>
          </Router>
        </Provider>
      ).toJSON()
    ).toMatchSnapshot()
  })
  it('renders correctly for smartphone', () => {
    global.innerWidth = 350
    expect(
      renderer.create(
        <Provider store={store}>
          <Router history={history}>
            <Switch>
              <Header/>
            </Switch>
          </Router>
        </Provider>
      ).toJSON()
    ).toMatchSnapshot()
  })
})