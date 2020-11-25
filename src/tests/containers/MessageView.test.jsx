import React from 'react'
import configureStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import {Provider} from 'react-redux'
import renderer from 'react-test-renderer'
import {createMemoryHistory} from 'history'
import {Router, Switch} from 'react-router-dom'

import MessageView from '../../containers/MessageView'

export const history = createMemoryHistory({initialEntries: ['/']})

describe('MessageView', () => {
  const store = configureStore([thunk])({
    realtors: {
      selectedAgency: '101',
    },
    messages: {
      selectedMessage: {
        body:
          "Lorem Ipsum #10156 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        contact: {
          email: 'jbrown@gmail.com',
          firstname: 'John',
          lastname: 'Brown',
          phone: '0671459784',
        },
        date: '2020-11-23T19:58:02.673783',
        id: 10156,
        read: true,
        subject: 'Email #10156',
        type: 'email',
      },
    },
  })
  it('renders correctly for computers/tablets', () => {
    global.innerWidth = 600
    expect(
      renderer
        .create(
          <Provider store={store}>
            <Router history={history}>
              <Switch>
                <MessageView />
              </Switch>
            </Router>
          </Provider>,
        )
        .toJSON(),
    ).toMatchSnapshot()
  })
  it('renders correctly for smartphones', () => {
    global.innerWidth = 350
    expect(
      renderer
        .create(
          <Provider store={store}>
            <Router history={history}>
              <Switch>
                <MessageView />
              </Switch>
            </Router>
          </Provider>,
        )
        .toJSON(),
    ).toMatchSnapshot()
  })
})
