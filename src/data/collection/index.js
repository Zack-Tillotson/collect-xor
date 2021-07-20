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
let userPromiseResolve = null
const context = {
  store: null,
  db: null,
  userPromise: new Promise(resolve => userPromiseResolve = resolve),
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

function awaitUser() {
  return context.userPromise;
}

function handleAuthChange(user) {
  if(user) userPromiseResolve(user)
}

function initialize(store, collectionType) {
  context.store = store;
  context.db = firebase.database();
  firebase.auth().onAuthStateChanged(handleAuthChange)

  getStore().dispatch(actions.initialize(collectionType))
  
  const shapePromise = new Promise(resolve => {
    getDb().ref(`itemshapes/${collectionType}`).on('value', snapshot => {
      
      if(!snapshot.exists()) {
        throw new Error('itemshapes document does not exist - ' + collectionType)
      }

      const shape = snapshot.val()
      getStore().dispatch(actions.dataLoaded({id: 'itemshapes', data: shape}))
      resolve(shape)
    })
  })
  const collectionPromise = new Promise(resolve => {
    awaitUser()
      .then(user => {
        getDb()
          .ref(`users/${user.uid}/items`)
          .on('value', snapshot => {
              const itemsObj = snapshot.val() || {}
              const items = Object.keys(itemsObj).map(id => ({id, ...itemsObj[id]}))
              getStore().dispatch(actions.dataLoaded({id: 'items', data: items}))
              resolve(items)
            })
          })
      })

  return Promise
    .all([shapePromise, collectionPromise])
    .then(([shape, items]) => ({shape, items}))
}

function get() {
  return selector(getStore().getState())
}

function listen(callback) {
  return getStore().subscribe(callback)
}

function upsertItem(item, {id, user}) {
  const collection = getDb().ref(`users/${user.uid}/items`)
  
  if(id) {
    collection.child(id).update(item)
    return id
  } else {
    const key = collection.push().key
    collection.update({[key]: item})
    return key
  }
}

function deleteItem({id, user}) {
  const collection = getDb().collection(`users/${user.uid}/items`)
  return collection.doc(id).delete()
}
 
export default {
  get,
  listen,

  initialize,

  upsertItem,
  deleteItem,
}