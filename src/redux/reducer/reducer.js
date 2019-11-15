const initialState = {
  id: "",
  password: "",
  temp:"",
  pressure:"",
  humidity:"" ,
  fiveDaysTemp:[]
};

function rootReducer(state = initialState, action) {
  if (action.type === "Set_Id") {
      return Object.assign({}, state, {
          id: action.id,
          password: action.password
    });
  }

  if (action.type === "Current_Temp") {
      return Object.assign({}, state, {
        temp: action.body.main.temp,
        pressure: action.body.main.pressure,
        humidity: action.body.main.humidity
    });
  }

if (action.type === "Five_Days_Temp") {
      return Object.assign({}, state, {
        fiveDaysTemp: action.tempArray
    });
  }
  return state;
}

export default rootReducer;
// reducing function