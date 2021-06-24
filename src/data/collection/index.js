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

function initialize(store, collectionType) {
  context.store = store;
  context.db = firebase.firestore();
  firebase.auth().onAuthStateChanged(userPromiseResolve)

  getStore().dispatch(actions.initialize(collectionType))
  
  const collectionShapePromise = new Promise(resolve => {
    getDb().collection('itemshapes').doc(collectionType).get().then(doc => {
      if(!doc.exists) {
        throw new Error('itemshapes document does not exist - ' + collectionType)
      }

      // each attribute will be a reference to an 'attribute' collection doc, get those values
      const shape = doc.data()
      const attrPromises = Object.keys(shape).reduce((promises, key) => {
        return {...promises, [key]: shape[key].get()}
      }, {})
      Promise.all(Object.values(attrPromises)).then(promiseValues => {
        const attributes = Object.keys(attrPromises).reduce((values, key, index) => {
          return ({...values, [key]: promiseValues[index].data()})
      }, {})
        getStore().dispatch(actions.dataLoaded({id: 'itemshapes', attributes}))
        resolve(attributes)
      })
    })
  })
  const collectionOwnershipShapePromise = new Promise(resolve => {
    getDb().collection('itemshapes').doc(collectionType + 'ownership').get().then(doc => {
      if(!doc.exists) {
        throw new Error('itemshapes document does not exist - ' + collectionType + 'ownership')
      }
      // each attribute will be a reference to an 'attribute' collection doc, get those values
      const shape = doc.data()
      const attrPromises = Object.keys(shape).reduce((promises, key) => {
        return {...promises, [key]: shape[key].get()}
      }, {})
      Promise.all(Object.values(attrPromises)).then(promiseValues => {
        const attributes = Object.keys(attrPromises).reduce((values, key, index) => {
          return ({...values, [key]: promiseValues[index].data()})
      }, {})
        getStore().dispatch(actions.dataLoaded({id: 'itemownershipshapes', attributes}))
        resolve(attributes)
      })
    })
  })
  const collectionPromise = new Promise(resolve => {
    awaitUser()
      .then(user => {
        getDb()
          .collection(`users/${user.uid}/items`)
          .get()
          .then(resp => resp.docs.map(doc => {
            const id = doc.id
            const data = doc.data()
            return {id, ...data}
          }))
          .then(docs => {
            getStore().dispatch(actions.dataLoaded({id: 'items', docs}))
            resolve(docs)
        })
      })
  })

  return Promise
    .all([collectionShapePromise, collectionOwnershipShapePromise, collectionPromise])
    .then(([shape, ownershipShape, items]) => ({shape, ownershipShape, items}))
}

function get() {
  return selector(getStore().getState())
}

function listen(callback) {
  return getStore().subscribe(callback)
}

function upsertItem(item, {id, user}) {
  const collection = getDb().collection(`users/${user.uid}/items`)
  if(id) {
    collection.doc(id).set(item)
  } else {
    const id = collection.add(item)
  }
}

function deleteItem(item) {
  console.log('TODO')
}
 
export default {
  get,
  listen,

  initialize,

  upsertItem,
  deleteItem,
}