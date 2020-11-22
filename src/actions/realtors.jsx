function gettingAgencies() {
  return {type: 'GETTING_AGENCIES'}
}

function getAgenciesSuccess(agencies) {
  return {type: 'GET_AGENCIES_SUCCESS', agencies}
}

export function getAgencies() {
  return dispatch => {
    dispatch(gettingAgencies())
    return fetch('/realtors', {
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
        dispatch(getAgenciesSuccess(data))
      })
      .catch(() => {
        console.error('Cannot get the realtors list')
      })
  }
}
