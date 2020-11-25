import reducer, {realtorsInitialState} from '../../reducers/realtors'
import {getUnreadMessagesCounter} from '../../helpers/utils'

describe('"realtors" reducer', () => {
  const agencies = [
    {
      id: 101,
      logo: 'http://placehold.it/100x100?text=Agence+101',
      name: 'Agence #101',
      unread_messages: 74,
    },
    {
      id: 102,
      logo: 'http://placehold.it/100x100?text=Agence+102',
      name: 'Agence #102',
      unread_messages: 70,
    },
    {
      id: 103,
      logo: 'http://placehold.it/100x100?text=Agence+103',
      name: 'Agence #103',
      unread_messages: 78,
    },
  ]
  it('Should return the initial state', () => {
    expect(reducer(undefined, {})).toEqual({
      agencies: null,
      selectedAgency: null,
      unreadMessages: 0,
    })
  })
  it('Should handle "GET_AGENCIES_SUCCESS"', () => {
    const expectedNewState = {
      agencies,
      selectedAgency: 101,
      unreadMessages: 74,
    }
    expect(reducer(realtorsInitialState(), {type: 'GET_AGENCIES_SUCCESS', agencies})).toEqual(
      expectedNewState,
    )
  })
  it('Should handle "SELECT_AGENCY"', () => {
    const initialState = {
      agencies,
      selectedAgency: 101,
      unreadMessages: 74,
    }
    const expectedNewState = {
      agencies,
      selectedAgency: 102,
      unreadMessages: 70,
    }
    expect(reducer(initialState, {type: 'SELECT_AGENCY', agencyId: 102})).toEqual(expectedNewState)
  })
  it('Should handle "MARK_MESSAGE_AS_READ_SUCCESS"', () => {
    const initialState = {
      agencies,
      selectedAgency: 101,
      unreadMessages: 74,
    }
    const expectedNewState = {
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
          unread_messages: 70,
        },
        {
          id: 103,
          logo: 'http://placehold.it/100x100?text=Agence+103',
          name: 'Agence #103',
          unread_messages: 78,
        },
      ],
      selectedAgency: 101,
      unreadMessages: 73,
    }
    expect(reducer(initialState, {type: 'MARK_MESSAGE_AS_READ_SUCCESS', messageId: 10156})).toEqual(
      expectedNewState,
    )
  })
})
