export function realtorsInitialState() {
  return {
    agencies: null,
    selectedAgency: -1,
  }
}

export default (state = realtorsInitialState(), action) => {
  switch (action.type) {
    case 'GET_AGENCIES_SUCCESS':
      return {
        ...state,
        agencies: action.agencies,
        selectedAgency: action.agencies[0].id,
      }
    case 'SELECT_AGENCY':
      return {
        ...state,
        selectedAgency: action.agencyId,
      }
    default:
      return state
  }
}
