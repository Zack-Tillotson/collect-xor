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

function addIsInitialized(state) {
  return {
    ...state,
    meta: {
      isInitialized: !!state.shape.ownership && !!state.shape.item && !!state.items,
    },
  }
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
          return addIsInitialized({
            ...state, 
            shape: {...state.shape, item: action.payload.attributes},
          })
        }
        case 'itemownershipshapes': {
          return addIsInitialized({
            ...state, 
            shape: {...state.shape, ownership: action.payload.attributes},
          })
        }
        case 'items': {
          return addIsInitialized({
            ...state, 
            items: action.payload.docs,
          })
        }
      }
    }
  }
  return state
}

export default collection