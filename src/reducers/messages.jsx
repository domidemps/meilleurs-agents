import concat from 'lodash/concat'
import isEmpty from 'lodash/isEmpty'
import filter from 'lodash/filter'
import findIndex from 'lodash/findIndex'

export function messagesInitialState() {
  return {
    messages: [],
    page: 1,
    hasMore: true,
    selectedMessage: null,
  }
}

export default (state = messagesInitialState(), action) => {
  switch (action.type) {
    case 'GET_PAGE_MESSAGES_SUCCESS':
      return {
        ...state,
        messages: concat(state.messages, action.messages),
        page: state.page + 1,
        hasMore: !isEmpty(action.messages),
      }
    case 'SELECT_AGENCY':
      return messagesInitialState()
    case 'SET_MESSAGE_SELECTED': {
      const selectedMessage = filter(state.messages, message => {
        return message.id === action.messageId
      })
      return {
        ...state,
        selectedMessage: selectedMessage[0],
      }
    }
    case 'MARK_MESSAGE_AS_READ_SUCCESS':
      let newMessages = [...state.messages]
      const messageIndex = findIndex(newMessages, message => {
        return message.id === action.messageId
      })
      newMessages[messageIndex] = {...newMessages[messageIndex], read: true}
      return {
        ...state,
        messages: newMessages,
      }
    default:
      return state
  }
}
