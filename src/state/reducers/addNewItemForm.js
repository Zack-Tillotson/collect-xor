import types from '../types'
import deepmerge from 'deepmerge'

const DEFAULT_STATE = {
  useBarcodeLookup: true, // If true will make API calls whenever UPC is scanned
  id: null,
  item: {
    barcode: '',
    image: '',
    name: '',
    publisher: '',
  },
  ownership: {}
}

function addNewItemForm(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case types.formInitialized: {
      if(!action.payload) {
        return DEFAULT_STATE
      }
      return deepmerge(DEFAULT_STATE, action.payload)
    }
    case types.formValuesUpdated: {
      return {
        ...state,
        item: {
          ...state.item,
          ...action.payload,
        }
      };
    }
    case types.formOwnershipUpdated: {
      return {
        ...state,
        ownership: {
          ...state.ownership,
          ...action.payload,
        }
      };
    }
  }
  return state;
}

export default addNewItemForm