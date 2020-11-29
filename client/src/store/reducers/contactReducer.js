const defaultState = {
  data: []
}

export default function contactReducer(state = defaultState, action) {
  switch (action.type) {
    case "SET_CONTACT":
      return {...state, data: action.payload};
    case "UPDATE_CONTACT":
      return {...state, data: action.payload};
    case "DELETE_CONTACT":
      return {...state, data: state.data.filter((e)=> e.id !== action.payload)};
    case "ERROR":
      return {...state, data: action.payload};
    default:
    return state;
  }
}
