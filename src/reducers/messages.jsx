import concat from 'lodash/concat'
import isEmpty from 'lodash/isEmpty'

export function initialMessagesState() {
  return {
    messages: [],
    page: 1,
    hasMore: true,
  }
}

export default (state = initialMessagesState(), action) => {
  switch (action.type) {
    case 'GET_PAGE_MESSAGES_SUCCESS':
      return {
        ...state,
        messages: concat(state.messages, action.messages),
        page: state.page + 1,
        hasMore: !isEmpty(action.messages),
      }
    case 'SELECT_AGENCY':
      return initialMessagesState()
    default:
      return state
  }
}
