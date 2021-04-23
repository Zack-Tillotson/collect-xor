import GAMES from './data/games'
import PLAYERS from './data/players'
const SESSION_FORM = [{id: 1, game: 1, players: [1, 2]}]

const DB_VERSION = 5
const DB_NAME = 'why-slow-local'

function openDb() {
  return new Promise((resolve, reject) => {
    const openRequest = indexedDB.open(DB_NAME, DB_VERSION)

    openRequest.onupgradeneeded = function(event) {
      let db = event.target.result;
      switch(event.oldVersion) {
        case 0: // No existing DB
        case 1:
        case 2:
        case 3:
          try {
            db.deleteObjectStore('games')
            db.deleteObjectStore('players')
            db.deleteObjectStore('sessions')
            db.deleteObjectStore('sessionForm')
          } catch(e) {
            console.warn(e)
          }
        default: // Falling through
          try {
            db.createObjectStore('games', {keyPath: 'id', autoIncrement: true}); 
            db.createObjectStore('players', {keyPath: 'id', autoIncrement: true});
            db.createObjectStore('sessions', {keyPath: 'id', autoIncrement: true});
            db.createObjectStore('sessionForm', {keyPath: 'id', autoIncrement: true});
          } catch(e) {
            console.warn(e)
          }
      }
    };

    openRequest.onerror = function() {
      reject(openRequest.error)
    }

    openRequest.onsuccess = function() {
      resolve(openRequest.result)
    }
  })
}

function loadBaseData(db, storeName, data) {
  const transaction = db.transaction(storeName, 'readwrite')
  const store = transaction.objectStore(storeName)

  data.forEach(item => {
    let request = store.add(item);
  })
}

async function getObject(storeName, queryParams) {
  const db = await openDb()
  const transaction = db.transaction(storeName)
  const store = transaction.objectStore(storeName)
  const request = queryParams?.id ? store.get(Number(queryParams.id)) : store.getAll()
  return new Promise(resolve => {
    request.onsuccess = () => {
      resolve(request.result)
    }
  })
}

async function initialize() {
  
  const db = await openDb();

  await Promise.all([
    loadBaseData(db, 'games', GAMES),
    loadBaseData(db, 'players', PLAYERS),
    loadBaseData(db, 'sessionForm', SESSION_FORM)
  ])

  const [games, players, sessions, newSessionForm] = await Promise.all([
    getObject('games'), 
    getObject('players'),
    getObject('sessions'),
    getObject('sessionForm'),
  ])
  return {
    games,
    players,
    sessions,
    newSessionForm: newSessionForm[0],
  }
}

async function createObject(storeName, data) {
  const db = await openDb()
  const transaction = db.transaction(storeName, 'readwrite')
  const store = transaction.objectStore(storeName)
  const request = store.put(data)
  return new Promise(resolve => {
    request.onsuccess = event => {
      resolve(event.target.result)
    }
  })
}

export default {
  initialize, 
  getObject,
  createObject,
}