import {createStore,applyMiddleware} from "redux";
import createSagaMiddleware from 'redux-saga'
import rootReducer from "../reducer/reducer.js";
import rootSaga from '../saga/saga.js';

const sagaMiddleware = createSagaMiddleware();
const store = createStore(rootReducer,applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga); 
//runs in the background from starting, checking when 'Add_id' action is dispatched to store

export default store;






