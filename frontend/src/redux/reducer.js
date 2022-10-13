const initialState = {
  user: {},
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USER_DATA":
      return { ...state, user: action.data }
    default:
      return state
  }
}

export default reducer