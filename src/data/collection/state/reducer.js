import {types} from './actions'

const DEFAULT_STATE = {
  collectionType: '',
  meta: {
    isInitialized: false,
  },
  items: null,
  shape: null,
}

function addIsInitialized(state) {
  return {
    ...state,
    meta: {
      isInitialized: !!state.shape && !!state.items,
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
            shape: action.payload.data,
          })
        }
        case 'items': {
          return addIsInitialized({
            ...state, 
            items: action.payload.data || [],
          })
        }
      }
    }
  }
  return state
}

export default collection