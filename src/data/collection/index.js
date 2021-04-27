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
  
  getDb().collection('itemshapes').doc(collectionType).get().then(doc => {
    if(!doc.exists) {
      throw new Error('itemshapes document does not exist - ' + collectionType)
    }
    getStore().dispatch(actions.dataLoaded('itemshapes', collectionType, doc.data()))
  })
  getDb().collection('itemshapes').doc(collectionType + 'ownership').get().then(doc => {
    if(!doc.exists) {
      throw new Error('itemshapes document does not exist - ' + collectionType + 'ownership')
    }
    getStore().dispatch(actions.dataLoaded('itemshapes', collectionType + 'ownership', doc.data()))
  })

  // TODO load collection
}
 
export default {
  getMeta,
  getCollection,
  getCollectionShape,

  initialize,

  upsertItem,
  deleteItem,
}