import _ from 'lodash'
import  faker from 'faker'
import { fork, put, take, call, select, takeLatest, takeEvery } from 'redux-saga/effects'
import { delay } from 'redux-saga'
import * as actions from '~/actions'

function* fetchDataSaga() {
  const last = faker.fake('{{name.lastName}}')
  const first = faker.fake('{{name.lastName}}')
  yield put(actions.registData({ last, first }))
}

export default function* rootSaga() {
  yield takeEvery(actions.fetchData, fetchDataSaga)
}
