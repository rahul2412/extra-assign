import {  takeLatest, put, call } from 'redux-saga/effects';

function* fetchApiSaga(action) {
    let city=action.city;
    
    try {
        const response = yield call(fetch, `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3fbb2b31fd3e77c536be64abc677a4d1`);
        const body = yield response.json();
        if (response.status !== 200) throw Error(body.message);
        
        yield put({ type: "Current_Temp", body });
        
        const responseFiveDays = yield call(fetch, `https://api.openweathermap.org/data/2.5/forecast?q=${city}&mode=json&appid=3fbb2b31fd3e77c536be64abc677a4d1` );
        const bodyFiveDays = yield responseFiveDays.json();
        if (responseFiveDays.status !== 200) throw Error(body.message);
        
        const tempArray=[];
        for(let i=0;i<5;i++)  // getting temperature forecast of next 5 days
        tempArray.push(bodyFiveDays.list[i].main.temp);

        yield put({ type: "Five_Days_Temp", tempArray });

    } catch (message) {
        console.log(message);  // display the error on console
    }
}

export default function* rootSaga() {
    yield takeLatest('Fetch_City', fetchApiSaga);
    
 }
 // it runs in the background from starting, checking when 'Fetch_City' action is dispatched to the store