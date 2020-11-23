import findIndex from 'lodash/findIndex'

import {getUnreadMessagesCounter} from '../helpers/utils'

export function realtorsInitialState() {
  return {
    agencies: null,
    selectedAgency: null,
    unreadMessages: 0,
  }
}

export default (state = realtorsInitialState(), action) => {
  switch (action.type) {
    case 'GET_AGENCIES_SUCCESS':
      const firstAgency = action.agencies[0].id
      return {
        ...state,
        agencies: action.agencies,
        selectedAgency: firstAgency,
        unreadMessages: getUnreadMessagesCounter(action.agencies, firstAgency),
      }
    case 'SELECT_AGENCY':
      return {
        ...state,
        selectedAgency: action.agencyId,
        unreadMessages: getUnreadMessagesCounter(state.agencies, action.agencyId),
      }
    case 'MARK_MESSAGE_AS_READ_SUCCESS':
      const newCounter = state.unreadMessages - 1
      let newAgencies = state.agencies
      const agencyIndex = findIndex(newAgencies, agency => {
        return agency.id === state.selectedAgency
      })
      newAgencies[agencyIndex].unread_messages = newCounter
      return {
        ...state,
        newAgencies,
        unreadMessages: newCounter,
      }
    default:
      return state
  }
}
