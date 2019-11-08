const initialState = {
  id: "",
  password: ""
};

function rootReducer(state = initialState, action) {
  if (action.type === "Add_id") {
      return Object.assign({}, state, {
          id: action.id,
          password: action.password
      });
  }
  return state;
}

export default rootReducer;
// reducing function