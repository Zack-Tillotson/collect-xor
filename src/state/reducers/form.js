import types from '../types'
import deepmerge from 'deepmerge'

const DEFAULT_STATE = {}

const createDeepPath = (path, value) => path.split('.').reverse().reduce((value, piece) => ({[piece]: value}), value)

function form(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case types.formInitialized:
    case types.formSubmitted: {
      if(!action.payload) {
        return DEFAULT_STATE
      }
      return deepmerge(DEFAULT_STATE, action.payload)
    }
    case types.formValuesUpdated: {
      if(action.payload instanceof Array) {
        return action.payload.reduce((newState, attr) => deepmerge(newState, createDeepPath(attr.name, attr.value)), state)
      }

      const {name: path, value} = action.payload

      return deepmerge(state, createDeepPath(path, value))
    }
  }
  return state;
}

export default form