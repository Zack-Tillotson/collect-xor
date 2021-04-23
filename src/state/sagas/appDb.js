import {takeEvery, call, put, delay, select} from 'redux-saga/effects'
import types from '../types'
import actions from '../actions'
import {pathSelector} from '../useState'

import indexdb from '../indexdb'

function* initAppDb(action) {
  //yield delay(750)
  const data = yield indexdb.initialize();
  yield put(actions.dbDataLoaded({data, path: 'initialize'}))
}

export function* loadObject(objectName, params) {
  const data = yield call(indexdb.getObject, objectName, params)
  yield put(actions.dbDataLoaded({data, path: objectName, params}))
  return data
}

function* handleStateValueUpdated(action) {
  const {path, value} = action.payload
  if(path.startsWith('session/')) {
    const {events, game, players, colors} = yield select(pathSelector('session')) // Is updated state
    const id = Number(window.location.href.split('app/session/')[1].slice('/')[0])
    yield call(indexdb.createObject, 'sessions', {id, events, game, players, colors})
  } else if(path === 'sessionConfig/games') {
    const games = action.payload.value
    for(let i = 0 ; i < games.length; i++) {
      yield call(indexdb.createObject, 'games', games[i])
    }
  } else if(path === 'sessionConfig/players') {
    const players = action.payload.value
    for(let i = 0 ; i < players.length; i++) {
      yield call(indexdb.createObject, 'players', players[i])
    }
  } else if(path === 'sessionConfig/newSessionForm') {
    const form = action.payload.value
    yield call(indexdb.createObject, 'sessionForm', {...form, id: 1})
  }
}

function* monitorState(action) {
  yield takeEvery(types.stateValueUpdated, handleStateValueUpdated)
}

export default [initAppDb, monitorState]