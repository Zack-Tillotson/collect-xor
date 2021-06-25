import {select, call, takeEvery} from 'redux-saga/effects'
import deepmerge from 'deepmerge'

import types from './types'
import collection from 'data/collection'
import { getCurrentAuthData } from '../data/auth'

function* handleFormSubmitted(action) {
  const {item, ownership} = yield(select(state => state.addNewItemForm))
  const {user} = yield(call(getCurrentAuthData))
  const result = yield call(collection.upsertItem, {item, ownership}, {user})
  
  window.hackHistory.push('/app/')
}

function* handleItemUpdated(action) {
  const {id, ...attrs} = action.payload
  const items = yield(select(state => state.data.collection.items))
  const item = items.find(item => item.id === id)

  if(!item) throw new Error('handleItemUpdated - no item found with id ' + id)

  const newItem = deepmerge(item, attrs)
  delete(newItem.id)

  const {user} = yield(call(getCurrentAuthData))
  const result = yield call(collection.upsertItem, newItem, {id, user})
}

function* monitorForm() {
  yield takeEvery(types.formSubmittted, handleFormSubmitted)
  yield takeEvery(types.itemUpdated, handleItemUpdated)
}

export default [
  monitorForm,
]
