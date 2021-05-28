import {select, call, takeEvery} from 'redux-saga/effects'
import types from './types'

import collection from 'data/collection'

function* handleFormSubmitted(action) {
  const {item, ownership} = yield(select(state => state.addNewItemForm))
  const result = yield call(collection.upsertItem, {item, ownership}, {user: action.payload})
  
  window.history.go('/app/')
}

function* monitorForm() {
  yield takeEvery(types.formSubmittted, handleFormSubmitted)
}

export default [
  monitorForm,
]
