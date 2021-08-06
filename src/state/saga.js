import {select, call, takeEvery, debounce, put} from 'redux-saga/effects'
import deepmerge from 'deepmerge'

import types from './types'
import actions from './actions';

import { getCurrentAuthData } from '../data/auth'

import collection from 'data/collection'
import collectionSelector from 'data/collection/state/selector'


import formSelector from 'state/selectors/form'

const formCacheName = 'item-form'

function* handleFormSubmitted(action) {
  const {id, properties = {}, ownership = {}} = yield(select(formSelector))
  const {user} = yield call(getCurrentAuthData)
  const result = yield call(collection.upsertItem, {properties, ownership}, {id, user})
  
  const loc = id ? `/app/${id}/` : '/app/';
  window.hackHistory.push(loc)
}

function* handleItemUpdated(action) {
  const {id, ...attrs} = action.payload
  const {items} = yield select(collectionSelector)
  const item = items.find(item => item.id === id)

  if(!item) throw new Error('handleItemUpdated - no item found with id ' + id)

  const newItem = deepmerge(item, attrs)
  delete(newItem.id)

  const {user} = yield call(getCurrentAuthData)
  const result = yield call(collection.upsertItem, newItem, {id, user})
}

function* handleItemDelete(action) {
  const id = action.payload
  
  const {user} = yield(call(getCurrentAuthData))
  const result = yield call(collection.deleteItem, {id, user})
  //TODO notify user of result
  window.hackHistory.push('/app/')
}

function* handleCacheForm() {
  const formData = yield select(formSelector)
  sessionStorage.setItem(formCacheName, JSON.stringify(formData))
}

function* loadFormFromCache() {
  const formDataString = sessionStorage.getItem(formCacheName)
  const formData = JSON.parse(formDataString)
  yield put(actions.formInitialized(formData))
}

function* monitorForm() {
  yield takeEvery(types.formSubmittted, handleFormSubmitted)
  yield takeEvery(types.itemUpdated, handleItemUpdated)
  yield takeEvery(types.itemDelete, handleItemDelete)
  yield debounce(1000, '*', handleCacheForm)
}

export default [
  monitorForm,
  loadFormFromCache,
]
