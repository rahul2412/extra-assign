
export function setId(id,password) { // used to set state for id and password
  return { type: "Set_Id", id, password};
} 

export function fetchCity(city) { // used to send city name to redux saga
  return { type: "Fetch_City", city};
} 

export function setCurrentTemp(body) {  // setting state for current temperture forecast
  return { type: "Current_Temp", body };
}

export function setFiveDaysTemp(tempArray) {  // setting state for 5 days temperture forecast
  return { type: "Five_Days_Temp", tempArray };
}