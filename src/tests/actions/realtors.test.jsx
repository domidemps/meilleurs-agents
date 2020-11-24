import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import fetchMock from 'fetch-mock'
import * as actions from '../../actions/realtors'

const middleWares = [thunk]
const mockStore = configureMockStore(middleWares)

describe('"realtors" async actions', () => {
  afterEach(() => {
    fetchMock.restore()
  })
  it('Should create actions when fetching the list of realtors', () => {
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
    fetchMock.getOnce(`/realtors`, {
      body: agencies,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
    const expectedActions = [{type: 'GETTING_AGENCIES'}, {type: 'GET_AGENCIES_SUCCESS', agencies}]
    const store = mockStore({agencies: null})
    return store.dispatch(actions.getAgencies()).then(() => {
      expect(store.getActions()).toEqual(expectedActions)
    })
  })
})

describe('"realtors" actions', () => {
  const agency = '101'
  it('Should create an action to set an agency as selected', () => {
    const expectedAction = {type: 'SELECT_AGENCY', agencyId: agency}
    expect(actions.selectAgency(agency)).toEqual(expectedAction)
  })
})
