export function realtorsInitialState() {
  return {
    agencies: null,
    selectedAgency: null,
  }
}

export default (state = realtorsInitialState(), action) => {
  switch (action.type) {
    case 'GET_AGENCIES_SUCCESS':
      return {
        ...state,
        agencies: action.agencies,
      }
    default:
      return state
  }
}
