import {types} from './actions'

const DEFAULT_STATE = {
  collectionType: '',
  meta: {
    isInitialized: false,
  },
  items: null,
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
              isInitialized: !!state.shape.ownership && !!action.payload.attributes && !!state.items,
            },
          }
        }
        case 'itemownershipshapes': {
          return {
            ...state, 
            shape: {...state.shape, ownership: action.payload.attributes},
            meta: {
              isInitialized: !!state.shape.item && !!action.payload.attributes && !!state.items,
            },
          }
        }
        case 'items': {
          return {
            ...state, 
            items: action.payload.docs,
            meta: {
              isInitialized: !!state.shape.item && !!action.payload.attributes,
            },
          }
        }
      }
    }
  }
  return state
}

export default collection