import {types} from './actions'

const DEFAULT_STATE = {
  collectionType: '',
  meta: {
    isInitialized: false,
  },
  data: null,
  shape: { // Item attribute information
    item: null,
    ownership: null,
  },
}

function collection(state = DEFAULT_STATE, action) {
  switch(action.type) {
    case types.initialize: {
      const collectionType = action.payload
      return {...state, collectionType, meta: {...state.meta, isInitialized: false}}
    }
    case types.dataLoaded: {
      switch(action.payload.id) {
        case 'itemshapes': {
          return {
            ...state, 
            shape: {...state.shape, item: action.payload.attributes},
            meta: {
              isInitialized: !!state.shape.ownership && !!action.payload.attributes, // TODO wait for data
            },
          }
        }
        case 'itemownershipshapes': {
          return {
            ...state, 
            shape: {...state.shape, ownership: action.payload.attributes},
            meta: {
              isInitialized: !!state.shape.item && !!action.payload.attributes, // TODO wait for data
            },
          }
        }
      }
    }
  }
  return state
}

export default collection