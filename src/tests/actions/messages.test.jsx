import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import * as actions from '../../actions/messages'

const middleWares = [thunk]
const mockStore = configureMockStore(middleWares)
const message = '10156'

describe('"messages" async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })

  const agency = '101'
  const page = '1'

  it('Should create actions when fetching a page of messages of a real estate agency', () => {
    const messagesBody = [
      {
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
    ]
    fetchMock.getOnce(`/realtors/${agency}/messages/?page=${page}&page_size=20&sort=date:desc`, {
      body: messagesBody,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    const expectedActions = [
      {type: 'GETTING_PAGE_MESSAGES'},
      {type: 'GET_PAGE_MESSAGES_SUCCESS', messages: messagesBody},
    ]
    const store = mockStore({messages: null})
    return store.dispatch(actions.getPageMessages(agency, page)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })

  it('Should create actions when patching a message as read', () => {
    fetchMock.patchOnce(`/realtors/${agency}/messages/${message}`, {
      body: message,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    const expectedActions = [
      {type: 'MARKING_MESSAGE_AS_READ'},
      {type: 'MARK_MESSAGE_AS_READ_SUCCESS', messageId: message},
    ]
    const store = mockStore({messages: null})
    return store.dispatch(actions.markMessageAsRead(agency, message)).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

describe('"messages" actions', () => {
  it('Should create an action to set a message as selected', () => {
    const expectedAction = {type: 'SET_MESSAGE_SELECTED', messageId: message}
    expect(actions.setMessageSelected(message)).toEqual(expectedAction)
  })
})
