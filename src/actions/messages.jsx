function gettingPageMessages() {
  return {type: 'GETTING_PAGE_MESSAGES'}
}

function getPageMessagesSuccess(messages) {
  return {type: 'GET_PAGE_MESSAGES_SUCCESS', messages}
}

export function getPageMessages(selectedAgency, page) {
  return dispatch => {
    dispatch(gettingPageMessages())
    return fetch(`/realtors/${selectedAgency}/messages/?page=${page}&page_size=20&sort=date:desc`, {
      method: 'GET',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        return response.json().then(json => {
          return response.ok ? json : Promise.reject(json.message)
        })
      })
      .then(data => {
        dispatch(getPageMessagesSuccess(data))
      })
      .catch(() => {
        console.error('Cannot get the messages list')
      })
  }
}

export function setMessageSelected(messageId) {
  return {type: 'SET_MESSAGE_SELECTED', messageId}
}

function markingMessageAsRead() {
  return {type: 'MARKING_MESSAGE_AS_READ'}
}

function markMessageAsReadSuccess(messageId) {
  return {type: 'MARK_MESSAGE_AS_READ_SUCCESS', messageId}
}

export function markMessageAsRead(selectedAgency, messageId) {
  return dispatch => {
    dispatch(markingMessageAsRead())
    return fetch(`/realtors/${selectedAgency}/messages/${messageId}`, {
      method: 'PATCH',
      credentials: 'same-origin',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({read: true}),
    })
      .then(response => {
        return response.json().then(json => {
          return response.ok ? json : Promise.reject(json.message)
        })
      })
      .then(() => {
        dispatch(markMessageAsReadSuccess(messageId))
      })
      .catch(() => {
        console.error('Cannot mark this message as read')
      })
  }
}
