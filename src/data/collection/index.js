/*
 * This module is the main interface to interact with database
 * collections. The data initialized and then allows consumers 
 * to understand the current collection shape and make CRUD 
 * operations on the collection items.
 * 
 * Data is accessed synchronously but in-progress operations will
 * be identifiable using the 'meta' attribute. 
 */

import firebase from 'firebase'

import selector from './state/selector'
import actions from './state/actions'

// external live dependencies
const context = {
  store: null,
  db: null,
}

function getStore() {
  if(!context.store) {
    throw new Error('store not initialized on context.')
  }
  return context.store;
}

function getDb() {
  if(!context.db) {
    throw new Error('db not initialized on context.')
  }
  return context.db;
}

function initialize(store, collectionType) {
  context.store = store;
  context.db = firebase.firestore();

  getStore().dispatch(actions.initialize(collectionType))
  
  const collectionShapePromise = new Promise(resolve => {
    getDb().collection('itemshapes').doc(collectionType).get().then(doc => {
      if(!doc.exists) {
        throw new Error('itemshapes document does not exist - ' + collectionType)
      }
      const data = doc.data()
      getStore().dispatch(actions.dataLoaded({id: 'itemshapes', data}))
      resolve(data)
    })
  })
  const collectionOwnershipShapePromise = new Promise(resolve => {
    getDb().collection('itemshapes').doc(collectionType + 'ownership').get().then(doc => {
      if(!doc.exists) {
        throw new Error('itemshapes document does not exist - ' + collectionType + 'ownership')
      }
      const data = doc.data()
      getStore().dispatch(actions.dataLoaded({id: 'itemownershipshapes', data}))
      resolve(data)
    })
  })

  // TODO load collection
  return Promise
    .all([collectionShapePromise, collectionOwnershipShapePromise])
    .then(([shape, ownershipShape]) => ({shape, ownershipShape}))
}

function get() {
  return selector(getStore().getState())
}

function upsertItem(item) {
  console.log('TODO')
}

function deleteItem(item) {
  console.log('TODO')
}
 
export default {
  get,

  initialize,

  upsertItem,
  deleteItem,
}