import types from '../types'
import deepmerge from 'deepmerge'

const DEFAULT_STATE = {
  useBarcodeLookup: true, // If true will make API calls whenever UPC is scanned
  id: null,
  properties: {},
  ownership: {},
}

const createDeepPath = (path, value) => path.split('.').reverse().reduce((value, piece) => ({[piece]: value}), value)

function addNewItemForm(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case types.formInitialized: {
      if(!action.payload) {
        return DEFAULT_STATE
      }
      return deepmerge(DEFAULT_STATE, action.payload)
    }
    case types.formValuesUpdated: {
      const {name: path, value} = action.payload

      return deepmerge(state, createDeepPath(path, value))
    }
  }
  return state;
}

export default addNewItemForm