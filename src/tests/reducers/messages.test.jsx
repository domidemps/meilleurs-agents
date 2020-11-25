import reducer, {messagesInitialState} from '../../reducers/messages'

describe('"messages" reducer', () => {
  const messages = [
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
      read: false,
      subject: 'Email #10156',
      type: 'email',
    },
    {
      body:
        "Lorem Ipsum #10157 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
      contact: {
        email: 'jdoe@gmail.com',
        firstname: 'John',
        lastname: 'Doe',
        phone: '0671459784',
      },
      date: '2020-11-23T19:58:02.673783',
      id: 10157,
      read: true,
      subject: 'Email #10157',
      type: 'email',
    },
  ]
  it('Should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      messages: [],
      page: 1,
      hasMore: true,
      selectedMessage: null,
    })
  })
  it('Should handle "GET_PAGE_MESSAGES_SUCCESS"', () => {
    const expectedNewState = {
      messages,
      page: 2,
      hasMore: true,
      selectedMessage: null,
    }
    expect(reducer(messagesInitialState(), {type: 'GET_PAGE_MESSAGES_SUCCESS', messages})).toEqual(
      expectedNewState,
    )
  })
  it('Should handle "SELECT_AGENCY"', () => {
    expect(reducer({any: 'value'}, {type: 'SELECT_AGENCY', agencyId: 102})).toEqual(
      messagesInitialState(),
    )
  })
  it('Should handle "SET_MESSAGE_SELECTED"', () => {
    const initialState = {
      messages,
      page: 1,
      hasMore: true,
      selectedMessage: null,
    }
    const expectedNewReducer = {
      messages,
      page: 1,
      hasMore: true,
      selectedMessage: {
        body:
          "Lorem Ipsum #10157 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        contact: {
          email: 'jdoe@gmail.com',
          firstname: 'John',
          lastname: 'Doe',
          phone: '0671459784',
        },
        date: '2020-11-23T19:58:02.673783',
        id: 10157,
        read: true,
        subject: 'Email #10157',
        type: 'email',
      },
    }
    expect(reducer(initialState, {type: 'SET_MESSAGE_SELECTED', messageId: 10157})).toEqual(
      expectedNewReducer,
    )
  })
  it('Should handle "MARK_MESSAGE_AS_READ_SUCCESS"', () => {
    const initialState = {
      messages,
      page: 1,
      hasMore: true,
      selectedMessage: 10156,
    }
    const expectedNewReducer = {
      messages: [
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
        {
          body:
            "Lorem Ipsum #10157 is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
          contact: {
            email: 'jdoe@gmail.com',
            firstname: 'John',
            lastname: 'Doe',
            phone: '0671459784',
          },
          date: '2020-11-23T19:58:02.673783',
          id: 10157,
          read: true,
          subject: 'Email #10157',
          type: 'email',
        },
      ],
      page: 1,
      hasMore: true,
      selectedMessage: 10156,
    }
    expect(reducer(initialState, {type: 'MARK_MESSAGE_AS_READ_SUCCESS', messageId: 10156})).toEqual(
      expectedNewReducer,
    )
  })
})
