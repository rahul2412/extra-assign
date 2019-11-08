import { takeEvery } from 'redux-saga/effects';

function* task() {

    yield console.log("Redux saga is working like a charm");
    // Any custom behaviour can be added according to needs

}

export default function* rootSaga(id, password) {
    yield takeEvery('Add_id', task);
}
// it runs in the background from starting, checking when 'Add_id' action is dispatched to the store