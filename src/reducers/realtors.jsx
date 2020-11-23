import {getUnreadMessagesCounter} from '../helpers/utils'

export function realtorsInitialState() {
  return {
    agencies: null,
    selectedAgency: '',
    unreadMessages: 0,
  }
}

export default (state = realtorsInitialState(), action) => {
  switch (action.type) {
    case 'GET_AGENCIES_SUCCESS':
      const selectedAgency = action.agencies[0].id
      return {
        ...state,
        agencies: action.agencies,
        selectedAgency: selectedAgency,
        unreadMessages: getUnreadMessagesCounter(action.agencies, selectedAgency),
      }
    case 'SELECT_AGENCY':
      return {
        ...state,
        selectedAgency: action.agencyId,
        unreadMessages: getUnreadMessagesCounter(state.agencies, action.agencyId),
      }
    case 'MARK_MESSAGE_AS_READ_SUCCESS':
      return {
        ...state,
        unreadMessages: state.unreadMessages - 1,
      }
    default:
      return state
  }
}
